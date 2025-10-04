import json
import pandas as pd
from pathlib import Path

def merge_volatility_into_funds(funds_json_path="src/frontend/funds.json",
                                volatility_csv_path="fund_volatility_analysis.csv",
                                output_path=None):
    """
    Merge Annual Volatility (%) and Sharpe Ratio from fund_volatility_analysis.csv
    into funds.json based on CODE ISIN or fund name matching.

    Args:
        funds_json_path (str): Path to existing funds.json
        volatility_csv_path (str): Path to CSV containing volatility data
        output_path (str): Optional output path (defaults to overwrite input JSON)
    """

    funds_file = Path(funds_json_path)
    csv_file = Path(volatility_csv_path)

    if not funds_file.exists():
        raise FileNotFoundError(f"Funds JSON not found: {funds_file}")
    if not csv_file.exists():
        raise FileNotFoundError(f"Volatility CSV not found: {csv_file}")

    # Load both files
    with open(funds_file, "r", encoding="utf-8") as f:
        funds = json.load(f)

    df_vol = pd.read_csv(csv_file)

    # Normalize column names for easier access
    df_vol.columns = [c.strip() for c in df_vol.columns]

    # Build lookup tables
    isin_map = {str(row["CODE ISIN"]).strip(): row for _, row in df_vol.iterrows()}
    name_map = {str(row["Fund Name"]).strip().lower(): row for _, row in df_vol.iterrows()}

    updated_count = 0
    for fund in funds:
        # Correctly extract ISIN and Name from funds.json structure
        isin = str(fund.get("CODE ISIN") or "").strip()
        name = str(fund.get("OPCVM") or "").strip().lower()

        row = None
        if isin and isin in isin_map:
            row = isin_map[isin]
        elif name in name_map:
            row = name_map[name]

        if row is not None:
            # The CSV stores volatility as a percentage, so we use it directly.
            fund["annualVolatility"] = float(row.get("Annual Volatility (%)", 0))
            fund["sharpeRatio"] = float(row.get("Sharpe Ratio", 0))
            updated_count += 1
        else:
            fund["annualVolatility"] = None
            fund["sharpeRatio"] = None

    # Write output
    output_path = Path(output_path or funds_file)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(funds, f, indent=2, ensure_ascii=False)

    print(f"✓ Updated {updated_count}/{len(funds)} funds with volatility and Sharpe Ratio data.")
    print(f"→ Output saved to: {output_path}")

if __name__ == "__main__":
    merge_volatility_into_funds()