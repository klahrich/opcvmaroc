import asyncio
import httpx
import aiofiles
from playwright.async_api import async_playwright
from pathlib import Path
from urllib.parse import unquote
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class ASFIMScraper:
    def __init__(
        self, 
        base_url: str, 
        download_dir: str = "downloads", 
        max_files: int = 50,
        category_filter: str = None,
        show_100_per_page: bool = True
    ):
        self.base_url = base_url
        self.download_dir = Path(download_dir)
        self.max_files = max_files
        self.category_filter = category_filter  # e.g., "Quotidien", "Hebdomadaire"
        self.show_100_per_page = show_100_per_page
        self.download_dir.mkdir(exist_ok=True)
        
    async def set_items_per_page(self, page, items: int = 100):
        """Set the number of items to display per page"""
        try:
            logger.info(f"Setting items per page to {items}...")
            
            # Find and click the select dropdown
            select = await page.query_selector('select')
            if select:
                await select.select_option(str(items))
                # Wait for the table to reload
                await asyncio.sleep(1.5)
                await page.wait_for_selector('table tbody tr', timeout=10000)
                logger.info(f"✓ Now showing {items} items per page")
                return True
            else:
                logger.warning("Could not find items per page selector")
                return False
        except Exception as e:
            logger.error(f"Failed to set items per page: {e}")
            return False
        
    async def extract_download_links(self, page):
        """Extract all download links from the current page"""
        links = []
        
        # Wait for table to be visible
        await page.wait_for_selector('table tbody tr', timeout=10000)
        
        # Extract all download links
        rows = await page.query_selector_all('table tbody tr')
        
        for row in rows:
            # Get category if filtering is enabled
            if self.category_filter:
                category_element = await row.query_selector('td:nth-child(2)')
                category = await category_element.inner_text() if category_element else None
                
                # Skip if category doesn't match filter
                if category and category.strip() != self.category_filter:
                    continue
            
            link_element = await row.query_selector('a[download]')
            if link_element:
                href = await link_element.get_attribute('href')
                filename_element = await row.query_selector('td:first-child')
                filename = await filename_element.inner_text() if filename_element else None
                
                # Get category for logging
                category_element = await row.query_selector('td:nth-child(2)')
                category = await category_element.inner_text() if category_element else "Unknown"
                
                if href:
                    links.append({
                        'url': href,
                        'filename': filename.strip() if filename else None,
                        'category': category.strip() if category else "Unknown"
                    })
        
        return links
    
    async def has_next_page(self, page):
        """Check if there's a next page button available"""
        # Find the next button (the right chevron that's not disabled)
        next_button = await page.query_selector('button:has(svg path[d*="m8.25 4.5 7.5 7.5"]):not([disabled])')
        return next_button is not None
    
    async def go_to_next_page(self, page):
        """Click the next page button"""
        next_button = await page.query_selector('button:has(svg path[d*="m8.25 4.5 7.5 7.5"]):not([disabled])')
        if next_button:
            await next_button.click()
            # Wait for the table to update
            await asyncio.sleep(1.5)  # Give time for the page to load
            await page.wait_for_selector('table tbody tr', timeout=10000)
            return True
        return False
    
    async def download_file(self, session: httpx.AsyncClient, url: str, filename: str):
        """Download a single file"""
        try:
            # Extract filename from URL if not provided
            if not filename:
                filename = unquote(url.split('/')[-1])
            
            filepath = self.download_dir / filename
            
            # Skip if file already exists
            if filepath.exists():
                logger.info(f"Skipping {filename} - already exists")
                return True
            
            logger.info(f"Downloading: {filename}")
            
            async with session.stream('GET', url) as response:
                response.raise_for_status()
                
                async with aiofiles.open(filepath, 'wb') as f:
                    async for chunk in response.aiter_bytes(chunk_size=8192):
                        await f.write(chunk)
            
            logger.info(f"✓ Downloaded: {filename}")
            return True
            
        except Exception as e:
            logger.error(f"✗ Failed to download {filename}: {e}")
            return False
    
    async def scrape_and_download(self, headless:bool=False):
        """Main method to scrape links and download files"""
        all_links = []
        
        async with async_playwright() as p:
            # Launch browser
            browser = await p.chromium.launch(headless=headless)
            page = await browser.new_page()
            
            logger.info(f"Navigating to {self.base_url}")
            if self.category_filter:
                logger.info(f"Filtering by category: {self.category_filter}")
            
            await page.goto(self.base_url, wait_until='networkidle')
            
            # Set items per page if requested
            if self.show_100_per_page:
                await self.set_items_per_page(page, 100)
            
            # Collect links from pages
            page_num = 1
            while len(all_links) < self.max_files:
                logger.info(f"Scraping page {page_num}...")
                
                links = await self.extract_download_links(page)
                all_links.extend(links)
                
                logger.info(f"Found {len(links)} files on page {page_num} (total: {len(all_links)})")
                
                if len(all_links) >= self.max_files:
                    all_links = all_links[:self.max_files]
                    break
                
                # Check if there's a next page
                if await self.has_next_page(page):
                    await self.go_to_next_page(page)
                    page_num += 1
                else:
                    logger.info("No more pages available")
                    break
            
            await browser.close()
        
        logger.info(f"\nCollected {len(all_links)} download links")
        if all_links and self.category_filter:
            logger.info(f"All files are from category: {self.category_filter}")
        
        # Download files concurrently
        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as session:
            tasks = [
                self.download_file(session, link['url'], link['filename'])
                for link in all_links
            ]
            results = await asyncio.gather(*tasks)
        
        success_count = sum(results)
        logger.info(f"\n{'='*50}")
        logger.info(f"Download complete: {success_count}/{len(all_links)} files succeeded")
        logger.info(f"Files saved to: {self.download_dir.absolute()}")


async def main():
    # Configuration
    URL = "https://www.asfim.ma/publications/tableaux-des-performances/"
    DOWNLOAD_DIR = "asfim_downloads"
    MAX_FILES = 104  # Change this to download more or fewer files
    HEADLESS = False
    
    # Optional: Filter by category
    # Options: "Quotidien", "Hebdomadaire", "Mensuel", "Annuel", or None for all
    CATEGORY_FILTER = "Hebdomadaire"  # Change to "Quotidien" or "Hebdomadaire" to filter
    
    # Optional: Show 100 items per page (faster scraping, fewer page loads)
    SHOW_100_PER_PAGE = True  # Set to False to use default 10 per page
    
    scraper = ASFIMScraper(
        base_url=URL,
        download_dir=DOWNLOAD_DIR,
        max_files=MAX_FILES,
        category_filter=CATEGORY_FILTER,
        show_100_per_page=SHOW_100_PER_PAGE
    )
    
    await scraper.scrape_and_download(headless=HEADLESS)


if __name__ == "__main__":
    asyncio.run(main())