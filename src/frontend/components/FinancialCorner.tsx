import React from 'react';
import { Clock, ArrowRight, BookOpen, Newspaper, Users, Target, TrendingUp } from 'lucide-react';

const FinancialCorner = () => {
  const news = [
    {
      title: "BMCE Capital Gestion lance un nouveau fonds actions",
      excerpt: "Le nouveau fonds vise les entreprises à forte croissance du marché marocain...",
      time: "Il y a 2 heures",
      category: "Actualités"
    },
    {
      title: "Performance des OPCVMs au T3 2024",
      excerpt: "Analyse des performances trimestrielles des principaux fonds du marché...",
      time: "Il y a 5 heures",
      category: "Analyse"
    },
    {
      title: "Guide d'investissement pour débutants",
      excerpt: "Comment choisir son premier OPCVM : critères essentiels à considérer...",
      time: "Il y a 1 jour",
      category: "Éducation"
    }
  ];

  const educationalPosts = [
    {
      title: "Comprendre les frais des OPCVMs",
      description: "Guide complet sur les différents types de frais et leur impact sur vos rendements",
      icon: BookOpen,
      readTime: "5 min"
    },
    {
      title: "Diversification de portefeuille",
      description: "Stratégies pour répartir vos investissements et réduire les risques",
      icon: Target,
      readTime: "8 min"
    },
    {
      title: "Analyse des performances",
      description: "Comment interpréter les indicateurs de performance des fonds",
      icon: TrendingUp,
      readTime: "6 min"
    }
  ];

  return (
    <section id="education" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Coin Financier
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restez informé des dernières actualités et développez vos connaissances en investissement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* News Section */}
          <div>
            <div className="flex items-center mb-6">
              <Newspaper className="h-6 w-6 text-blue-800 mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Actualités du Marché</h3>
            </div>
            <div className="space-y-6">
              {news.map((article, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.time}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h4>
                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                  <button className="text-blue-800 hover:text-blue-900 font-medium flex items-center">
                    Lire la suite <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="h-6 w-6 text-emerald-600 mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Parcours Financier</h3>
            </div>
            <div className="space-y-6">
              {educationalPosts.map((post, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-emerald-500">
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                      <post.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                      <p className="text-gray-600 mb-3">{post.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">📖 {post.readTime} de lecture</span>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                          Lire <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-800 to-emerald-600 p-6 rounded-lg text-white">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 mr-2" />
                <h4 className="text-xl font-semibold">Communauté d'Investisseurs</h4>
              </div>
              <p className="mb-4">
                Rejoignez notre communauté de +5,000 investisseurs marocains pour échanger conseils et stratégies.
              </p>
              <button className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Rejoindre la Communauté
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialCorner;