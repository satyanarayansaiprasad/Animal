import React from 'react';
import { Award, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-12 text-start bg-[#F9F6F0] min-h-screen">
      {/* Premium Dark Brown Hero Banner */}
      <div className="bg-[#351809] text-white p-8 sm:p-14 rounded-3xl border border-[#5C2D15] shadow-2xl space-y-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D97706] shadow-md">
          <img src="/images/logo.jpg" alt="Al Namoos Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          {language === 'ar' ? 'عن صيدلية الناموس البيطرية' : 'About Al Namoos Veterinary Store'}
        </h1>
        <p className="text-white/80 text-sm sm:text-lg leading-relaxed max-w-3xl">
          Rooted in Omani desert heritage, Al Namoos is the leading veterinary pharmacy and livestock specialist providing certified medicines, performance vitamins, and specialized feed across the GCC.
        </p>
      </div>

      {/* Heritage & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-surface-bordered p-8 rounded-3xl space-y-3 shadow-warm">
          <div className="p-3.5 bg-amber-100 text-[#D97706] rounded-2xl w-fit border border-amber-200">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-extrabold text-charcoal text-lg">Racing & Equestrian Heritage</h3>
          <p className="text-xs text-bodytext-muted leading-relaxed">
            Formulated specifically for racing camels and Arabian horses participating in Middle Eastern festivals and endurance cups.
          </p>
        </div>

        <div className="bg-white border border-surface-bordered p-8 rounded-3xl space-y-3 shadow-warm">
          <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-2xl w-fit border border-emerald-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-extrabold text-charcoal text-lg">Certified Pharmaceutical Standards</h3>
          <p className="text-xs text-bodytext-muted leading-relaxed">
            All medicines, injections, and vaccines are sourced directly from certified pharmaceutical laboratories maintaining strict quality controls.
          </p>
        </div>

        <div className="bg-white border border-surface-bordered p-8 rounded-3xl space-y-3 shadow-warm">
          <div className="p-3.5 bg-amber-50 text-[#351809] rounded-2xl w-fit border border-amber-200">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-extrabold text-charcoal text-lg">GCC Cold-Chain Logistics</h3>
          <p className="text-xs text-bodytext-muted leading-relaxed">
            Temperature-controlled express logistics ensuring medical formulas maintain full efficacy from our Oman hub to your camp.
          </p>
        </div>
      </div>
    </div>
  );
};
