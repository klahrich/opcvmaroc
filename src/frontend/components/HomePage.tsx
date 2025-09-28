import React, { useRef } from 'react';
import Hero from './Hero';
import FinancialCorner from './FinancialCorner';
import FundsList from './FundsList';

const HomePage = () => {
  const fundsRef = useRef<HTMLDivElement>(null);

  const handleScrollToFunds = () => {
    fundsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onScrollToFunds={handleScrollToFunds} />
      <FinancialCorner />
      <div ref={fundsRef}>
        <FundsList />
      </div>
    </>
  );
};

export default HomePage;