import React from 'react';
import { TrendingUp, TrendingDown, Info, Plus } from 'lucide-react';
import { Fund } from '../data/mockData';
import { formatCurrency, formatAssets, formatPercentage, getPerformanceColor, getRiskLevel } from '../utils/formatters';

interface FundCardProps {
  fund: Fund;
  onViewDetails: (fund: Fund) => void;
  onAddToSimulation?: (fund: Fund) => void;
  compact?: boolean;
}

const FundCard: React.FC<FundCardProps> = ({ fund, onViewDetails, onAddToSimulation, compact = false }) => {
  const riskLevel = getRiskLevel(fund.volatility);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
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

      {!compact && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{fund.description}</p>
      )}

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Performance 1 an</span>
          <div className="flex items-center">
            {fund.performance1y > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className={`font-semibold ${getPerformanceColor(fund.performance1y)}`}>
              {formatPercentage(fund.performance1y)}
            </span>
          </div>
        </div>

        {!compact && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Performance 3 ans</span>
              <span className={`font-semibold ${getPerformanceColor(fund.performance3y)}`}>
                {formatPercentage(fund.performance3y)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Niveau de risque</span>
              <span className={`font-semibold ${riskLevel.color}`}>
                {riskLevel.level}
              </span>
            </div>
          </>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Frais de gestion</span>
          <span className="font-semibold text-gray-900">{formatPercentage(fund.managementFee, false)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Minimum</span>
          <span className="font-semibold text-gray-900">{formatCurrency(fund.minInvestment)}</span>
        </div>

        {!compact && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Actifs sous gestion</span>
            <span className="font-semibold text-gray-900">{formatAssets(fund.assets)}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(fund)}
          className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <Info className="h-4 w-4 mr-2" />
          Détails
        </button>
        {onAddToSimulation && (
          <button
            onClick={() => onAddToSimulation(fund)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FundCard;