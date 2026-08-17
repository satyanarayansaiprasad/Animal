import React from 'react';
import { Award, ShieldCheck, Truck, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';

export const About = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-12">
      {/* Hero Banner */}
      <div className="bg-charcoal text-sand p-8 sm:p-14 rounded-3xl border border-charcoal-light shadow-2xl space-y-4">
        <PetroglyphIcon species="camel" size="lg" />
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          {language === 'ar' ? 'عن صيدلية الناموس البيطرية' : 'About Al Namoos Veterinary Store'}
        </h1>
        <p className="text-sand/80 text-sm sm:text-lg leading-relaxed max-w-3xl">
          Rooted in Omani desert heritage, Al Namoos is the leading veterinary pharmacy and livestock specialist providing certified medicines, performance vitamins, and specialized feed across the GCC.
        </p>
      </div>

      {/* Heritage & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-surface-bordered p-8 rounded-3xl space-y-3 shadow-warm">
          <div className="p-3 bg-clay-light text-clay rounded-2xl w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-charcoal text-lg">Racing & Equestrian Heritage</h3>
          <p className="text-xs text-bodytext-muted leading-relaxed">
            Formulated specifically for racing camels and Arabian horses participating in Middle Eastern festivals and endurance cups.
          </p>
        </div>

        <div className="bg-surface border border-surface-bordered p-8 rounded-3xl space-y-3 shadow-warm">
          <div className="p-3 bg-teal-light text-teal rounded-2xl w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-charcoal text-lg">Certified Pharmaceutical Standards</h3>
          <p className="text-xs text-bodytext-muted leading-relaxed">
            All medicines, injections, and vaccines are sourced directly from certified pharmaceutical laboratories maintaining strict quality controls.
          </p>
        </div>

        <div className="bg-surface border border-surface-bordered p-8 rounded-3xl space-y-3 shadow-warm">
          <div className="p-3 bg-sand-dark text-gold rounded-2xl w-fit">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-charcoal text-lg">GCC Cold-Chain Logistics</h3>
          <p className="text-xs text-bodytext-muted leading-relaxed">
            Temperature-controlled express logistics ensuring medical formulas maintain full efficacy from our Oman hub to your camp.
          </p>
        </div>
      </div>
    </div>
  );
};
