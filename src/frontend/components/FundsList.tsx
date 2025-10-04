import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Info, X } from 'lucide-react';
import { Fund } from '../types';
import FundModal from './FundModal';
import fundsData from '../funds.json';
import { getSharpeRatioInfo } from '../utils/formatters';

const FundsList = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const formattedFunds: Fund[] = fundsData.map((fund: any, index: number) => ({
      id: index,
      name: fund.OPCVM,
      type: fund.Classification.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
      manager: fund['Société de Gestion'],
      performance1y: parseFloat((fund['1 an'] * 100).toFixed(2)),
      performance3y: parseFloat((fund['3 ans'] * 100).toFixed(2)),
      volatility: 0, // This data is not in funds.json, default to 0
      subscriptionFee: fund['Commission de souscription'] * 100,
      managementFee: fund['Frais de gestion'] * 100,
      exitFee: fund[' Commission de rachat'] * 100,
      minInvestment: 1000, // This data is not in funds.json, default to 1000
      description: `Fonds de classification ${fund.Classification.toLowerCase()} géré par ${fund['Société de Gestion']}.`,
      assets: fund.AN,
      annualVolatility: fund.annualVolatility,
      sharpeRatio: fund.sharpeRatio,
    }));
    setFunds(formattedFunds);
  }, []);

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || fund.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatAssets = (amount: number): string => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} Md MAD`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)} M MAD`;
    }
    return `${amount} MAD`;
  };

  return (
    <section id="funds" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            OPCVMs Disponibles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez notre sélection de fonds communs de placement adaptés à tous les profils d'investisseurs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un fonds ou gestionnaire..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="actions">Actions</option>
              <option value="monétaire">Monétaire</option>
              <option value="diversifié">Diversifié</option>
              <option value="obligataire">Obligataire</option>
            </select>
          </div>
        </div>

        {/* Funds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFunds.slice(0, visibleCount).map((fund) => {
            const sharpeInfo = getSharpeRatioInfo(fund.sharpeRatio);
            return (
            <div
              key={fund.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedFund(fund)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{fund.name}</h3>
                  <p className="text-sm text-gray-600">{fund.manager}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  fund.type === 'Actions' ? 'bg-red-100 text-red-800' :
                  fund.type === 'Monétaire' ? 'bg-green-100 text-green-800' :
                  fund.type === 'Diversifié' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {fund.type}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance 1 an</span>
                  <div className="flex items-center">
                    {fund.performance1y > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`font-semibold ${fund.performance1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.performance1y > 0 ? '+' : ''}{fund.performance1y}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Frais de gestion</span>
                  <span className="font-semibold text-gray-900">{fund.managementFee}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minimum</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(fund.minInvestment)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Actifs sous gestion</span>
                  <span className="font-semibold text-gray-900">{formatAssets(fund.assets)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Ratio de Sharpe</span>
                <div className="flex items-center">
                  <sharpeInfo.Icon className={`h-4 w-4 mr-1 ${sharpeInfo.color}`} />
                  <span className={`font-semibold ${sharpeInfo.color}`}>
                    {sharpeInfo.level}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                <Info className="h-4 w-4 mr-2" />
                Voir les détails
              </button>
            </div>
          );
        })}
        </div>

        {visibleCount < filteredFunds.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(prevCount => prevCount + 6)}
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Afficher plus
            </button>
          </div>
        )}

        {filteredFunds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucun fonds trouvé avec ces critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Modal for fund details */}
      {selectedFund && (
        <FundModal fund={selectedFund} onClose={() => setSelectedFund(null)} />
      )}
    </section>
  );
};

export default FundsList;