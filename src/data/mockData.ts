export interface Fund {
  id: number;
  name: string;
  type: 'Actions' | 'Monétaire' | 'Diversifié' | 'Obligataire';
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

export const funds: Fund[] = [
  {
    id: 1,
    name: "BMCE Actions",
    type: "Actions",
    manager: "BMCE Capital Gestion",
    performance1y: 12.5,
    performance3y: 8.7,
    volatility: 15.2,
    subscriptionFee: 1.5,
    managementFee: 1.8,
    exitFee: 0.5,
    minInvestment: 1000,
    description: "Fonds investi principalement en actions marocaines cotées à la Bourse de Casablanca",
    assets: 450000000,
    expectedReturn: 12.5
  },
  {
    id: 2,
    name: "Attijariwafa Monétaire",
    type: "Monétaire",
    manager: "Wafa Gestion",
    performance1y: 3.2,
    performance3y: 3.1,
    volatility: 0.8,
    subscriptionFee: 0.5,
    managementFee: 0.75,
    exitFee: 0,
    minInvestment: 500,
    description: "Fonds monétaire privilégiant la sécurité et la liquidité des investissements",
    assets: 1200000000,
    expectedReturn: 3.2
  },
  {
    id: 3,
    name: "CDG Diversifié",
    type: "Diversifié",
    manager: "CDG Capital Gestion",
    performance1y: 7.8,
    performance3y: 6.4,
    volatility: 8.5,
    subscriptionFee: 1.0,
    managementFee: 1.5,
    exitFee: 0.3,
    minInvestment: 2000,
    description: "Portefeuille équilibré combinant actions, obligations et instruments monétaires",
    assets: 800000000,
    expectedReturn: 7.8
  },
  {
    id: 4,
    name: "Crédit Agricole Obligations",
    type: "Obligataire",
    manager: "CAM Gestion",
    performance1y: 4.5,
    performance3y: 4.2,
    volatility: 3.1,
    subscriptionFee: 0.8,
    managementFee: 1.2,
    exitFee: 0.2,
    minInvestment: 1500,
    description: "Fonds spécialisé dans les obligations d'État et corporate marocaines",
    assets: 650000000,
    expectedReturn: 4.5
  },
  {
    id: 5,
    name: "BMCI Croissance",
    type: "Actions",
    manager: "BMCI Asset Management",
    performance1y: 15.2,
    performance3y: 11.3,
    volatility: 18.7,
    subscriptionFee: 2.0,
    managementFee: 2.0,
    exitFee: 0.8,
    minInvestment: 3000,
    description: "Fonds dynamique ciblant les entreprises à fort potentiel de croissance",
    assets: 320000000,
    expectedReturn: 15.2
  },
  {
    id: 6,
    name: "Popular Équilibré",
    type: "Diversifié",
    manager: "Popular Asset Management",
    performance1y: 6.9,
    performance3y: 5.8,
    volatility: 7.2,
    subscriptionFee: 1.2,
    managementFee: 1.6,
    exitFee: 0.4,
    minInvestment: 1000,
    description: "Allocation stratégique entre différentes classes d'actifs pour un risque maîtrisé",
    assets: 580000000,
    expectedReturn: 6.9
  }
];

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  time: string;
  category: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "BMCE Capital Gestion lance un nouveau fonds actions",
    excerpt: "Le nouveau fonds vise les entreprises à forte croissance du marché marocain avec une stratégie d'investissement axée sur l'innovation.",
    time: "Il y a 2 heures",
    category: "Actualités",
    featured: true
  },
  {
    id: 2,
    title: "Performance des OPCVMs au T3 2024",
    excerpt: "Analyse des performances trimestrielles des principaux fonds du marché marocain avec des résultats encourageants.",
    time: "Il y a 5 heures",
    category: "Analyse"
  },
  {
    id: 3,
    title: "Guide d'investissement pour débutants",
    excerpt: "Comment choisir son premier OPCVM : critères essentiels à considérer pour débuter en toute sécurité.",
    time: "Il y a 1 jour",
    category: "Éducation"
  },
  {
    id: 4,
    title: "Nouvelle réglementation AMMC 2025",
    excerpt: "L'Autorité Marocaine du Marché des Capitaux annonce de nouvelles mesures pour renforcer la protection des investisseurs.",
    time: "Il y a 2 jours",
    category: "Réglementation"
  }
];