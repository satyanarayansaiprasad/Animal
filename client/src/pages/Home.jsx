import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';
import { ProductCard } from '../components/ProductCard';
import { apiFetch } from '../services/api';

export const Home = () => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/products')
      .then((data) => {
        if (data && data.success && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Filtered Product Lists for Sections
  const medicines = products.filter((p) => p.type === 'medicine').slice(0, 4);
  const camelVitamins = products.filter((p) => p.category === 'camel' && p.type === 'supplements').slice(0, 4);
  const jointSupplements = products.filter((p) => p.category === 'horse' || p.type === 'supplements').slice(0, 4);
  const feedsAndNutrition = products.filter((p) => p.type === 'feed').slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-body text-start bg-sand-light">
      {/* 1. CINEMATIC FULL-WIDTH HERO BANNER (Camel Racing / سباقات الهجن) */}
      <section className="relative w-full bg-charcoal text-sand overflow-hidden min-h-[420px] sm:min-h-[540px] flex items-center justify-center border-b border-surface-bordered shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80"
          alt="Camel Racing Desert"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
        />
        {/* Soft Golden Sand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/40" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4 sm:space-y-6 py-16">
          <span className="text-gold text-xs sm:text-sm font-extrabold uppercase tracking-widest block font-display">
            {language === 'ar' ? 'أصالة، جودة، وخبرة بيطرية' : 'Authentic Veterinary Excellence'}
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-tight">
            {language === 'ar' ? 'سباقات الهجن والفروسية' : 'Camel Racing & Equine Excellence'}
          </h1>

          <p className="text-sand/90 text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'صيدلية الناموس البيطرية — المركز الأول لمستلزمات وأدوية ومكملات سباقات الهجن والخيل بعُمان والخليج.'
              : "Al Namoos Vet Pharmacy — Oman's premier destination for camel racing, equine endurance, and livestock care."}
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              to="/shop"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-clay hover:bg-clay-hover text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              title="Explore Store Catalog"
            >
              <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FOUR VERTICAL ANIMAL TYPE CATEGORY CARDS (قطط، كلاب، خيل، إبل / Camels, Horses, Cattle, Sheep) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Camels (إبل والهجن) */}
          <Link
            to="/shop?category=camel"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-5 border border-surface-bordered"
          >
            <img
              src="/images/species/camel.jpg"
              alt="Camels"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-gold transition-colors">
                {t('camel')}
              </h3>
              <span className="text-[11px] text-sand/80 block font-semibold">
                {language === 'ar' ? 'سباقات ومزاينة' : 'Racing & Breeding'}
              </span>
            </div>
          </Link>

          {/* Card 2: Horses (خيل وفروسية) */}
          <Link
            to="/shop?category=horse"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-5 border border-surface-bordered"
          >
            <img
              src="/images/species/horse.jpg"
              alt="Horses"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-gold transition-colors">
                {t('horse')}
              </h3>
              <span className="text-[11px] text-sand/80 block font-semibold">
                {language === 'ar' ? 'قدرة وفروسية' : 'Endurance & Riding'}
              </span>
            </div>
          </Link>

          {/* Card 3: Cattle (أبقار وماشية) */}
          <Link
            to="/shop?category=cow"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-5 border border-surface-bordered"
          >
            <img
              src="/images/species/cow.jpg"
              alt="Cattle"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-gold transition-colors">
                {t('cow')}
              </h3>
              <span className="text-[11px] text-sand/80 block font-semibold">
                {language === 'ar' ? 'إدرار الحليب والتسمين' : 'Dairy & Fattening'}
              </span>
            </div>
          </Link>

          {/* Card 4: Sheep & Livestock (أغنام وماشية) */}
          <Link
            to="/shop?type=supplements"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-5 border border-surface-bordered"
          >
            <img
              src="/images/species/sheep.jpg"
              alt="Livestock"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-gold transition-colors">
                {language === 'ar' ? 'الأغنام والماشية' : 'Sheep & Livestock'}
              </h3>
              <span className="text-[11px] text-sand/80 block font-semibold">
                {language === 'ar' ? 'صحة العزب والتغذية' : 'Health & Nutrition'}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. PROMOTIONAL FEATURE BANNER BREAK 1 (ماكينة مشي الخيول والهجن / Paddock & Equipment Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-charcoal text-white p-8 sm:p-12 shadow-2xl border border-charcoal-light flex flex-col items-center justify-center text-center space-y-4">
          <img
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80"
            alt="Equine Track Equipment"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-gold font-extrabold text-xs tracking-widest uppercase block font-display">
              {language === 'ar' ? 'معدات المزارع والمضمار' : 'Paddock & Track Equipment'}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl">
              {language === 'ar' ? 'أجهزة ومعدات تدريب الخيل والهجن' : 'Equine Treadmills & Paddock Equipment'}
            </h2>
            <p className="text-xs sm:text-sm text-sand/80">
              {language === 'ar'
                ? 'نوفر أفضل معدات التأهيل، المشايات الدوارة، وأسوار UPVC المعزولة المخصصة للعزب والمضامير.'
                : 'Premium training walkers, insulated UPVC fencing, and paddock flooring for GCC stables.'}
            </p>
            <div className="pt-2">
              <Link
                to="/shop?type=equipment"
                className="px-6 py-3 bg-clay hover:bg-clay-hover text-white font-bold rounded-2xl text-xs inline-flex items-center gap-2 shadow-lg transition-all"
              >
                <span>{language === 'ar' ? 'استكشف المعدات' : 'Explore Equipment'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT GRID SECTION 1 ("الأدوية" / Veterinary Medicines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
            {language === 'ar' ? 'الأدوية البيطرية' : 'Veterinary Medicines'}
          </h2>
          <p className="text-xs text-bodytext-muted">Certified prescription formulas and treatments</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-surface rounded-3xl animate-pulse border border-surface-bordered" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {medicines.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-2">
          <Link
            to="/shop?type=medicine"
            className="px-8 py-3 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Medicines'}
          </Link>
        </div>
      </section>

      {/* 5. PRODUCT GRID SECTION 2 ("فيتامينات الهجن" / Camel Performance Vitamins) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
            {language === 'ar' ? 'فيتامينات الهجن والسباق' : 'Racing Camel Vitamins'}
          </h2>
          <p className="text-xs text-bodytext-muted">High potency electrolytes, ATP boosters & racing formulas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {camelVitamins.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/shop?category=camel"
            className="px-8 py-3 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Camel Supplies'}
          </Link>
        </div>
      </section>

      {/* 6. PROMOTIONAL FEATURE BANNER BREAK 2 (أسوار UPVC وأرضيات المطاط / Farm Fencing & Flooring) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-charcoal-light text-white p-8 sm:p-12 shadow-xl border border-gold/20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-gold font-extrabold text-xs tracking-widest uppercase block font-display">
              {language === 'ar' ? 'تجهيز العزب والمزارع' : 'GCC Paddock Construction'}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              {language === 'ar' ? 'أسوار UPVC وأرضيات مطاطية للعزب' : 'UPVC Fencing & Rubber Stable Flooring'}
            </h2>
            <p className="text-xs sm:text-sm text-sand/80">
              {language === 'ar'
                ? 'أسوار عازلة للحرارة مقاومة للشمس وأرضيات امتصاص الصدمات لحماية حوافر ومفاصل الخيل والإبل.'
                : 'UV-resistant insulated fencing and shock-absorbent matting for equine and camel paddocks.'}
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/96895266144?text=استفسار عن أسوار UPVC وأرضيات العزب"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-teal hover:bg-teal-hover text-white font-bold rounded-2xl text-xs inline-flex items-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? 'اطلب تسعيرة عبر الواتساب' : 'Request WhatsApp Quote'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRODUCT GRID SECTION 3 ("صحة المفاصل والعظام" / Joint & Bone Care) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
            {language === 'ar' ? 'صحة المفاصل والعظام' : 'Joint & Bone Care'}
          </h2>
          <p className="text-xs text-bodytext-muted">Hyaluronic acid injections, joint pastes, and biotin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {jointSupplements.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/shop?type=supplements"
            className="px-8 py-3 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Supplements'}
          </Link>
        </div>
      </section>

      {/* 8. PRODUCT GRID SECTION 4 ("المكملات والأعلاف" / Feeds & Concentrates) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
            {language === 'ar' ? 'الأعلاف والتغذية التخصصية' : 'Feeds & Nutritional Concentrates'}
          </h2>
          <p className="text-xs text-bodytext-muted">Pre-race pellets, milk boosters, and alfalfa blends</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {feedsAndNutrition.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/shop?type=feed"
            className="px-8 py-3 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Feeds'}
          </Link>
        </div>
      </section>

      {/* 9. SEARCH INDEX QUICK DIRECTORY GRID ("استكشف الأقسام والمنتجات") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl space-y-6 shadow-warm">
          <div className="text-center space-y-1">
            <h3 className="font-display font-bold text-charcoal text-lg sm:text-xl">
              {language === 'ar' ? 'استكشف جميع الأقسام والمنتجات' : 'Explore All Store Categories & Index'}
            </h3>
            <p className="text-xs text-bodytext-muted">Quick directory for fast access to veterinary supplies</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs text-center">
            {[
              { label_ar: 'فيتامينات الهجن', label_en: 'Camel Vitamins', link: '/shop?category=camel' },
              { label_ar: 'أدوية سباقات القدرة', label_en: 'Equine Endurance', link: '/shop?category=horse' },
              { label_ar: 'منشطات إدرار الحليب', label_en: 'Dairy Concentrates', link: '/shop?category=cow' },
              { label_ar: 'مضادات حيوية معتمدة', label_en: 'Certified Antibiotics', link: '/shop?type=medicine' },
              { label_ar: 'معدات وأجهزة العزب', label_en: 'Farm Equipment', link: '/shop?type=equipment' },
              { label_ar: 'أعلاف السباق المركزة', label_en: 'Racing Pellets', link: '/shop?type=feed' },
              { label_ar: 'بودرة بيوتين الحوافر', label_en: 'Biotin Hoof Powder', link: '/shop?search=biotin' },
              { label_ar: 'علاج مفاصل الخيل', label_en: 'Equine Joint Paste', link: '/shop?search=joint' },
              { label_ar: 'أملاح تعويض الجفاف', label_en: 'Hydration Electrolytes', link: '/shop?search=electrolyte' },
              { label_ar: 'استشارة طبيب بيطري', label_en: 'Vet Doctor Advice', link: '/consultation' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="p-3 rounded-2xl bg-sand/60 hover:bg-clay hover:text-white transition-colors font-semibold text-charcoal border border-surface-bordered block truncate"
              >
                {language === 'ar' ? item.label_ar : item.label_en}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. VALUE PROPOSITION RIBBON BAR (3 Highlights: Fast GCC Shipping, Certified Formulas, Doctor Advice) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-surface-bordered p-6 rounded-3xl flex items-center gap-4 shadow-warm">
            <div className="p-3.5 bg-clay/10 text-clay rounded-2xl shrink-0">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-charcoal text-sm sm:text-base">
                {language === 'ar' ? 'شحن سريع لجميع دول الخليج' : 'Express GCC Delivery'}
              </h4>
              <p className="text-xs text-bodytext-muted mt-0.5">
                {language === 'ar' ? 'توصيل مبرد وسريع لعُمان والإمارات والسعودية والقطر' : 'Refrigerated fast transport across GCC'}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-surface-bordered p-6 rounded-3xl flex items-center gap-4 shadow-warm">
            <div className="p-3.5 bg-teal/10 text-teal rounded-2xl shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-charcoal text-sm sm:text-base">
                {language === 'ar' ? 'منتجات وأدوية معتمدة' : '100% Certified Formulas'}
              </h4>
              <p className="text-xs text-bodytext-muted mt-0.5">
                {language === 'ar' ? 'جميع التركيبات مرخصة من وزارات الثروة الزراعية' : 'Licensed by agricultural & vet authorities'}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-surface-bordered p-6 rounded-3xl flex items-center gap-4 shadow-warm">
            <div className="p-3.5 bg-gold/10 text-gold rounded-2xl shrink-0">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-charcoal text-sm sm:text-base">
                {language === 'ar' ? 'استشارة طبية مجانية 24/7' : 'Free Doctor Consultation'}
              </h4>
              <p className="text-xs text-bodytext-muted mt-0.5">
                {language === 'ar' ? 'أطباء بيطريون مختصون لإرشادك في الجرعات' : 'Expert guidance on dosage and treatment'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. ORANGE/CLAY CONTACT CALLOUT BANNER BOX (تواصل معنا عبر الواتساب) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-clay text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              {language === 'ar' ? 'هل تحتاج إلى استشارة بيطرية خاصة بالحلال؟' : 'Need Custom Veterinary Advice for Livestock?'}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {language === 'ar'
                ? 'تواصل مباشرة مع أطبائنا المختصين للحصول على الجدول العلاجي المناسب لهجنك أو خيلك.'
                : 'Connect directly with our licensed veterinarians for customized dosage protocols.'}
            </p>
          </div>

          <a
            href="https://wa.me/96895266144?text=السلام عليكم أريد استشارة بيطرية"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-charcoal hover:bg-charcoal-light text-white font-display font-bold rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 shrink-0 touch-target"
          >
            <MessageCircle className="w-5 h-5 text-gold" />
            <span>{language === 'ar' ? 'تواصل معنا عبر الواتساب' : 'Chat on WhatsApp'}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
