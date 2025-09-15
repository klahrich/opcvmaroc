import React from 'react';
import { X, TrendingUp, BarChart3, DollarSign, Clock, Calculator } from 'lucide-react';
import { Fund } from '../types';
import { formatCurrency, formatAssets, formatPercentage, getPerformanceColor, getRiskLevel } from '../utils/formatters';

interface FundModalProps {
  fund: Fund;
  onClose: () => void;
}

const FundModal: React.FC<FundModalProps> = ({ fund, onClose }) => {
  const riskLevel = getRiskLevel(fund.volatility);

  const performanceData = [
    { period: '1 mois', value: fund.performance1y / 12 },
    { period: '3 mois', value: fund.performance1y / 4 },
    { period: '6 mois', value: fund.performance1y / 2 },
    { period: '1 an', value: fund.performance1y },
    { period: '3 ans (ann.)', value: fund.performance3y }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{fund.name}</h3>
              <p className="text-gray-600">{fund.manager}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                fund.type === 'Actions' ? 'bg-red-100 text-red-800' :
                fund.type === 'Monétaire' ? 'bg-green-100 text-green-800' :
                fund.type === 'Diversifié' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {fund.type}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">{fund.description}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Performance Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Performance Historique
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{item.period}</span>
                      <span className={`font-semibold ${getPerformanceColor(item.value)}`}>
                        {formatPercentage(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">Analyse du Risque</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Volatilité annuelle</span>
                  <span className="font-semibold text-blue-900">{formatPercentage(fund.volatility, false)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-blue-700">Niveau de risque</span>
                  <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.level}</span>
                </div>
              </div>
            </div>

            {/* Fees and Investment Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                Structure des Frais
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frais de souscription</span>
                    <span className="font-semibold text-gray-900">{formatPercentage(fund.subscriptionFee, false)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frais de gestion annuels</span>
                    <span className="font-semibold text-gray-900">{formatPercentage(fund.managementFee, false)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frais de sortie</span>
                    <span className="font-semibold text-gray-900">{formatPercentage(fund.exitFee, false)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="text-emerald-700 font-medium">Investissement minimum</span>
                  <span className="text-lg font-bold text-emerald-900">{formatCurrency(fund.minInvestment)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">Actifs sous gestion</span>
                  <span className="text-lg font-bold text-blue-900">{formatAssets(fund.assets)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Calculator */}
          <div className="bg-gradient-to-r from-blue-800 to-emerald-600 rounded-lg p-6 text-white">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Calculateur d'Investissement
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-blue-100 text-sm">Investissement de 10,000 MAD</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(10000 * Math.pow(1 + fund.performance1y / 100, 1))}
                </p>
                <p className="text-blue-100 text-xs">après 1 an</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Investissement de 10,000 MAD</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(10000 * Math.pow(1 + fund.performance3y / 100, 3))}
                </p>
                <p className="text-blue-100 text-xs">après 3 ans</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Investissement de 10,000 MAD</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(10000 * Math.pow(1 + fund.performance3y / 100, 5))}
                </p>
                <p className="text-blue-100 text-xs">après 5 ans</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Investir Maintenant
            </button>
            <button className="flex-1 border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Ajouter à la Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundModal;