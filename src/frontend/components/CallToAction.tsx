import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-blue-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Prêt à planifier votre avenir financier ?</span>
          <span className="block text-yellow-400">Lancez notre simulateur d'investissement.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/simulation"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-yellow-400 hover:bg-yellow-500"
            >
              <BarChart className="-ml-1 mr-2 h-5 w-5" />
              Commencer la Simulation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;