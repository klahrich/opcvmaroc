import pandas as pd
import numpy as np
from pathlib import Path
import logging
from datetime import datetime
import re

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class VolatilityCalculator:
    def __init__(self, csv_dir: str = "csv_output", output_file: str = "fund_volatility.csv"):
        self.csv_dir = Path(csv_dir)
        self.output_file = output_file
        
    def extract_date_from_filename(self, filename: str) -> datetime:
        """Extract date from filename like 'Tableau des performances quotidiennes au 02-10-2025.csv'"""
        try:
            # Match pattern: DD-MM-YYYY
            match = re.search(r'(\d{2})-(\d{2})-(\d{4})', filename)
            if match:
                day, month, year = match.groups()
                return datetime(int(year), int(month), int(day))
        except Exception as e:
            logger.warning(f"Could not extract date from {filename}: {e}")
        return None
    
    def load_all_data(self) -> pd.DataFrame:
        """Load all CSV files and combine them with dates"""
        all_data = []
        
        csv_files = sorted(list(self.csv_dir.glob('*.csv')))
        
        if not csv_files:
            logger.error(f"No CSV files found in {self.csv_dir}")
            return pd.DataFrame()
        
        logger.info(f"Found {len(csv_files)} CSV files")
        
        for csv_file in csv_files:
            date = self.extract_date_from_filename(csv_file.name)
            
            if date is None:
                logger.warning(f"Skipping {csv_file.name} - could not extract date")
                continue
            
            try:
                df = pd.read_csv(csv_file)
                df['date'] = date
                df['filename'] = csv_file.name
                all_data.append(df)
                logger.info(f"Loaded: {csv_file.name} ({date.strftime('%Y-%m-%d')})")
            except Exception as e:
                logger.error(f"Error reading {csv_file.name}: {e}")
        
        if not all_data:
            logger.error("No data loaded successfully")
            return pd.DataFrame()
        
        # Combine all dataframes
        combined_df = pd.concat(all_data, ignore_index=True)
        logger.info(f"Total records loaded: {len(combined_df)}")
        
        return combined_df
    
    def calculate_volatility(self, df: pd.DataFrame) -> pd.DataFrame:
        """Calculate annual volatility for each fund"""
        
        # Sort by fund identifiers and date
        df = df.sort_values(['CODE ISIN', 'Code Maroclear', 'date'])
        
        results = []
        
        # Group by all fund identifiers to ensure unique funds
        for (isin, maroclear_code), group in df.groupby(['CODE ISIN', 'Code Maroclear']):
            # Get fund info
            fund_name = group['Dénomination OPCVM'].iloc[0]
            classification = group['Classification'].iloc[0]
            management_company = group['Société de Gestion'].iloc[0]
            nature_juridique = group['Nature juridique'].iloc[0]
            depositaire = group['Dépositaire'].iloc[0]
            
            # Ensure we have enough data points
            if len(group) < 2:
                logger.warning(f"Skipping {fund_name} - insufficient data points ({len(group)})")
                continue
            
            # Calculate weekly returns from VL (Net Asset Value)
            # Convert VL to numeric, handling any non-numeric values
            vl_series = pd.to_numeric(group['VL'], errors='coerce').values
            dates = group['date'].values
            
            # Remove any NaN or zero values
            valid_mask = (pd.notna(vl_series)) & (vl_series > 0)
            vl_clean = vl_series[valid_mask]
            dates_clean = dates[valid_mask]
            
            if len(vl_clean) < 2:
                logger.warning(f"Skipping {fund_name} - insufficient valid VL data")
                continue
            
            # Calculate returns: (VL_t / VL_t-1) - 1
            returns = np.diff(vl_clean) / vl_clean[:-1]
            
            # Calculate weekly volatility (standard deviation of returns)
            weekly_vol = np.std(returns, ddof=1)  # ddof=1 for sample std
            
            # Annualize volatility: weekly_vol × sqrt(52)
            annual_vol = weekly_vol * np.sqrt(52)
            
            # Calculate additional metrics
            mean_return = np.mean(returns)
            annual_return = mean_return * 52
            
            # Calculate Sharpe-like ratio (simplified, assuming 0 risk-free rate)
            sharpe = annual_return / annual_vol if annual_vol > 0 else 0
            
            results.append({
                'CODE ISIN': isin,
                'Code Maroclear': maroclear_code,
                'Fund Name': fund_name,
                'Management Company': management_company,
                'Nature juridique': nature_juridique,
                'Dépositaire': depositaire,
                'Classification': classification,
                'Data Points': len(vl_clean),
                'Date Range': f"{dates_clean[0]} to {dates_clean[-1]}",
                'Weekly Volatility (%)': weekly_vol * 100,
                'Annual Volatility (%)': annual_vol * 100,
                'Mean Weekly Return (%)': mean_return * 100,
                'Annualized Return (%)': annual_return * 100,
                'Sharpe Ratio': sharpe,
                'Latest VL': vl_clean[-1],
                'Starting VL': vl_clean[0],
                'Total Return (%)': ((vl_clean[-1] / vl_clean[0]) - 1) * 100
            })
        
        results_df = pd.DataFrame(results)
        
        # Sort by annual volatility (descending)
        results_df = results_df.sort_values('Annual Volatility (%)', ascending=False)
        
        return results_df
    
    def run_analysis(self):
        """Main method to run the volatility analysis"""
        logger.info("="*60)
        logger.info("Starting Fund Volatility Analysis")
        logger.info("="*60)
        
        # Load all data
        df = self.load_all_data()
        
        if df.empty:
            logger.error("No data to analyze")
            return
        
        # Calculate volatility
        logger.info("\nCalculating volatility metrics...")
        results = self.calculate_volatility(df)
        
        if results.empty:
            logger.error("No volatility calculations completed")
            return
        
        # Save results
        results.to_csv(self.output_file, index=False)
        logger.info(f"\n✓ Results saved to: {self.output_file}")
        
        # Display summary
        logger.info("\n" + "="*60)
        logger.info("VOLATILITY ANALYSIS SUMMARY")
        logger.info("="*60)
        
        print("\nTop 10 Most Volatile Funds:")
        print(results[['CODE ISIN', 'Code Maroclear', 'Fund Name', 'Classification', 
                      'Annual Volatility (%)', 'Annualized Return (%)', 'Data Points']].head(10).to_string(index=False))
        
        print("\n\nTop 10 Least Volatile Funds:")
        print(results[['CODE ISIN', 'Code Maroclear', 'Fund Name', 'Classification', 
                      'Annual Volatility (%)', 'Annualized Return (%)', 'Data Points']].tail(10).to_string(index=False))
        
        print("\n\nVolatility by Classification:")
        print(results.groupby('Classification')['Annual Volatility (%)'].agg(['mean', 'min', 'max', 'count']))
        
        print("\n\nBest Risk-Adjusted Returns (Sharpe Ratio):")
        print(results.nlargest(10, 'Sharpe Ratio')[['CODE ISIN', 'Code Maroclear', 'Fund Name', 
                                                      'Classification', 'Annual Volatility (%)', 
                                                      'Annualized Return (%)', 'Sharpe Ratio']].to_string(index=False))
        
        return results


def main():
    # Configuration
    CSV_DIR = "csv_output"  # Directory containing CSV files
    OUTPUT_FILE = "fund_volatility_analysis.csv"
    
    calculator = VolatilityCalculator(
        csv_dir=CSV_DIR,
        output_file=OUTPUT_FILE
    )
    
    results = calculator.run_analysis()


if __name__ == "__main__":
    main()