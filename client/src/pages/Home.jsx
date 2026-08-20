import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Plus,
  Mail,
  ChevronLeft,
  ChevronRight,
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
  const { language, isRtl, t } = useLanguage();
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

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Filtered Product Lists for Homepage Carousels (Matching Screenshots 3, 4 & 5)
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
    <div className="space-y-12 sm:space-y-16 pb-16 font-body text-start bg-[#F9F6F0]">
      {/* 1. CLEAN FULL-WIDTH HERO SLIDER (Exact Al Zaafran Banner - Screenshot 1) */}
      <section className="relative w-full bg-[#351809] text-white overflow-hidden min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] flex items-end justify-center border-b border-[#5C2D15] shadow-2xl">
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

        {/* Subtle Dark Bottom Gradient for Dots */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

        {/* 4 Orange Indicator Dots (Exact Al Zaafran Style - Screenshot 2) */}
        <div className="relative z-20 pb-6 flex items-center justify-center gap-3">
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

      {/* 2. "Shop by categories" SECTION (Exact Al Zaafran Style - Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-surface-bordered shadow-warm">
          {/* Title on Left: Shop by categories */}
          <div className="space-y-1 text-center md:text-start shrink-0 md:pe-8 md:border-e border-surface-bordered">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
              Shop by
            </h2>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-bodytext">
              categories
            </h3>
          </div>

          {/* 4 Vertical Species Cards Grid (Exact Al Zaafran Cards: Camel, Horse, Dog, Cat) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 w-full">
            {/* Card 1: Camel */}
            <Link
              to="/shop?category=camel"
              className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
            >
              <img
                src="/images/species/camel_card.jpg"
                alt="Camel"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                Camel
              </div>
            </Link>

            {/* Card 2: Horse */}
            <Link
              to="/shop?category=horse"
              className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
            >
              <img
                src="/images/species/horse_card.jpg"
                alt="Horse"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                Horse
              </div>
            </Link>

            {/* Card 3: Dog */}
            <Link
              to="/shop?category=cow"
              className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
            >
              <img
                src="/images/species/dog_card.jpg"
                alt="Dog"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                Dog
              </div>
            </Link>

            {/* Card 4: Cat */}
            <Link
              to="/shop?type=supplements"
              className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-end border border-surface-bordered"
            >
              <img
                src="/images/species/cat_card.jpg"
                alt="Cat"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10 bg-brand-orange py-2 text-center text-white font-bold text-xs sm:text-sm">
                Cat
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PANORAMIC BANNER BREAK 1 ("ماكينة مشي الخيول" - Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#3A1E0E] text-white p-8 sm:p-12 shadow-2xl border border-brown-border flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
          <img
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80"
            alt="Equine Treadmill Walker"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              ماكينة مشي الخيول
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              مقاسات متنوعة وتصاميم متينة تناسب جميع الإسطبلات
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTION 1: "الأكثر طلباً" / "Best Sellers" Product Grid (Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
            الأكثر طلباً
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

      {/* 5. SECTION 2: "دكسا الهجن" / "Dexa Camel Race" (Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
            دكسا الهجن
          </h2>
          <p className="text-xs text-bodytext-muted">Dexa Camel Race</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dexaCamel.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 3 Orange Pagination Dots + View All Button */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="flex justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-brand-orange" />
            <span className="w-2.5 h-2.5 rounded bg-brand-orange/40" />
            <span className="w-2.5 h-2.5 rounded bg-brand-orange/40" />
          </div>

          <Link
            to="/shop?category=camel"
            className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
          >
            View All
          </Link>
        </div>
      </section>

      {/* 6. PANORAMIC BANNER BREAK 2 ("أسوار UPVC" - Screenshot 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#3A1E0E] text-white p-8 sm:p-12 shadow-2xl border border-brown-border flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
          <div className="relative z-10 space-y-2 max-w-2xl">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
              أسوار UPVC
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              لإسطبلات خيول
            </p>
          </div>
        </div>
      </section>

      {/* 7. SECTION 3: "مفاصل و اوتار" / "Bone & Joint" (Screenshot 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
            مفاصل و اوتار
          </h2>
          <p className="text-xs text-bodytext-muted">Bone & Joint</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {jointAndBone.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/shop?type=supplements"
            className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
          >
            View All
          </Link>
        </div>
      </section>

      {/* 8. SECTION 4: "علاجات النسم والتنفس" / "Breath" (Screenshot 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
            علاجات النسم والتنفس
          </h2>
          <p className="text-xs text-bodytext-muted">Breath</p>
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
            to="/shop?type=medicine"
            className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
          >
            View All
          </Link>
        </div>
      </section>

      {/* 9. SECTION 5: "مشاكل العضلات" / "Muscle Problems" (Screenshot 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-orange">
            مشاكل العضلات
          </h2>
          <p className="text-xs text-bodytext-muted">Muscle Problems</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {muscleProblems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/shop"
            className="px-8 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-xl text-xs shadow-md transition-all touch-target"
          >
            View All
          </Link>
        </div>
      </section>

      {/* 10. DIRECTORY TABLE: "استكشف شركاؤنا الموثوقون" (Screenshots 1 & 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl space-y-6 shadow-warm">
          <div className="text-center space-y-1">
            <h3 className="font-display font-black text-xl sm:text-2xl text-bodytext">
              استكشف شركاؤنا الموثوقون
            </h3>
            <p className="text-xs text-bodytext-muted">Explore Our Trusted Veterinary Partners</p>
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

      {/* 11. VALUE PROPOSITION FEATURE RIBBON (Screenshot 2) */}
      <section className="bg-[#FAF7F2] py-8 border-y border-surface-bordered">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-white text-brand-orange rounded-full border border-surface-bordered shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-bodytext uppercase tracking-wider">
              ORIGINAL FROM THE SOURCE
            </h4>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-white text-brand-orange rounded-full border border-surface-bordered shadow-sm">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-bodytext uppercase tracking-wider">
              OFFERS FREE SHIPPING
            </h4>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-white text-brand-orange rounded-full border border-surface-bordered shadow-sm">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-bodytext uppercase tracking-wider">
              SECURE & FLEXIBLE PAYMENTS
            </h4>
          </div>
        </div>
      </section>

      {/* 12. BRIGHT ORANGE NEWSLETTER SUBSCRIPTION BOX (Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-brand-orange text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          <h3 className="font-display font-black text-2xl sm:text-3xl">
            Join for AL-NAMOOS VET
          </h3>
          <p className="text-xs sm:text-sm text-white/95 leading-relaxed max-w-xl">
            Sign up for AL-NAMOOS VET updates to receive information about new arrivals, future events and specials
          </p>

          <form onSubmit={handleSubscribe} className="w-full max-w-md relative pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
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
          {subscribed && <span className="text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full">Subscribed successfully!</span>}
        </div>
      </section>
    </div>
  );
};
