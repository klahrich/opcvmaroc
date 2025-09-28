import React from 'react';
import Simulation from './Simulation';
import Header from './Header';
import Footer from './Footer';

const SimulationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <Simulation />
      </main>
      <Footer />
    </div>
  );
};

export default SimulationPage;