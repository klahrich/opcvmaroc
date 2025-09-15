export interface Fund {
  id: number;
  name: string;
  type: 'Actions' | 'Monétaire' | 'Diversifié' | 'Obligataire' | 'OMLT' | 'OCT' | 'DIVERSIFIÉ';
  manager: string;
  performance1y: number;
  performance3y: number;
  volatility: number;
  subscriptionFee: number;
  managementFee: number;
  exitFee: number;
  minInvestment: number;
  description: string;
  assets: number;
  expectedReturn?: number;
}