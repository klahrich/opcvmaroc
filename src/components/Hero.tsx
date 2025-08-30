import React from 'react';
import { TrendingUp, Shield, Target } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Investissez Intelligemment
            <span className="block text-yellow-400">avec les OPCVMs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Découvrez, comparez et investissez dans les meilleurs fonds communs de placement du Maroc. 
            Diversifiez votre portefeuille selon votre profil de risque.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors">
              Explorer les Fonds
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors">
              Commencer la Simulation
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance Optimisée</h3>
            <p className="text-blue-200">
              Accédez aux performances historiques et analyses détaillées de chaque fonds
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Investissement Sécurisé</h3>
            <p className="text-blue-200">
              Fonds réglementés par l'AMMC avec gestion professionnelle
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diversification Intelligente</h3>
            <p className="text-blue-200">
              Construisez un portefeuille équilibré selon vos objectifs financiers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;