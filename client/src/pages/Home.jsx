import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Stethoscope, ArrowRight, ArrowLeft, Award, Sparkles, PhoneCall, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';
import { ProductSlider } from '../components/ProductSlider';
import { apiFetch } from '../services/api';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80',
    title_en: "Oman's Trusted Desert Veterinary Specialist",
    title_ar: "الخبير البيطري الموثوق لإبل وهجن وجياد الخليج",
    subtitle_en: "Certified medicines, performance supplements, specialized feed, and equipment for camels, horses, and livestock.",
    subtitle_ar: "أدوية بيطرية معتمدة، مكملات الأداء، أعلاف تخصصية ومعدات عالية الجودة للإبل والخيل والمواشي.",
    badge_en: "Licensed Oman & GCC Veterinary Pharmacy",
    badge_ar: "صيدلية بيطرية مرخصة بعمان ودول الخليج",
  },
  {
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80',
    title_en: "Arabian Horse & Equestrian Health Solutions",
    title_ar: "رعاية شاملة للخيل العربية وسباقات القدرة والفروسية",
    subtitle_en: "Joint support formulas, biotin hoof powders, anti-ulcer pastes, and endurance feeds for stallions.",
    subtitle_ar: "تركيبات مفاصل صيدلانية، بودرة البيوتين للحوافر، وأعلاف طاقة مخصصة لجياد القدرة والفروسية.",
    badge_en: "Certified Equine Veterinary Formulas",
    badge_ar: "تركيبات مخصصة لخيول الجمال وسباقات القدرة",
  },
  {
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80',
    title_en: "Cattle Productivity & Rumen Digestive Care",
    title_ar: "حلول تخصصية للأبقار والمواشي وزيادة إدرار الحليب",
    subtitle_en: "Broad spectrum antibiotics, bloat tonics, calcium gels, and milk yield concentrates for farms.",
    subtitle_ar: "مضادات حيوية واسعة المجال، منشطات الكرش، وجيل الكالسيوم مع مركزات زيادة إدرار الحليب.",
    badge_en: "High Yield Livestock & Dairy Care",
    badge_ar: "حلول متكاملة لمزارع الأبقار والماشية بالخليج",
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
  const heroBadge = language === 'ar' ? currentSlideData.badge_ar : currentSlideData.badge_en;

  const topProducts = products.filter((p) => p.is_featured);
  const camelProducts = products.filter((p) => p.category === 'camel');
  const horseProducts = products.filter((p) => p.category === 'horse');
  const cowProducts = products.filter((p) => p.category === 'cow');

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-body text-start">
      {/* 1. HERO BANNER WITH SLIDING BACKGROUND IMAGES */}
      <section className="relative bg-charcoal text-sand overflow-hidden rounded-2xl sm:rounded-3xl mx-3 sm:mx-6 lg:mx-8 mt-3 sm:mt-4 border border-charcoal-light shadow-2xl min-h-[500px] sm:min-h-[560px] flex items-center">
        {/* Background Image Slideshow with Smooth Cross-Fade */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt="Hero Desert Background"
              className="w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out"
            />
          </div>
        ))}

        {/* High-Contrast Gradient Backdrop Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/60 z-0" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B85C2E_1px,transparent_1px)] [background-size:16px_16px] z-0" />

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-light/90 border border-gold/40 text-gold text-[11px] sm:text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{heroBadge}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight min-h-[3.5rem] sm:min-h-[4.5rem]">
              {heroTitle}
            </h1>

            <p className="text-sand/90 text-xs sm:text-base leading-relaxed max-w-2xl font-normal min-h-[3rem]">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="px-7 py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl shadow-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 touch-target"
              >
                <span>{t('exploreStore')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>

              <Link
                to="/consultation"
                className="px-6 py-3.5 bg-charcoal-light/90 hover:bg-teal text-white border border-sand/30 font-display font-bold rounded-2xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 touch-target shadow-md backdrop-blur-sm"
              >
                <Stethoscope className="w-4 h-4 text-gold" />
                <span>{t('askDoctor')}</span>
              </Link>
            </div>

            {/* Quick Stats Bar */}
            <div className="pt-6 sm:pt-8 border-t border-sand/20 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-start">
              <div>
                <span className="font-mono text-lg sm:text-2xl font-bold text-gold block">100%</span>
                <p className="text-[10px] sm:text-xs text-sand/80 font-medium">Certified Formulas</p>
              </div>
              <div>
                <span className="font-mono text-lg sm:text-2xl font-bold text-gold block">24/7</span>
                <p className="text-[10px] sm:text-xs text-sand/80 font-medium">Vet Consultation</p>
              </div>
              <div>
                <span className="font-mono text-lg sm:text-2xl font-bold text-gold block">GCC</span>
                <p className="text-[10px] sm:text-xs text-sand/80 font-medium">Express Delivery</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Species Badge Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full max-w-md bg-charcoal/80 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest block">Species Specialty</span>
                <h3 className="font-display font-bold text-white text-lg sm:text-xl">Omani Desert Livestock</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Link to="/shop?category=camel" className="flex flex-col items-center gap-2 group p-2.5 rounded-2xl hover:bg-white/10 transition-colors">
                  <PetroglyphIcon species="camel" size="md" />
                  <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{t('camel')}</span>
                </Link>
                <Link to="/shop?category=horse" className="flex flex-col items-center gap-2 group p-2.5 rounded-2xl hover:bg-white/10 transition-colors">
                  <PetroglyphIcon species="horse" size="md" />
                  <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{t('horse')}</span>
                </Link>
                <Link to="/shop?category=cow" className="flex flex-col items-center gap-2 group p-2.5 rounded-2xl hover:bg-white/10 transition-colors">
                  <PetroglyphIcon species="cow" size="md" />
                  <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{t('cow')}</span>
                </Link>
              </div>

              <div className="bg-charcoal/90 p-3.5 rounded-2xl border border-gold/30 text-xs text-sand flex items-center gap-3">
                <Award className="w-6 h-6 text-gold shrink-0" />
                <span>Formulated for Arabian Peninsula climate and racing season endurance.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Slideshow Navigation Controls & Dots */}
        <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-8 bg-gold' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-charcoal/70 border border-white/20 text-white hover:bg-clay transition-colors shadow-md active:scale-95"
              aria-label="Previous Hero Slide"
            >
              {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-charcoal/70 border border-white/20 text-white hover:bg-clay transition-colors shadow-md active:scale-95"
              aria-label="Next Hero Slide"
            >
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>

      {/* 2. SPECIES CATEGORY PETROGLYPH TILES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <span className="text-[11px] font-extrabold text-clay uppercase tracking-widest block">Target Livestock</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-charcoal">
            {language === 'ar' ? 'اختر نوع الحلال والحيوان' : 'Select Animal Species'}
          </h2>
          <p className="text-xs sm:text-sm text-bodytext-muted max-w-xl mx-auto">
            Browse tailored veterinary medicines, performance supplements, specialized feed, and equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Camel Tile */}
          <Link
            to="/shop?category=camel"
            className="group relative bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1"
          >
            <PetroglyphIcon species="camel" size="lg" />
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-charcoal group-hover:text-clay transition-colors">
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
            className="group relative bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1"
          >
            <PetroglyphIcon species="horse" size="lg" />
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-charcoal group-hover:text-clay transition-colors">
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
            className="group relative bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm hover:shadow-warm-hover transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1"
          >
            <PetroglyphIcon species="cow" size="lg" />
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-charcoal group-hover:text-clay transition-colors">
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

      {/* 3. SLIDER SECTION 1: TOP FEATURED PRODUCTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductSlider
          title={language === 'ar' ? 'أبرز الأدوية والمكملات المعتمدة' : 'Top Featured Veterinary Formulas'}
          subtitle={language === 'ar' ? 'أكثر الأدوية والفيتامينات طلباً في الهجن والخيل' : 'High potency medicines and performance supplements'}
          viewAllLink="/shop?sort=rating"
          products={topProducts}
          loading={loading}
        />
      </section>

      {/* 4. SLIDER SECTION 2: CAMEL PHARMACY & RACING CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductSlider
          title={language === 'ar' ? 'مستلزمات وأدوية الإبل والهجن' : 'Racing Camel Pharmacy & Supplements'}
          subtitle={language === 'ar' ? 'فيتامينات التحمل، وأملاح التعويض، وأعلاف السباق' : 'Pre-race ATP injections, electrolytes, and racing pellets'}
          species="camel"
          viewAllLink="/shop?category=camel"
          products={camelProducts}
          loading={loading}
        />
      </section>

      {/* 5. ASK A DOCTOR VETERINARY CONSULTATION BANNER */}
      <section className="bg-sand-dark py-12 sm:py-14 border-y border-surface-bordered">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal font-bold text-xs rounded-full">
              <Stethoscope className="w-4 h-4" />
              <span>Veterinary Advice & Dosage Guidelines</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-charcoal">
              {t('askDoctorTitle')}
            </h2>
            <p className="text-bodytext text-xs sm:text-base leading-relaxed">
              {t('askDoctorSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://wa.me/96894694666"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md touch-target"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Dr. Ahmed (+968 9469 4666)</span>
              </a>

              <a
                href="https://wa.me/96879644471"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-teal hover:bg-teal-hover text-white font-display font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md touch-target"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Dr. Sarah (+968 7964 4471)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 bg-surface p-6 rounded-3xl border border-surface-bordered shadow-warm space-y-3">
            <h4 className="font-display font-bold text-charcoal text-sm sm:text-base">Quick Consultation Topics</h4>
            <ul className="space-y-2 text-xs text-bodytext-muted">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-clay shrink-0" />
                <span>Pre-race camel injection schedules & ATP protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
                <span>Equine joint stiffness & ulcer paste treatment</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <span>Dairy cattle bloat emergency & milk fever prevention</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. SLIDER SECTION 3: HORSE & EQUESTRIAN CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductSlider
          title={language === 'ar' ? 'مستلزمات الخيل العربي والفروسية' : 'Arabian Horse & Equestrian Supplies'}
          subtitle={language === 'ar' ? 'علاج المفاصل، مكملات الحوافر، وأعلاف سباقات القدرة' : 'Joint solutions, biotin hoof powder, and farrier tools'}
          species="horse"
          viewAllLink="/shop?category=horse"
          products={horseProducts}
          loading={loading}
        />
      </section>

      {/* 7. SLIDER SECTION 4: COWS & LIVESTOCK CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductSlider
          title={language === 'ar' ? 'مستلزمات الأبقار والماشية' : 'Cattle & Dairy Livestock Supplies'}
          subtitle={language === 'ar' ? 'مضادات حيوية، منشطات الكرش، وأعلاف زيادة إدرار الحليب' : 'Broad-spectrum antibiotics, bloat tonics, and milk concentrates'}
          species="cow"
          viewAllLink="/shop?category=cow"
          products={cowProducts}
          loading={loading}
        />
      </section>
    </div>
  );
};
