import asyncio
import pandas as pd
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class ExcelToCSVConverter:
    def __init__(
        self, 
        input_dir: str = "asfim_downloads",
        output_dir: str = "csv_output",
        delete_original: bool = False
    ):
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.delete_original = delete_original
        self.output_dir.mkdir(exist_ok=True)
        
    async def convert_single_file(self, xlsx_file: Path) -> bool:
        """Convert a single Excel file to CSV"""
        try:
            csv_filename = xlsx_file.stem + '.csv'
            csv_path = self.output_dir / csv_filename
            
            # Skip if CSV already exists
            if csv_path.exists():
                logger.info(f"Skipping {xlsx_file.name} - CSV already exists")
                return True
            
            logger.info(f"Converting: {xlsx_file.name}")
            
            # Read Excel file with headers on row 2 (skip first row, use second as header)
            # header=1 means use row index 1 (second row) as column names
            def read_and_save():
                df = pd.read_excel(
                    xlsx_file,
                    header=1,  # Row 2 becomes the header (0-indexed, so 1 = second row)
                    engine='openpyxl'
                )
                
                # Save to CSV
                df.to_csv(csv_path, index=False, encoding='utf-8')
                
            # Run pandas operations in thread pool to avoid blocking
            await asyncio.to_thread(read_and_save)
            
            logger.info(f"✓ Converted: {csv_filename}")
            
            # Delete original if requested
            if self.delete_original:
                xlsx_file.unlink()
                logger.info(f"  Deleted original: {xlsx_file.name}")
            
            return True
            
        except Exception as e:
            logger.error(f"✗ Failed to convert {xlsx_file.name}: {e}")
            return False
    
    async def convert_all_files(self):
        """Convert all Excel files in the input directory"""
        # Find all .xlsx files
        xlsx_files = list(self.input_dir.glob('*.xlsx'))
        
        if not xlsx_files:
            logger.warning(f"No .xlsx files found in {self.input_dir}")
            return
        
        logger.info(f"Found {len(xlsx_files)} Excel files to convert")
        logger.info(f"Output directory: {self.output_dir.absolute()}")
        
        # Convert files concurrently
        tasks = [self.convert_single_file(file) for file in xlsx_files]
        results = await asyncio.gather(*tasks)
        
        success_count = sum(results)
        logger.info(f"\n{'='*50}")
        logger.info(f"Conversion complete: {success_count}/{len(xlsx_files)} files succeeded")
        logger.info(f"CSV files saved to: {self.output_dir.absolute()}")


async def main():
    # Configuration
    INPUT_DIR = "asfim_downloads"      # Directory containing .xlsx files
    OUTPUT_DIR = "csv_output"          # Directory for CSV output
    DELETE_ORIGINAL = False            # Set to True to delete .xlsx after conversion
    
    converter = ExcelToCSVConverter(
        input_dir=INPUT_DIR,
        output_dir=OUTPUT_DIR,
        delete_original=DELETE_ORIGINAL
    )
    
    await converter.convert_all_files()


if __name__ == "__main__":
    asyncio.run(main())