import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, Stethoscope, ShoppingBag, PhoneCall, CheckCircle2, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-12 text-start bg-[#F9F6F0] min-h-screen">
      {/* 1. PREMIUM DARK BROWN HERO BANNER */}
      <div className="bg-[#351809] text-white p-8 sm:p-14 rounded-3xl border border-[#5C2D15] shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <img
            src="/images/logo.jpg"
            alt="Al Namoos Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#D97706] shadow-xl shrink-0"
          />
          <div>
            <span className="inline-block px-3 py-1 bg-[#5C2D15] border border-[#D97706]/40 text-amber-300 text-[11px] font-extrabold rounded-full uppercase tracking-wider mb-1">
              🇴🇲 Sultanate of Oman • Established Excellence
            </span>
            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
              {language === 'ar' ? 'عن عيادة وصيدلية الناموس البيطرية' : 'About AL-NAMOOS VET CLINIC'}
            </h1>
          </div>
        </div>

        <p className="text-white/90 text-sm sm:text-lg leading-relaxed max-w-4xl">
          Rooted in Omani desert heritage, Al Namoos is the leading veterinary pharmacy and livestock care specialist in Oman and the GCC. We provide certified pharmaceutical medicines, performance vitamin regimens, camel race ATP protocols, and specialized nutrition for camels, Arabian horses, cattle, falcons, and pets.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/shop"
            className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-display font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2 active:scale-98"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>{t('shop')}</span>
          </Link>

          <Link
            to="/consultation"
            className="px-6 py-3.5 bg-[#5C2D15] hover:bg-[#6D361A] text-white font-display font-extrabold text-xs sm:text-sm rounded-2xl border border-amber-500/30 transition-all flex items-center gap-2 active:scale-98"
          >
            <Stethoscope className="w-4 h-4 text-amber-300" />
            <span>Consult Dr. Hafez</span>
          </Link>
        </div>
      </div>

      {/* 2. METRICS & STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { number: '15+', label: 'Years Practice', desc: 'In Oman & GCC' },
          { number: '100%', label: 'Certified Grade', desc: 'Lab-tested formulas' },
          { number: '500+', label: 'Camel & Horse Camps', desc: 'Trusted across GCC' },
          { number: '24/7', label: 'Cold-Chain Shipping', desc: 'Temperature controlled' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-surface-bordered p-6 rounded-3xl text-center space-y-1 shadow-warm">
            <span className="font-mono-price font-black text-2xl sm:text-3xl text-[#D97706] block">{stat.number}</span>
            <span className="font-display font-extrabold text-charcoal text-xs sm:text-sm block">{stat.label}</span>
            <span className="text-[10px] text-bodytext-muted block">{stat.desc}</span>
          </div>
        ))}
      </div>

      {/* 3. DOCTOR & PHARMACY HERITAGE SECTION */}
      <div className="bg-white border border-surface-bordered p-6 sm:p-10 rounded-3xl shadow-warm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 shrink-0 text-center sm:text-start">
          <img
            src="/images/doctor_banner.jpg"
            alt="Dr. Hafez — Senior Veterinary Specialist"
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl object-cover border-4 border-[#D97706] shadow-xl mx-auto lg:mx-0"
          />
        </div>

        <div className="lg:col-span-8 space-y-4">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold rounded-lg uppercase">
            Clinical Care & Veterinary Leadership
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
            {language === 'ar' ? 'د. حافظ — استشاري طب وجراحة الهجن والخيل' : 'Dr. Hafez — Senior Veterinary Specialist'}
          </h2>
          <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
            Led by Dr. Hafez, our veterinary pharmacy specializes in racing camel stamina enhancement, ATP injection protocols, joint inflammation treatment for endurance horses, and complete livestock health care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Camel Racing ATP & Vitamin Protocols</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Arabian Horse Joint & Hoof Care</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Official Doping Test Safe Formulas</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Temperature-Controlled Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HERITAGE & VALUES GRID */}
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
