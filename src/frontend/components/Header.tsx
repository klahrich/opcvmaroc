import React, { useState } from 'react';
import { Menu, X, TrendingUp, BookOpen, Calculator, Home } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-800" />
            <span className="text-2xl font-bold text-gray-900">OPCVM Maroc</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors">
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </a>
            <a href="#funds" className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors">
              <TrendingUp className="h-4 w-4" />
              <span>OPCVMs</span>
            </a>
            <a href="#education" className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Éducation</span>
            </a>
            <a href="#simulation" className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors">
              <Calculator className="h-4 w-4" />
              <span>Simulation</span>
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </a>
              <a href="#funds" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <TrendingUp className="h-4 w-4" />
                <span>OPCVMs</span>
              </a>
              <a href="#education" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <BookOpen className="h-4 w-4" />
                <span>Éducation</span>
              </a>
              <a href="#simulation" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Calculator className="h-4 w-4" />
                <span>Simulation</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;