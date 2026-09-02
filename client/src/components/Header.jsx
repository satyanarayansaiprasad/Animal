import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  Globe,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const { language, toggleLanguage, isRtl, t } = useLanguage();
  const { currency, toggleCurrency } = useCurrency();
  const { itemCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full font-body text-start">
      {/* 1. TOP UTILITY BAR (Exact Al Zaafran Style) */}
      <div className="bg-[#3A1E0E] text-white/80 text-xs py-1.5 px-4 sm:px-8 border-b border-[#4A2511]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Top Utility Links */}
          <div className="flex items-center gap-3.5 text-[11px] font-medium text-white/70">
            <Link to="/about" className="hover:text-white transition-colors">
              {language === 'ar' ? 'من نحن' : 'About us'}
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/contact" className="hover:text-amber-300 transition-colors font-bold text-amber-300">
              {language === 'ar' ? 'اتصل بنا' : 'Contact us'}
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/shop?type=medicine" className="hover:text-white transition-colors">
              {language === 'ar' ? 'فحص المنشطات' : 'Doping Test'}
            </Link>
          </div>

          {/* Top Right Language & Currency Dropdowns */}
          <div className="flex items-center gap-4 text-[11px] font-medium ms-auto">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-white transition-colors text-white/90"
            >
              <span>{language === 'ar' ? 'العربية' : 'English'}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>

            {/* Currency Selector */}
            <button
              onClick={toggleCurrency}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-white/90 font-mono"
            >
              <span>{currency === 'OMR' ? '🇴🇲 OMR' : '🇦🇪 AED'}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (Dark Brown Navigation Bar) */}
      <div className="bg-[#4A230F] text-white py-3 px-4 sm:px-8 border-b border-[#5C2D15] shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/images/logo.jpg"
              alt="AL-NAMOOS VET CLINIC Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-brand-orange shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col text-start">
              <span className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                AL-NAMOOS
              </span>
              <span className="text-[9px] sm:text-[10px] text-brand-orange font-bold tracking-widest uppercase leading-tight font-display">
                VET CLINIC
              </span>
            </div>
          </Link>

          {/* Main Category & Contact Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-extrabold tracking-wider text-white/90 uppercase">
            <Link to="/category/camel" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              {language === 'ar' ? 'الهجن والإبل' : 'CAMEL'}
            </Link>
            <Link to="/category/horse" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              {language === 'ar' ? 'الخيل' : 'HORSE'}
            </Link>
            <Link to="/category/cow" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              {language === 'ar' ? 'الأبقار' : 'COW'}
            </Link>
            <Link to="/category/dog" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              {language === 'ar' ? 'الكلاب' : 'DOG'}
            </Link>
            <Link to="/category/falcon" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              {language === 'ar' ? 'الصقور' : 'FALCON'}
            </Link>
            <Link to="/contact" className="text-amber-300 hover:text-white transition-colors whitespace-nowrap font-black">
              {language === 'ar' ? 'اتصل بنا' : 'CONTACT US'}
            </Link>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-xs mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products"
              className="w-full bg-[#351809]/60 text-white placeholder-white/50 rounded-full py-2 px-4 text-xs border border-white/20 focus:border-brand-orange focus:bg-[#351809] focus:outline-none transition-all"
            />
            <button
              type="submit"
              className={`absolute top-1/2 -translate-y-1/2 text-white/70 hover:text-brand-orange transition-colors ${
                isRtl ? 'left-3.5' : 'right-3.5'
              }`}
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Right Action Icons (Wishlist + Cart) */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/account" className="relative p-1.5 text-white/80 hover:text-brand-orange transition-colors" title="Wishlist">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-white/80 hover:text-brand-orange transition-colors"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white hover:text-brand-orange"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#4A230F] text-white border-b border-[#5C2D15] px-4 py-5 space-y-4 shadow-2xl animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products"
              className="w-full bg-[#351809] text-white rounded-xl py-2 px-4 text-xs border border-white/20"
            />
            <button type="submit" className={`absolute top-1/2 -translate-y-1/2 text-white/70 ${isRtl ? 'left-3' : 'right-3'}`}>
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-3 font-bold text-xs">
            <Link to="/category/camel" className="hover:text-brand-orange py-1">
              CAMEL
            </Link>
            <Link to="/category/horse" className="hover:text-brand-orange py-1">
              HORSE
            </Link>
            <Link to="/category/cow" className="hover:text-brand-orange py-1">
              COW
            </Link>
            <Link to="/category/dog" className="hover:text-brand-orange py-1">
              DOG
            </Link>
            <Link to="/category/falcon" className="hover:text-brand-orange py-1">
              FALCON
            </Link>
            <Link to="/contact" className="text-amber-300 py-1 font-black">
              CONTACT US
            </Link>
            <Link to="/consultation" className="text-brand-orange py-1">
              DOCTOR CONSULTATION
            </Link>
            <Link to="/about" className="text-white/80 py-1">
              ABOUT US
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
