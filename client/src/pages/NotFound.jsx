import React from 'react';
import { Link } from 'react-router-dom';
import { PetroglyphIcon } from '../components/PetroglyphIcon';

export const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 font-body">
      <PetroglyphIcon species="camel" size="xl" className="mx-auto" />
      <h1 className="font-display font-black text-4xl text-charcoal">404 — Page Not Found</h1>
      <p className="text-xs sm:text-sm text-bodytext-muted max-w-md mx-auto">
        The requested veterinary catalog page does not exist or has been relocated.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl text-xs inline-block shadow-lg transition-all"
      >
        Return to Store Home
      </Link>
    </div>
  );
};
