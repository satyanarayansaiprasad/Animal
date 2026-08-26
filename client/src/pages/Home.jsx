import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  CreditCard,
  Mail,
  Stethoscope,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { ProductCard } from '../components/ProductCard';
import { apiFetch } from '../services/api';

const heroSlides = [
  {
    image: '/images/hero_camel_racing.jpg',
    title_en: "AL-NAMOOS VET CLINIC — Camel Racing & Performance Medicine",
    title_ar: "سباقات الهجن والفروسية — عيادة الناموس البيطرية",
  },
  {
    image: '/images/hero_equine_medicine.jpg',
    title_en: "Equine Joint & Endurance Performance Solutions",
    title_ar: "تركيبات مفاصل الخيل وأدوية سباقات القدرة والفروسية",
  },
  {
    image: '/images/hero_dog_cat_care.jpg',
    title_en: "Small Animal & Pet Veterinary Care",
    title_ar: "رعاية شاملة للكلاب والقطط والحيوانات الأليفة",
  },
];

export const Home = () => {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  // Hero Background Slideshow Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filtered Product Lists for Homepage Carousels
  const bestSellers = products.slice(0, 4);
  const dexaCamel = products.filter((p) => p.category === 'camel').slice(0, 4);
  const jointAndBone = products.filter((p) => p.type === 'supplements' || p.category === 'horse').slice(0, 4);
  const breathTreatments = products.filter((p) => p.type === 'medicine').slice(0, 4);
  const muscleProblems = products.filter((p) => p.type === 'feed' || p.type === 'equipment').slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="w-full pb-16 font-body text-start bg-[#F9F6F0]">
      {/* 1. CLEAN FULL-WIDTH HERO SLIDER */}
      <section className="relative w-full bg-[#351809] text-white overflow-hidden aspect-[16/9] max-h-[580px] min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] flex items-end justify-center border-b border-[#5C2D15] shadow-2xl mt-0 pt-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt="Hero Banner Slide"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

        {/* 4 Orange Indicator Dots */}
        <div className="relative z-20 pb-4 sm:pb-6 flex items-center justify-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-3.5 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-8 bg-brand-orange' : 'w-3.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTIONS BELOW HERO SLIDER */}
      <div className="space-y-12 sm:space-y-16 pt-10">
        {/* 2. "Shop by categories" SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-surface-bordered shadow-warm">
            {/* Title on Left: Shop by categories */}
            <div className="space-y-1 text-center lg:text-start shrink-0 lg:pe-8 lg:border-e border-surface-bordered">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
                {language === 'ar' ? 'تسوق حسب' : 'Shop by'}
              </h2>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-bodytext">
                {language === 'ar' ? 'الفئات' : 'categories'}
              </h3>
            </div>

            {/* 5 Vertical Species Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 flex-1 w-full">
              {/* Card 1: Camel */}
              <Link
                to="/category/camel"
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
              >
                <img
                  src="/images/species/camel_card.jpg"
                  alt="Camel"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                  {t('camel')}
                </div>
              </Link>

              {/* Card 2: Horse */}
              <Link
                to="/category/horse"
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
              >
                <img
                  src="/images/species/horse_card.jpg"
                  alt="Horse"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                  {t('horse')}
                </div>
              </Link>

              {/* Card 3: Cow */}
              <Link
                to="/category/cow"
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
              >
                <img
                  src="/images/species/cow_card.jpg"
                  alt="Cow"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                  {t('cow')}
                </div>
              </Link>

              {/* Card 4: Dog */}
              <Link
                to="/category/dog"
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
              >
                <img
                  src="/images/species/dog_card.jpg"
                  alt="Dog"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                  {t('dog')}
                </div>
              </Link>

              {/* Card 5: Falcon */}
              <Link
                to="/category/falcon"
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered col-span-2 sm:col-span-1"
              >
                <img
                  src="/images/species/falcon_card.jpg"
                  alt="Falcon"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                  {t('falcon')}
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. PANORAMIC BANNER BREAK 1 ("Equine Treadmill") */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden bg-[#3A1E0E] text-white p-8 sm:p-12 shadow-2xl border border-brown-border flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
            <img
              src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80"
              alt="Equine Treadmill Walker"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 space-y-2 max-w-2xl">
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                {t('equineTreadmill')}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                {t('equineTreadmillSub')}
              </p>
            </div>
          </div>
        </section>

        {/* 4. SECTION 1: "Best Sellers" Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
              {t('bestSellers')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 3 Orange Pagination Dots */}
          <div className="flex justify-center gap-2 pt-2">
            <span className="w-2.5 h-2.5 rounded bg-brand-orange" />
            <span className="w-2.5 h-2.5 rounded bg-brand-orange/40" />
            <span className="w-2.5 h-2.5 rounded bg-brand-orange/40" />
          </div>
        </section>

        {/* 5. SECTION 2: "Dexa Camel Race" WITH DEDICATED CAMEL RACE BACKGROUND IMAGE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 shadow-2xl border border-[#5C2D15] space-y-6 bg-[#351809]">
            {/* Background Image: camel_race_bg.jpg */}
            <img
              src="/images/camel_race_bg.jpg"
              alt="Camel Race Background"
              className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#351809]/90 via-[#351809]/70 to-[#351809]/90 pointer-events-none" />

            <div className="relative z-10 text-center space-y-1">
              <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-orange drop-shadow-md">
                {t('dexaCamel')}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-medium">{t('dexaCamelSub')}</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {dexaCamel.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 pt-2">
              <div className="flex justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-brand-orange" />
                <span className="w-2.5 h-2.5 rounded bg-white/40" />
                <span className="w-2.5 h-2.5 rounded bg-white/40" />
              </div>

              <Link
                to="/category/camel/camel-race"
                className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
              >
                {t('viewAll')}
              </Link>
            </div>
          </div>
        </section>

        {/* 6. PANORAMIC BANNER BREAK 2 ("UPVC Fencing") */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden bg-[#3A1E0E] text-white p-8 sm:p-12 shadow-2xl border border-brown-border flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
            <div className="relative z-10 space-y-2 max-w-2xl">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
                {t('upvcFencing')}
              </h2>
              <p className="text-sm sm:text-base text-white/90 font-medium">
                {t('upvcFencingSub')}
              </p>
            </div>
          </div>
        </section>

        {/* 7. SECTION 3: "Bone & Joint" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
              {t('boneJoint')}
            </h2>
            <p className="text-xs text-bodytext-muted">{t('boneJointSub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {jointAndBone.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/category/camel/camel-race/bones-joints"
              className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
            >
              {t('viewAll')}
            </Link>
          </div>
        </section>

        {/* 8. SECTION 4: "Breath Treatments" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
              {t('breathTreatments')}
            </h2>
            <p className="text-xs text-bodytext-muted">{t('breathSub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {breathTreatments.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="flex justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-brand-orange" />
              <span className="w-2.5 h-2.5 rounded bg-brand-orange/40" />
              <span className="w-2.5 h-2.5 rounded bg-brand-orange/40" />
            </div>

            <Link
              to="/category/camel/camel-race/breathing-oxygen"
              className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
            >
              {t('viewAll')}
            </Link>
          </div>
        </section>

        {/* 9. SECTION 5: "Muscle Problems" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
              {t('muscleProblems')}
            </h2>
            <p className="text-xs text-bodytext-muted">{t('muscleSub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {muscleProblems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/category/camel/camel-problems/muscle-fatigue"
              className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
            >
              {t('viewAll')}
            </Link>
          </div>
        </section>

        {/* 10. DIRECTORY TABLE: "Explore Our Trusted Partners" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl space-y-6 shadow-warm">
            <div className="text-center space-y-1">
              <h3 className="font-display font-black text-xl sm:text-2xl text-bodytext">
                {t('trustedPartners')}
              </h3>
              <p className="text-xs text-bodytext-muted">{t('trustedPartnersSub')}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs text-center">
              {[
                'Al Khail & Al Khayal Company', 'AL REEM', 'AL YARMOOK VET', 'AMANVET', 'Apicenna',
                'BOEHRINGER', 'CAVALOR', 'CEVA', 'CHINFIELD S.A.', 'Cox Veterinary Lab',
                'DROGAVET', 'EQUI STRIVE', 'Equimed Usa', 'GOZL', 'ICO Labs',
                'KARAMAN', 'Kelato', 'MCLab', 'MICROSULES', 'MOBEDCO',
                'NPN Labs', 'OVER', 'PEAK PERFORMANCE', 'PREQUINE', 'RandLab',
                'RWR', 'SAN HEH', 'Spectrum', 'SUNWAYS', 'TVG',
                'VetaPron', 'AL-NAMOOS VET'
              ].map((partner, i) => (
                <Link
                  key={i}
                  to={`/shop?search=${encodeURIComponent(partner)}`}
                  className="p-3 rounded-xl bg-[#F9F6F0] hover:bg-brand-orange hover:text-white transition-colors font-bold text-brand-orange border border-surface-bordered block truncate"
                >
                  {partner}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 11. VALUE PROPOSITION FEATURE RIBBON */}
        <section className="bg-[#FAF7F2] py-8 border-y border-surface-bordered">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-white text-brand-orange rounded-full border border-surface-bordered shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-bodytext uppercase tracking-wider">
                {t('originalFromSource')}
              </h4>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-white text-brand-orange rounded-full border border-surface-bordered shadow-sm">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-bodytext uppercase tracking-wider">
                {t('offersFreeShipping')}
              </h4>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-white text-brand-orange rounded-full border border-surface-bordered shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-bodytext uppercase tracking-wider">
                {t('securePayments')}
              </h4>
            </div>
          </div>
        </section>

        {/* 12. SPECIALIST DOCTOR CONSULTATION FEATURE SECTION BEFORE FOOTER (FEATURING DOCTOR BANNER IMAGE) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden bg-[#351809] text-white p-6 sm:p-10 shadow-2xl border border-[#5C2D15] flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Info Column */}
            <div className="space-y-4 max-w-xl text-center lg:text-start z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold">
                <Stethoscope className="w-4 h-4" />
                <span>{language === 'ar' ? 'استشارة طبية تخصصية' : 'Specialized Veterinary Consultation'}</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-4xl leading-tight text-white">
                {language === 'ar' ? 'استشر طبيبك البيطري المتخصص في أدوية وجرعات الهجن والخيل' : 'Consult Our Licensed Veterinary Doctors for Camel & Equine Care'}
              </h2>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {language === 'ar'
                  ? 'فريق الأطباء في صيدلية الناموس متواجد للإجابة على استفسارات العلاج، جدول التحصينات، وجرعات الهجن والخيل في سلطنة عمان والخليج.'
                  : 'Our dedicated veterinary medical staff is ready to assist with camel race injection schedules, equine endurance vitamins, and treatment guidelines.'}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/consultation"
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 touch-target"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t('askDoctor')}</span>
                </Link>

                <a
                  href="https://wa.me/96895266144?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%8A%D9%83%D9%85%D9%8F%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%B7%D8%A8%D9%8A%D8%A9%20%D8%A8%D9%8A%D8%B7%D8%B1%D9%8A%D8%A9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 touch-target"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>{t('chatWhatsapp')}</span>
                </a>
              </div>
            </div>

            {/* Right Doctor Image Frame */}
            <div className="relative w-full max-w-md h-64 sm:h-80 rounded-2xl overflow-hidden border-4 border-brand-orange/40 shadow-2xl shrink-0 group z-10">
              <img
                src="/images/doctor_banner.jpg"
                alt="AL-NAMOOS Veterinary Doctor"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/20">
                <span className="font-display font-bold text-xs text-white block">
                  {language === 'ar' ? 'د. أحمد الهنائي — استشاري طب وجراحة الهجن' : 'Dr. Ahmed Al Hinai — Senior Veterinary Specialist'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 13. BRIGHT ORANGE NEWSLETTER SUBSCRIPTION BOX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-orange text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              {t('joinNewsletterTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed max-w-xl">
              {t('joinNewsletterSub')}
            </p>

            <form onSubmit={handleSubscribe} className="w-full max-w-md relative pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t('yourEmailPlaceholder')}
                className="w-full bg-transparent text-white placeholder-white/80 border-b-2 border-white py-2 ps-2 pe-10 focus:outline-none text-xs"
              />
              <button
                type="submit"
                className="absolute right-2 top-4 text-white hover:scale-110 transition-transform"
                aria-label="Subscribe"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
            {subscribed && (
              <span className="text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full">
                {t('subscribeSuccess')}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
