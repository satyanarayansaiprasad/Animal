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

const heroSlides = [
  {
    image: '/images/hero_camel_desert.jpg',
    title_en: "AL-NAMOOS VET CLINIC — Camel Racing & Equine Excellence",
    title_ar: "سباقات الهجن والفروسية — عيادة الناموس البيطرية",
    subtitle_en: "Certified medicines, performance supplements, specialized feed, and equipment for camels, horses, and livestock.",
    subtitle_ar: "أدوية بيطرية معتمدة، مكملات الأداء، أعلاف تخصصية ومعدات عالية الجودة للإبل والخيل والمواشي.",
  },
  {
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80',
    title_en: "Arabian Horse & Equestrian Health Solutions",
    title_ar: "رعاية شاملة للخيل العربية وسباقات القدرة والفروسية",
    subtitle_en: "Joint support formulas, biotin hoof powders, anti-ulcer pastes, and endurance feeds for stallions.",
    subtitle_ar: "تركيبات مفاصل صيدلانية، بودرة البيوتين للحوافر، وأعلاف طاقة مخصصة لجياد القدرة والفروسية.",
  },
  {
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80',
    title_en: "Cattle Productivity & Rumen Digestive Care",
    title_ar: "حلول تخصصية للأبقار والمواشي وزيادة إدرار الحليب",
    subtitle_en: "Broad spectrum antibiotics, bloat tonics, calcium gels, and milk yield concentrates for farms.",
    subtitle_ar: "مضادات حيوية واسعة المجال، منشطات الكرش، وجيل الكالسيوم مع مركزات زيادة إدرار الحليب.",
  },
];

