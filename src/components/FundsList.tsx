import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Info } from 'lucide-react';

const FundsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFund, setSelectedFund] = useState(null);

  const funds = [
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
      assets: 450000000
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
      assets: 1200000000
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
      assets: 800000000
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
      assets: 650000000
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
      assets: 320000000
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
      assets: 580000000
    }
  ];

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || fund.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatAssets = (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}Md MAD`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M MAD`;
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
          {filteredFunds.map((fund) => (
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

              <button className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                <Info className="h-4 w-4 mr-2" />
                Voir les détails
              </button>
            </div>
          ))}
        </div>

        {filteredFunds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucun fonds trouvé avec ces critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Modal for fund details */}
      {selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedFund.name}</h3>
                  <p className="text-gray-600">{selectedFund.manager}</p>
                </div>
                <button
                  onClick={() => setSelectedFund(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-700 mb-6">{selectedFund.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>1 an</span>
                      <span className={`font-semibold ${selectedFund.performance1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedFund.performance1y > 0 ? '+' : ''}{selectedFund.performance1y}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 ans (annualisé)</span>
                      <span className={`font-semibold ${selectedFund.performance3y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedFund.performance3y > 0 ? '+' : ''}{selectedFund.performance3y}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatilité</span>
                      <span className="font-semibold text-gray-900">{selectedFund.volatility}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Structure des Frais</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Frais de souscription</span>
                      <span className="font-semibold text-gray-900">{selectedFund.subscriptionFee}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de gestion</span>
                      <span className="font-semibold text-gray-900">{selectedFund.managementFee}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de sortie</span>
                      <span className="font-semibold text-gray-900">{selectedFund.exitFee}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Investissement minimum</span>
                  <span className="text-lg font-semibold text-gray-900">{formatCurrency(selectedFund.minInvestment)}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-700">Actifs sous gestion</span>
                  <span className="text-lg font-semibold text-gray-900">{formatAssets(selectedFund.assets)}</span>
                </div>
                <button className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Ajouter à la simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FundsList;