import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FinancialCorner from './components/FinancialCorner';
import FundsList from './components/FundsList';
import Simulation from './components/Simulation';
import Footer from './components/Footer';
import FundModal from './components/FundModal';
import { Fund } from './types';

function App() {
  const fundsRef = useRef<HTMLDivElement>(null);

  const handleScrollToFunds = () => {
    fundsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onScrollToFunds={handleScrollToFunds} />
      <FinancialCorner />
      <div ref={fundsRef}>
        <FundsList />
      </div>
      <Simulation />
      <Footer />
    </div>
  );
}

export default App;