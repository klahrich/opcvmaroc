import { ShieldCheck, Shield, ShieldAlert, ShieldClose } from 'lucide-react';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2
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

export const formatPercentage = (value: number, showSign: boolean = true, multiply_100: boolean = false): string => {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${(multiply_100 ? value * 100 : value).toFixed(2)}%`;
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

export const getSharpeRatioInfo = (sharpeRatio: number | null | undefined): { level: string; color: string; Icon: React.ElementType } => {
  if (sharpeRatio === null || sharpeRatio === undefined) {
    return { level: 'N/A', color: 'text-gray-500', Icon: () => null };
  }
  if (sharpeRatio > 2) {
    return { level: 'Excellent', color: 'text-green-600', Icon: ShieldCheck };
  }
  if (sharpeRatio > 1) {
    return { level: 'Bon', color: 'text-blue-600', Icon: Shield };
  }
  if (sharpeRatio > 0) {
    return { level: 'Moyen', color: 'text-yellow-600', Icon: ShieldAlert };
  }
  return { level: 'Faible', color: 'text-red-600', Icon: ShieldClose };
};