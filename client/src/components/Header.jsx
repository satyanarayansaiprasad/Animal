import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  User,
  PhoneCall,
  Globe,
  Menu,
  X,
  Stethoscope,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { PetroglyphIcon } from './PetroglyphIcon';

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

  // Close mobile drawer on route change
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
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div className="bg-charcoal text-sand text-xs py-2 px-4 sm:px-8 border-b border-charcoal-light">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Promo Announcement */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-sand">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">{t('freeShippingNotice')}</span>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-sand/90 ms-auto">
            <Link
              to="/consultation"
              className="hidden md:flex items-center gap-1.5 text-gold hover:text-white transition-colors font-bold whitespace-nowrap"
            >
              <Stethoscope className="w-3.5 h-3.5 text-gold" />
              <span>{t('askDoctor')}</span>
            </Link>

            <a
              href="tel:+96895266144"
              className="hidden lg:flex items-center gap-1 hover:text-white transition-colors dir-ltr font-mono whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3 text-clay" />
              <span>+968 9526 6144</span>
            </a>

            {/* Currency Switcher Pill */}
            <button
              onClick={toggleCurrency}
              className="px-2.5 py-0.5 rounded-lg bg-charcoal-light hover:bg-teal transition-colors font-mono text-gold font-bold text-[11px] flex items-center gap-1 border border-gold/20 whitespace-nowrap"
              title="Switch Currency (OMR / AED)"
            >
              <span>{currency === 'OMR' ? '🇴🇲 OMR' : '🇦🇪 AED'}</span>
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-charcoal-light hover:bg-teal transition-colors text-white text-[11px] font-bold border border-sand/20 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-teal" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR (AL-NAMOOS VET CLINIC Branding) */}
      <div
        className={`bg-surface transition-all duration-300 border-b border-surface-bordered ${
          scrolled ? 'shadow-warm py-2.5 sm:py-3' : 'py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Official Large Logo & Brand Name (AL-NAMOOS VET CLINIC) */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            <img
              src="/images/logo.jpg"
              alt="AL-NAMOOS VET CLINIC Logo"
              className="w-13 h-13 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gold shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col text-start">
              <span className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-charcoal tracking-tight group-hover:text-clay transition-colors leading-tight">
                AL-NAMOOS VET CLINIC
              </span>
              <span className="text-[10px] sm:text-xs text-gold font-extrabold tracking-wider uppercase leading-tight font-display">
                CARE • COMPASSION • COMMITMENT
              </span>
            </div>
          </Link>

          {/* Desktop Centered Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-4 relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full bg-sand/60 border border-surface-bordered rounded-full py-2.5 text-xs text-bodytext placeholder-bodytext-muted focus:bg-white focus:border-clay focus:ring-1 focus:ring-clay transition-all ${
                isRtl ? 'ps-4 pe-10' : 'ps-4 pe-10'
              }`}
            />
            <button
              type="submit"
              className={`absolute top-1/2 -translate-y-1/2 text-bodytext-muted hover:text-clay transition-colors ${
                isRtl ? 'left-3.5' : 'right-3.5'
              }`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Header Right Actions Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/account"
              className="hidden sm:flex items-center gap-1.5 text-charcoal hover:text-clay p-2 rounded-full hover:bg-sand transition-colors whitespace-nowrap"
              title={t('account')}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold hidden lg:inline">{t('account')}</span>
            </Link>

            <Link
              to="/admin"
              className="hidden sm:inline-flex text-[11px] font-bold px-3 py-1.5 rounded-xl border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-gold transition-colors whitespace-nowrap"
            >
              {t('adminPanel')}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2.5 sm:p-3 bg-clay text-white rounded-full hover:bg-clay-hover transition-transform active:scale-95 shadow-md shrink-0"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-charcoal font-mono text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-clay rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. DESKTOP NAVIGATION BAR (All Link Names Displayed On ONE SINGLE LINE) */}
      <nav className="bg-charcoal text-sand text-xs sm:text-sm hidden md:block border-t border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`py-3 px-3 sm:px-4 font-bold transition-colors border-b-2 whitespace-nowrap ${
                location.pathname === '/' ? 'border-clay text-gold' : 'border-transparent hover:text-gold'
              }`}
            >
              {t('home')}
            </Link>

            <Link
              to="/shop"
              className={`py-3 px-3 sm:px-4 font-bold transition-colors border-b-2 whitespace-nowrap ${
                location.pathname === '/shop' ? 'border-clay text-gold' : 'border-transparent hover:text-gold'
              }`}
            >
              {t('shop')}
            </Link>

            {/* Species Quick Links */}
            <Link
              to="/shop?category=camel"
              className="flex items-center gap-1.5 py-3 px-2 sm:px-3 hover:text-gold transition-colors font-semibold text-sand/90 whitespace-nowrap"
            >
              <PetroglyphIcon species="camel" size="sm" badge={false} className="w-4 h-4 shrink-0" />
              <span>{t('camel')}</span>
            </Link>

            <Link
              to="/shop?category=horse"
              className="flex items-center gap-1.5 py-3 px-2 sm:px-3 hover:text-gold transition-colors font-semibold text-sand/90 whitespace-nowrap"
            >
              <PetroglyphIcon species="horse" size="sm" badge={false} className="w-4 h-4 shrink-0" />
              <span>{t('horse')}</span>
            </Link>

            <Link
              to="/shop?category=cow"
              className="flex items-center gap-1.5 py-3 px-2 sm:px-3 hover:text-gold transition-colors font-semibold text-sand/90 whitespace-nowrap"
            >
              <PetroglyphIcon species="cow" size="sm" badge={false} className="w-4 h-4 shrink-0" />
              <span>{t('cow')}</span>
            </Link>

            <Link
              to="/consultation"
              className="py-3 px-3 sm:px-4 font-bold text-gold hover:text-white transition-colors whitespace-nowrap"
            >
              {t('consultation')}
            </Link>

            <Link
              to="/about"
              className="py-3 px-2 sm:px-3 text-sand/80 hover:text-gold transition-colors font-medium whitespace-nowrap"
            >
              {t('aboutUs')}
            </Link>

            <Link
              to="/contact"
              className="py-3 px-2 sm:px-3 text-sand/80 hover:text-gold transition-colors font-medium whitespace-nowrap"
            >
              {t('contactUs')}
            </Link>
          </div>

          <div className="text-xs text-sand/80 flex items-center gap-2 dir-ltr whitespace-nowrap ms-2">
            <span>🇴🇲 Helpline:</span>
            <a href="tel:+96895266144" className="text-gold font-mono font-bold hover:underline">
              +968 9526 6144
            </a>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-surface-bordered shadow-2xl px-4 py-5 space-y-5 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-sand/60 border border-surface-bordered rounded-xl py-2.5 px-4 text-xs text-bodytext focus:outline-none focus:border-clay"
            />
            <button
              type="submit"
              className={`absolute top-1/2 -translate-y-1/2 text-bodytext-muted ${
                isRtl ? 'left-3.5' : 'right-3.5'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-2 font-display text-start">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-charcoal font-bold hover:text-clay text-sm flex items-center justify-between"
            >
              <span>{t('home')}</span>
              {isRtl ? <ChevronLeft className="w-4 h-4 text-bodytext-muted" /> : <ChevronRight className="w-4 h-4 text-bodytext-muted" />}
            </Link>

            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-charcoal font-bold hover:text-clay text-sm flex items-center justify-between"
            >
              <span>{t('shop')}</span>
              {isRtl ? <ChevronLeft className="w-4 h-4 text-bodytext-muted" /> : <ChevronRight className="w-4 h-4 text-bodytext-muted" />}
            </Link>

            {/* Mobile Categories Block */}
            <div className="pt-3 border-t border-surface-bordered space-y-2">
              <span className="text-[11px] text-bodytext-muted font-extrabold uppercase tracking-wider block">
                {t('categories')}
              </span>
              <Link
                to="/shop?category=camel"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-charcoal hover:text-clay text-xs font-semibold"
              >
                <PetroglyphIcon species="camel" size="sm" />
                <span>{t('camel')}</span>
              </Link>

              <Link
                to="/shop?category=horse"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-charcoal hover:text-clay text-xs font-semibold"
              >
                <PetroglyphIcon species="horse" size="sm" />
                <span>{t('horse')}</span>
              </Link>

              <Link
                to="/shop?category=cow"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-charcoal hover:text-clay text-xs font-semibold"
              >
                <PetroglyphIcon species="cow" size="sm" />
                <span>{t('cow')}</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-surface-bordered flex flex-col space-y-2 text-xs">
              <Link
                to="/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 bg-gold/10 text-clay font-bold rounded-xl flex items-center gap-2 text-xs"
              >
                <Stethoscope className="w-4 h-4 text-clay" />
                <span>{t('askDoctor')}</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-bodytext-muted hover:text-charcoal font-semibold"
              >
                {t('aboutUs')}
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-bodytext-muted hover:text-charcoal font-semibold"
              >
                {t('contactUs')}
              </Link>

              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-bodytext-muted hover:text-charcoal font-semibold"
              >
                {t('account')}
              </Link>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 mt-2 text-center bg-charcoal text-gold rounded-xl font-bold text-xs"
              >
                {t('adminPanel')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
