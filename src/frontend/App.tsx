import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FinancialCorner from './components/FinancialCorner';
import FundsList from './components/FundsList';
import Simulation from './components/Simulation';
import Footer from './components/Footer';
import FundCard from './components/FundCard';
import FundModal from './components/FundModal';
import { Fund } from './types';
import fundsData from './funds.json';
import { Search, Filter, X } from 'lucide-react';
import { formatCurrency, formatAssets } from './utils/formatters';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  const fundsRef = useRef<HTMLDivElement>(null);

  const handleScrollToFunds = () => {
    fundsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const funds: Fund[] = fundsData.map((fund: any, index: number) => ({
    id: index,
    name: fund.OPCVM,
    type: fund.Classification,
    manager: fund['Société de Gestion'],
    performance1y: fund['1 an'] * 100,
    performance3y: fund['3 ans'] * 100,
    volatility: 0, // This data is not available in the JSON
    subscriptionFee: fund['Commission de souscription'],
    managementFee: fund['Frais de gestion'],
    exitFee: fund[' Commission de rachat'],
    minInvestment: 0, // This data is not available in the JSON
    description: `Fonds de classification ${fund.Classification} géré par ${fund['Société de Gestion']}.`,
    assets: fund.AN,
  }));

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || fund.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onScrollToFunds={handleScrollToFunds} />
      <FinancialCorner />
      
      {/* OPCVMs Section */}
      <section id="funds" ref={fundsRef} className="py-16 bg-white">
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
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-48"
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
              <FundCard
                key={fund.id}
                fund={fund}
                onViewDetails={setSelectedFund}
              />
            ))}
          </div>

          {filteredFunds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucun fonds trouvé avec ces critères de recherche.</p>
            </div>
          )}
        </div>
      </section>

      <Simulation />
      <Footer />

      {/* Fund Details Modal */}
      {selectedFund && (
        <FundModal
          fund={selectedFund}
          onClose={() => setSelectedFund(null)}
        />
      )}
    </div>
  );
}

export default App;