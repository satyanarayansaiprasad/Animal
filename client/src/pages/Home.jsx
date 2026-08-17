import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Stethoscope, ArrowRight, ArrowLeft, Award, Sparkles, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';
import { ProductCard } from '../components/ProductCard';
import { apiFetch } from '../services/api';

export const Home = () => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/products')
      .then((data) => {
        if (data && data.success && data.data) {
          setFeaturedProducts(data.data.filter((p) => p.is_featured).slice(0, 8));
          setBestSellers(data.data.filter((p) => p.is_best_seller).slice(0, 8));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16 pb-16 font-body">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-charcoal text-sand overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-charcoal-light shadow-2xl">
        {/* Subtle desert motif pattern backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B85C2E_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-light border border-gold/30 text-gold text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>{t('trustedSpecialist')}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {t('heroTitle')}
            </h1>

            <p className="text-sand/80 text-sm sm:text-lg leading-relaxed max-w-2xl font-normal">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="px-8 py-4 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base flex items-center gap-2"
              >
                <span>{t('exploreStore')}</span>
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </Link>

              <Link
                to="/consultation"
                className="px-6 py-4 bg-charcoal-light hover:bg-teal text-white border border-sand/20 font-display font-semibold rounded-2xl transition-all text-sm sm:text-base flex items-center gap-2"
              >
                <Stethoscope className="w-5 h-5 text-gold" />
                <span>{t('askDoctor')}</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="pt-8 border-t border-charcoal-light grid grid-cols-3 gap-4 text-center sm:text-start">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold">100%</span>
                <p className="text-xs text-sand/70">Certified Medicines</p>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold">24/7</span>
                <p className="text-xs text-sand/70">Veterinary Support</p>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold">GCC</span>
                <p className="text-xs text-sand/70">Cold-Chain Express</p>
              </div>
            </div>
          </div>

          {/* Hero Visual: Petroglyph Showcase Cards */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-surface/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-gold uppercase tracking-wider">Species Specialty</span>
                <h3 className="font-display font-bold text-white text-xl">Omani Desert Livestock</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Link to="/shop?category=camel" className="flex flex-col items-center gap-2 group">
                  <PetroglyphIcon species="camel" size="md" />
                  <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{t('camel')}</span>
                </Link>
                <Link to="/shop?category=horse" className="flex flex-col items-center gap-2 group">
                  <PetroglyphIcon species="horse" size="md" />
                  <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{t('horse')}</span>
                </Link>
                <Link to="/shop?category=cow" className="flex flex-col items-center gap-2 group">
                  <PetroglyphIcon species="cow" size="md" />
                  <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{t('cow')}</span>
                </Link>
              </div>

              <div className="bg-charcoal/80 p-4 rounded-2xl border border-gold/20 text-xs text-sand/90 flex items-center gap-3">
                <Award className="w-8 h-8 text-gold shrink-0" />
                <span>Formulated for Arabian Peninsula climate and racing season endurance.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIES CATEGORY PETROGLYPH TILES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-extrabold text-clay uppercase tracking-widest">Target Livestock</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-charcoal">
            {language === 'ar' ? 'اختر نوع الحلال والحيوان' : 'Select Animal Species'}
          </h2>
          <p className="text-xs sm:text-sm text-bodytext-muted max-w-xl mx-auto">
            Browse tailored veterinary medicines, performance supplements, specialized feed, and equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Camel Tile */}
          <Link
            to="/shop?category=camel"
            className="group relative bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1"
          >
            <PetroglyphIcon species="camel" size="lg" />
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-xl text-charcoal group-hover:text-clay transition-colors">
                {t('camel')}
              </h3>
              <p className="text-xs text-bodytext-muted">
                {language === 'ar' ? 'هجن السباق، المزاينة، والإبل الأصيلة' : 'Racing camels, breeding, & endurance supplements'}
              </p>
            </div>
            <span className="text-xs font-bold text-clay group-hover:underline flex items-center gap-1">
              <span>{t('viewDetails')}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </span>
          </Link>

          {/* Horse Tile */}
          <Link
            to="/shop?category=horse"
            className="group relative bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1"
          >
            <PetroglyphIcon species="horse" size="lg" />
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-xl text-charcoal group-hover:text-clay transition-colors">
                {t('horse')}
              </h3>
              <p className="text-xs text-bodytext-muted">
                {language === 'ar' ? 'الخيل العربية، القدرة والتحمل، والفروسية' : 'Arabian horses, endurance, & farrier care'}
              </p>
            </div>
            <span className="text-xs font-bold text-clay group-hover:underline flex items-center gap-1">
              <span>{t('viewDetails')}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </span>
          </Link>

          {/* Cow Tile */}
          <Link
            to="/shop?category=cow"
            className="group relative bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1"
          >
            <PetroglyphIcon species="cow" size="lg" />
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-xl text-charcoal group-hover:text-clay transition-colors">
                {t('cow')}
              </h3>
              <p className="text-xs text-bodytext-muted">
                {language === 'ar' ? 'الأبقار، الماشية، وإدرار الحليب' : 'Dairy cattle, rumen health, & livestock equipment'}
              </p>
            </div>
            <span className="text-xs font-bold text-clay group-hover:underline flex items-center gap-1">
              <span>{t('viewDetails')}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </span>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED VETERINARY PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold text-teal uppercase tracking-widest">Pharmacy Highlights</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
              {language === 'ar' ? 'أبرز الأدوية والمكملات المعتمدة' : 'Featured Certified Medicines'}
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-clay hover:underline flex items-center gap-1"
          >
            <span>{t('startShopping')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-surface rounded-2xl animate-pulse border border-surface-bordered" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. ASK A DOCTOR VETERINARY CONSULTATION SECTION */}
      <section className="bg-sand-dark py-14 border-y border-surface-bordered">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal font-bold text-xs rounded-full">
              <Stethoscope className="w-4 h-4" />
              <span>Veterinary Advice & Dosage Guidelines</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-charcoal">
              {t('askDoctorTitle')}
            </h2>
            <p className="text-bodytext text-sm sm:text-base leading-relaxed">
              {t('askDoctorSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/96894694666"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Dr. Ahmed (+968 9469 4666)</span>
              </a>

              <a
                href="https://wa.me/96879644471"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-teal hover:bg-teal-hover text-white font-display font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Dr. Sarah (+968 7964 4471)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 bg-surface p-6 rounded-2xl border border-surface-bordered shadow-warm space-y-3">
            <h4 className="font-display font-bold text-charcoal text-base">Quick Consultation Topics</h4>
            <ul className="space-y-2 text-xs text-bodytext-muted">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-clay" />
                <span>Pre-race camel injection schedules & ATP protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span>Equine joint stiffness & ulcer paste treatment</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>Dairy cattle bloat emergency & milk fever prevention</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-extrabold text-gold uppercase tracking-widest">Most Requested</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
            {language === 'ar' ? 'الأكثر طلبًا في المزارع والعزب' : 'Best-Selling Farm Supplies'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