export const Home = () => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

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

  // Hero Background Slideshow Timer (Switch slide every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[activeSlide];
  const heroTitle = language === 'ar' ? currentSlideData.title_ar : currentSlideData.title_en;
  const heroSubtitle = language === 'ar' ? currentSlideData.subtitle_ar : currentSlideData.subtitle_en;

  // Filtered Product Lists for Al Zaafran Homepage Sections
  const medicines = products.filter((p) => p.type === 'medicine').slice(0, 4);
  const camelVitamins = products.filter((p) => p.category === 'camel' && p.type === 'supplements').slice(0, 4);
  const jointSupplements = products.filter((p) => p.category === 'horse' || p.type === 'supplements').slice(0, 4);
  const equipmentSupplies = products.filter((p) => p.type === 'equipment').slice(0, 4);
  const feedsAndNutrition = products.filter((p) => p.type === 'feed').slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-body text-start bg-brand-cream">
      {/* 1. CINEMATIC FULL-WIDTH HERO BANNER CAROUSEL (1:1 Al Zaafran Style) */}
      <section className="relative w-full bg-brown-dark text-white overflow-hidden min-h-[440px] sm:min-h-[560px] flex items-center justify-center border-b border-brown-border shadow-2xl">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt="Hero Background"
              className="w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out"
            />
          </div>
        ))}

        {/* Golden Warm Desert Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-brown-dark/65 to-brown-dark/40 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4 sm:space-y-6 py-16">
          <span className="text-brand-orange text-xs sm:text-sm font-extrabold uppercase tracking-widest block font-display">
            {language === 'ar' ? 'أصالة، جودة، وخبرة بيطرية' : 'Authentic Veterinary Excellence'}
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-tight">
            {heroTitle}
          </h1>

          <p className="text-white/90 text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="pt-3 flex justify-center">
            <Link
              to="/shop"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-2 border-white/20"
              title="Explore Store Catalog"
            >
              <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
            </Link>
          </div>
        </div>

        {/* Hero Orange Slide Indicator Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-8 bg-brand-orange' : 'w-3 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. FOUR VERTICAL ANIMAL SPECIES CARDS GRID (1:1 Al Zaafran Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Camels (إبل والهجن) */}
          <Link
            to="/shop?category=camel"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end p-5 border-2 border-brand-orange/20 hover:border-brand-orange"
          >
            <img
              src="/images/species/camel.jpg"
              alt="Camels"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-brown-dark/50 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <span className="inline-block px-3 py-1 bg-brand-orange text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                {language === 'ar' ? 'إبل' : 'Camels'}
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors">
                {t('camel')}
              </h3>
              <span className="text-[11px] text-white/80 block font-semibold">
                {language === 'ar' ? 'سباقات ومزاينة' : 'Racing & Breeding'}
              </span>
            </div>
          </Link>

          {/* Card 2: Horses (خيل وفروسية) */}
          <Link
            to="/shop?category=horse"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end p-5 border-2 border-brand-orange/20 hover:border-brand-orange"
          >
            <img
              src="/images/species/horse.jpg"
              alt="Horses"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-brown-dark/50 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <span className="inline-block px-3 py-1 bg-brand-orange text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                {language === 'ar' ? 'خيل' : 'Horses'}
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors">
                {t('horse')}
              </h3>
              <span className="text-[11px] text-white/80 block font-semibold">
                {language === 'ar' ? 'قدرة وفروسية' : 'Endurance & Riding'}
              </span>
            </div>
          </Link>

          {/* Card 3: Cattle (أبقار وماشية) */}
          <Link
            to="/shop?category=cow"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end p-5 border-2 border-brand-orange/20 hover:border-brand-orange"
          >
            <img
              src="/images/species/cow.jpg"
              alt="Cattle"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-brown-dark/50 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <span className="inline-block px-3 py-1 bg-brand-orange text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                {language === 'ar' ? 'أبقار' : 'Cattle'}
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors">
                {t('cow')}
              </h3>
              <span className="text-[11px] text-white/80 block font-semibold">
                {language === 'ar' ? 'إدرار الحليب والتسمين' : 'Dairy & Fattening'}
              </span>
            </div>
          </Link>

          {/* Card 4: Sheep & Small Livestock (أغنام وماشية) */}
          <Link
            to="/shop?type=supplements"
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end p-5 border-2 border-brand-orange/20 hover:border-brand-orange"
          >
            <img
              src="/images/species/sheep.jpg"
              alt="Livestock"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-brown-dark/50 to-transparent" />
            <div className="relative z-10 text-center space-y-1">
              <span className="inline-block px-3 py-1 bg-brand-orange text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                {language === 'ar' ? 'أغنام' : 'Sheep'}
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors">
                {language === 'ar' ? 'الأغنام والماشية' : 'Sheep & Livestock'}
              </h3>
              <span className="text-[11px] text-white/80 block font-semibold">
                {language === 'ar' ? 'صحة العزب والتغذية' : 'Health & Nutrition'}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. PROMOTIONAL FEATURE BANNER BREAK 1 (1:1 Al Zaafran "ماكينة مشي الخيول") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-brown-dark text-white p-8 sm:p-12 shadow-2xl border border-brown-border flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80"
            alt="Equine Track Equipment"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-brand-orange font-extrabold text-xs tracking-widest uppercase block font-display">
              {language === 'ar' ? 'تجهيز المزارع والمضمار' : 'Paddock & Track Equipment'}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              {language === 'ar' ? 'ماكينة مشي الخيول وأجهزة التدريب' : 'Equine Treadmills & Track Training Walkers'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ar'
                ? 'أفضل أجهزة التدريب والمشايات الدوارة للخيول والهجن مع تركيبات حماية المفاصل.'
                : 'Premium training walkers and paddock equipment for Arabian racing stables.'}
            </p>
            <div className="pt-2">
              <Link
                to="/shop?type=equipment"
                className="px-7 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-2xl text-xs inline-flex items-center gap-2 shadow-lg transition-all"
              >
                <span>{language === 'ar' ? 'تصفح المعدات' : 'Explore Equipment'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT GRID SECTION 1 ("الأدوية" / Veterinary Medicines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brown-dark">
            {language === 'ar' ? 'الأدوية' : 'Veterinary Medicines'}
          </h2>
          <p className="text-xs text-bodytext-muted">Certified prescription formulas and treatments</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-surface-bordered" />
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
            className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Medicines'}
          </Link>
        </div>
      </section>

      {/* 5. PRODUCT GRID SECTION 2 ("فيتامينات الهجن" / Camel Performance Vitamins) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brown-dark">
            {language === 'ar' ? 'فيتامينات الهجن' : 'Racing Camel Vitamins'}
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
            className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Camel Supplies'}
          </Link>
        </div>
      </section>

      {/* 6. PROMOTIONAL FEATURE BANNER BREAK 2 (1:1 Al Zaafran "أسوار UPVC وأرضيات") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-brown-header text-white p-8 sm:p-12 shadow-xl border border-brand-orange/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-brand-orange font-extrabold text-xs tracking-widest uppercase block font-display">
              {language === 'ar' ? 'تجهيز العزب والمزارع' : 'GCC Stable Construction'}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              {language === 'ar' ? 'أسوار UPVC وأرضيات مطاطية للعزب' : 'UPVC Insulated Fencing & Stable Rubber Matting'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              {language === 'ar'
                ? 'أسوار عازلة للحرارة مقاومة للشمس وأرضيات امتصاص الصدمات لحماية حوافر ومفاصل الخيل والإبل.'
                : 'UV-resistant insulated fencing and shock-absorbent matting for equine paddocks.'}
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/96895266144?text=استفسار عن أسوار UPVC وأرضيات العزب"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-2xl text-xs inline-flex items-center gap-2 shadow-lg transition-all"
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
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brown-dark">
            {language === 'ar' ? 'صحة المفاصل والعظام' : 'Joint & Bone Health'}
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
            className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Supplements'}
          </Link>
        </div>
      </section>

      {/* 8. PRODUCT GRID SECTION 4 ("المعدات والأجهزة" / Equipment & Supplies) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brown-dark">
            {language === 'ar' ? 'المعدات والأجهزة' : 'Equipment & Supplies'}
          </h2>
          <p className="text-xs text-bodytext-muted">Syringes, calving pullers, farrier tools, and grooming gear</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {equipmentSupplies.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/shop?type=equipment"
            className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Equipment'}
          </Link>
        </div>
      </section>

      {/* 9. PRODUCT GRID SECTION 5 ("المكملات والأعلاف" / Feeds & Concentrates) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brown-dark">
            {language === 'ar' ? 'المكملات والأعلاف' : 'Feed & Nutritional Supplements'}
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
            className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-2xl text-xs shadow-md transition-all touch-target"
          >
            {language === 'ar' ? 'عرض الكل' : 'View All Feeds'}
          </Link>
        </div>
      </section>

      {/* 10. SEARCH INDEX QUICK DIRECTORY GRID ("استكشف جميع الأقسام والمنتجات") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl space-y-6 shadow-warm">
          <div className="text-center space-y-1">
            <h3 className="font-display font-bold text-brown-dark text-lg sm:text-xl">
              {language === 'ar' ? 'استكشف جميع الأقسام والمنتجات' : 'Explore All Store Categories & Directory'}
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
                className="p-3 rounded-2xl bg-brand-cream hover:bg-brand-orange hover:text-white transition-colors font-semibold text-brown-dark border border-surface-bordered block truncate"
              >
                {language === 'ar' ? item.label_ar : item.label_en}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. VALUE PROPOSITION RIBBON BAR (3 Highlights: Fast GCC Shipping, Certified Formulas, Doctor Advice) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-surface-bordered p-6 rounded-3xl flex items-center gap-4 shadow-warm">
            <div className="p-3.5 bg-brand-orange/10 text-brand-orange rounded-2xl shrink-0">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-brown-dark text-sm sm:text-base">
                {language === 'ar' ? 'شحن سريع لجميع دول الخليج' : 'Express GCC Delivery'}
              </h4>
              <p className="text-xs text-bodytext-muted mt-0.5">
                {language === 'ar' ? 'توصيل مبرد وسريع لعُمان والإمارات والسعودية والقطر' : 'Refrigerated fast transport across GCC'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-bordered p-6 rounded-3xl flex items-center gap-4 shadow-warm">
            <div className="p-3.5 bg-brand-orange/10 text-brand-orange rounded-2xl shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-brown-dark text-sm sm:text-base">
                {language === 'ar' ? 'منتجات وأدوية معتمدة' : '100% Certified Formulas'}
              </h4>
              <p className="text-xs text-bodytext-muted mt-0.5">
                {language === 'ar' ? 'جميع التركيبات مرخصة من وزارات الثروة الزراعية' : 'Licensed by agricultural & vet authorities'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-surface-bordered p-6 rounded-3xl flex items-center gap-4 shadow-warm">
            <div className="p-3.5 bg-brand-orange/10 text-brand-orange rounded-2xl shrink-0">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-brown-dark text-sm sm:text-base">
                {language === 'ar' ? 'استشارة طبية مجانية 24/7' : 'Free Doctor Consultation'}
              </h4>
              <p className="text-xs text-bodytext-muted mt-0.5">
                {language === 'ar' ? 'أطباء بيطريون مختصون لإرشادك في الجرعات' : 'Expert guidance on dosage and treatment'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BRIGHT ORANGE CONTACT CALLOUT BANNER BOX (1:1 Al Zaafran Orange Banner Box) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-brand-orange text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              {language === 'ar' ? 'هل تحتاج إلى استشارة بيطرية خاصة بالحلال؟' : 'Need Custom Veterinary Advice for Livestock?'}
            </h3>
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
              {language === 'ar'
                ? 'تواصل مباشرة مع أطبائنا المختصين للحصول على الجدول العلاجي المناسب لهجنك أو خيلك.'
                : 'Connect directly with our licensed veterinarians for customized dosage protocols.'}
            </p>
          </div>

          <a
            href="https://wa.me/96895266144?text=السلام عليكم أريد استشارة بيطرية"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-brown-dark hover:bg-brown-header text-white font-display font-bold rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 shrink-0 touch-target"
          >
            <MessageCircle className="w-5 h-5 text-brand-orange" />
            <span>{language === 'ar' ? 'تواصل معنا عبر الواتساب' : 'Chat on WhatsApp'}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
