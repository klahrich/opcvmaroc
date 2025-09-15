import React, { useState } from 'react';
import { Plus, Minus, Calculator, PieChart, BarChart3, Target } from 'lucide-react';

const Simulation = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(10000);

  const availableFunds = [
    { id: 1, name: "BMCE Actions", expectedReturn: 12.5, volatility: 15.2, type: "Actions" },
    { id: 2, name: "Attijariwafa Monétaire", expectedReturn: 3.2, volatility: 0.8, type: "Monétaire" },
    { id: 3, name: "CDG Diversifié", expectedReturn: 7.8, volatility: 8.5, type: "Diversifié" },
    { id: 4, name: "Crédit Agricole Obligations", expectedReturn: 4.5, volatility: 3.1, type: "Obligataire" },
    { id: 5, name: "BMCI Croissance", expectedReturn: 15.2, volatility: 18.7, type: "Actions" },
    { id: 6, name: "Popular Équilibré", expectedReturn: 6.9, volatility: 7.2, type: "Diversifié" }
  ];

  const addToPortfolio = (fund) => {
    const existing = portfolio.find(p => p.id === fund.id);
    if (existing) {
      setPortfolio(portfolio.map(p => 
        p.id === fund.id ? { ...p, allocation: Math.min(100, p.allocation + 10) } : p
      ));
    } else {
      setPortfolio([...portfolio, { ...fund, allocation: 10 }]);
    }
  };

  const updateAllocation = (fundId, newAllocation) => {
    setPortfolio(portfolio.map(p => 
      p.id === fundId ? { ...p, allocation: Math.max(0, Math.min(100, newAllocation)) } : p
    ));
  };

  const removeFromPortfolio = (fundId) => {
    setPortfolio(portfolio.filter(p => p.id !== fundId));
  };

  const totalAllocation = portfolio.reduce((sum, fund) => sum + fund.allocation, 0);

  const calculatePortfolioMetrics = () => {
    if (portfolio.length === 0) return { expectedReturn: 0, volatility: 0, maxDrawdown: 0 };

    const normalizedPortfolio = portfolio.map(fund => ({
      ...fund,
      weight: fund.allocation / totalAllocation
    }));

    const expectedReturn = normalizedPortfolio.reduce(
      (sum, fund) => sum + (fund.expectedReturn * fund.weight), 0
    );

    const volatility = Math.sqrt(
      normalizedPortfolio.reduce(
        (sum, fund) => sum + (Math.pow(fund.volatility * fund.weight, 2)), 0
      )
    );

    const maxDrawdown = volatility * 2.5; // Simplified calculation

    return { expectedReturn, volatility, maxDrawdown };
  };

  const metrics = calculatePortfolioMetrics();

  return (
    <section id="simulation" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simulateur de Portefeuille
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Créez et analysez votre portefeuille d'OPCVMs pour optimiser vos investissements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Funds */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fonds Disponibles</h3>
            <div className="space-y-3">
              {availableFunds.map((fund) => (
                <div
                  key={fund.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{fund.name}</h4>
                      <p className="text-sm text-gray-600">{fund.type}</p>
                    </div>
                    <button
                      onClick={() => addToPortfolio(fund)}
                      className="bg-blue-800 hover:bg-blue-900 text-white p-1 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rendement attendu:</span>
                    <span className="font-medium text-green-600">{fund.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Volatilité:</span>
                    <span className="font-medium text-gray-900">{fund.volatility}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Builder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Votre Portefeuille</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant Total d'Investissement
                </label>
                <input
                  type="number"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                />
              </div>

              {portfolio.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Ajoutez des fonds pour commencer votre simulation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolio.map((fund) => (
                    <div key={fund.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{fund.name}</h4>
                          <p className="text-sm text-gray-600">{fund.type}</p>
                        </div>
                        <button
                          onClick={() => removeFromPortfolio(fund.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={fund.allocation}
                            onChange={(e) => updateAllocation(fund.id, Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">{fund.allocation}%</span>
                          <p className="text-sm text-gray-600">
                            {((totalInvestment * fund.allocation) / 100).toLocaleString('fr-MA')} MAD
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Allocation totale:</span>
                      <span className={`font-bold text-lg ${
                        totalAllocation === 100 ? 'text-green-600' : 
                        totalAllocation > 100 ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {totalAllocation}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Metrics */}
            {portfolio.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analyse du Portefeuille
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Rendement Attendu</h4>
                    <p className="text-2xl font-bold text-green-600">{metrics.expectedReturn.toFixed(2)}%</p>
                    <p className="text-sm text-gray-600">par an</p>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Calculator className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Volatilité</h4>
                    <p className="text-2xl font-bold text-yellow-600">{metrics.volatility.toFixed(2)}%</p>
                    <p className="text-sm text-gray-600">risque annuel</p>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Perte Max Estimée</h4>
                    <p className="text-2xl font-bold text-red-600">{metrics.maxDrawdown.toFixed(2)}%</p>
                    <p className="text-sm text-gray-600">scénario défavorable</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Projection sur 5 ans</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Scénario optimiste (+1σ):</span>
                      <p className="font-bold text-blue-900">
                        {(totalInvestment * Math.pow(1 + (metrics.expectedReturn + metrics.volatility) / 100, 5)).toLocaleString('fr-MA')} MAD
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-700">Scénario pessimiste (-1σ):</span>
                      <p className="font-bold text-blue-900">
                        {(totalInvestment * Math.pow(1 + Math.max(0, metrics.expectedReturn - metrics.volatility) / 100, 5)).toLocaleString('fr-MA')} MAD
                      </p>
                    </div>
                  </div>
                </div>

                {totalAllocation !== 100 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      ⚠️ L'allocation totale doit être de 100% pour une simulation précise
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulation;