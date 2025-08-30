export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatAssets = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}Md MAD`;
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)}M MAD`;
  }
  return `${amount} MAD`;
};

export const formatPercentage = (value: number, showSign: boolean = true): string => {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const getPerformanceColor = (performance: number): string => {
  if (performance > 0) return 'text-green-600';
  if (performance < 0) return 'text-red-600';
  return 'text-gray-600';
};

export const getRiskLevel = (volatility: number): { level: string; color: string } => {
  if (volatility < 5) return { level: 'Faible', color: 'text-green-600' };
  if (volatility < 12) return { level: 'Modéré', color: 'text-yellow-600' };
  if (volatility < 20) return { level: 'Élevé', color: 'text-orange-600' };
  return { level: 'Très Élevé', color: 'text-red-600' };
};