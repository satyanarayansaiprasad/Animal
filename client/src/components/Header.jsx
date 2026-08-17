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
  ChevronDown,
  Sparkles,
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
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full font-body">
      {/* 1. Top Utility Announcement Bar */}
      <div className="bg-charcoal text-sand text-xs py-2 px-4 border-b border-charcoal-light">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Promo message */}
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{t('freeShippingNotice')}</span>
          </div>

          {/* Quick Contacts & Consult */}
          <div className="flex items-center gap-4 text-sand/80 text-xs">
            <Link
              to="/consultation"
              className="flex items-center gap-1.5 text-gold hover:text-white transition-colors font-semibold"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t('askDoctor')} (+968 9469 4666)</span>
            </Link>

            <a
              href="tel:+96895266144"
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors dir-ltr font-mono"
            >
              <PhoneCall className="w-3 h-3 text-clay" />
              <span>+968 9526 6144</span>
            </a>

            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              className="px-2 py-0.5 rounded bg-charcoal-light hover:bg-teal transition-colors font-mono text-gold text-xs font-semibold"
              title="Toggle Currency (OMR / AED)"
            >
              {currency === 'OMR' ? '🇴🇲 OMR' : '🇦🇪 AED'}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-charcoal-light hover:bg-teal transition-colors text-sand text-xs font-medium"
            >
              <Globe className="w-3 h-3 text-teal" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <div
        className={`bg-surface transition-all duration-300 border-b border-surface-bordered ${
          scrolled ? 'shadow-warm py-2.5' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <PetroglyphIcon species="camel" size="sm" />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl text-charcoal tracking-tight group-hover:text-clay transition-colors">
                {language === 'ar' ? 'صيدلية الناموس البيطرية' : 'AL NAMOOS VET PHARMACY'}
              </span>
              <span className="text-[10px] text-bodytext-muted font-medium tracking-wide uppercase">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-sand/60 border border-surface-bordered rounded-full py-2 px-4 pe-10 text-sm text-bodytext placeholder-bodytext-muted focus:bg-white focus:border-clay focus:ring-1 focus:ring-clay transition-all"
            />
            <button
              type="submit"
              className={`absolute top-1/2 -translate-y-1/2 text-bodytext-muted hover:text-clay transition-colors ${
                isRtl ? 'left-3' : 'right-3'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Account / Admin Link */}
            <Link
              to="/account"
              className="hidden sm:flex items-center gap-1.5 text-charcoal hover:text-clay p-2 rounded-full hover:bg-sand transition-colors"
              title={t('account')}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold hidden lg:inline">{t('account')}</span>
            </Link>

            {/* Admin Panel Direct Link */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex text-[11px] font-semibold px-2.5 py-1 rounded border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-sand transition-colors"
            >
              {t('adminPanel')}
            </Link>

            {/* Cart Icon Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 bg-clay text-white rounded-full hover:bg-clay-hover transition-transform active:scale-95 shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-charcoal font-mono text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-clay rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mega-Menu & Main Navigation Links */}
      <nav className="bg-charcoal text-sand text-sm hidden md:block border-t border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`py-3 px-4 font-semibold transition-colors border-b-2 ${
                location.pathname === '/' ? 'border-clay text-gold' : 'border-transparent hover:text-gold'
              }`}
            >
              {t('home')}
            </Link>

            {/* All Products Dropdown Link */}
            <Link
              to="/shop"
              className={`py-3 px-4 font-semibold transition-colors border-b-2 ${
                location.pathname === '/shop' ? 'border-clay text-gold' : 'border-transparent hover:text-gold'
              }`}
            >
              {t('shop')}
            </Link>

            {/* Species Mega Categories */}
            <Link
              to="/shop?category=camel"
              className="flex items-center gap-1.5 py-3 px-3 hover:text-gold transition-colors text-sand/90"
            >
              <PetroglyphIcon species="camel" size="sm" badge={false} className="w-5 h-5" />
              <span>{t('camel')}</span>
            </Link>

            <Link
              to="/shop?category=horse"
              className="flex items-center gap-1.5 py-3 px-3 hover:text-gold transition-colors text-sand/90"
            >
              <PetroglyphIcon species="horse" size="sm" badge={false} className="w-5 h-5" />
              <span>{t('horse')}</span>
            </Link>

            <Link
              to="/shop?category=cow"
              className="flex items-center gap-1.5 py-3 px-3 hover:text-gold transition-colors text-sand/90"
            >
              <PetroglyphIcon species="cow" size="sm" badge={false} className="w-5 h-5" />
              <span>{t('cow')}</span>
            </Link>

            <Link
              to="/consultation"
              className="py-3 px-4 font-semibold text-gold hover:text-white transition-colors"
            >
              {t('consultation')}
            </Link>

            <Link
              to="/about"
              className="py-3 px-4 text-sand/80 hover:text-gold transition-colors"
            >
              {t('aboutUs')}
            </Link>

            <Link
              to="/contact"
              className="py-3 px-4 text-sand/80 hover:text-gold transition-colors"
            >
              {t('contactUs')}
            </Link>
          </div>

          {/* Phone call pill */}
          <div className="text-xs text-sand/70 flex items-center gap-2">
            <span>🇴🇲 Oman:</span>
            <a href="tel:+96895266144" className="text-gold font-mono font-semibold hover:underline">
              +968 9526 6144
            </a>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-surface-bordered shadow-lg px-4 py-4 space-y-4 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-sand/60 border border-surface-bordered rounded-lg py-2 px-4 text-sm text-bodytext"
            />
            <button
              type="submit"
              className={`absolute top-1/2 -translate-y-1/2 text-bodytext-muted ${
                isRtl ? 'left-3' : 'right-3'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-2 font-display">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-charcoal font-semibold hover:text-clay"
            >
              {t('home')}
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-charcoal font-semibold hover:text-clay"
            >
              {t('shop')} (All Products)
            </Link>

            <div className="pt-2 border-t border-surface-bordered space-y-2">
              <span className="text-xs text-bodytext-muted font-bold uppercase">{t('categories')}</span>
              <Link
                to="/shop?category=camel"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-1.5 text-charcoal hover:text-clay"
              >
                <PetroglyphIcon species="camel" size="sm" />
                <span>{t('camel')}</span>
              </Link>
              <Link
                to="/shop?category=horse"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-1.5 text-charcoal hover:text-clay"
              >
                <PetroglyphIcon species="horse" size="sm" />
                <span>{t('horse')}</span>
              </Link>
              <Link
                to="/shop?category=cow"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-1.5 text-charcoal hover:text-clay"
              >
                <PetroglyphIcon species="cow" size="sm" />
                <span>{t('cow')}</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-surface-bordered flex flex-col space-y-2">
              <Link
                to="/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-clay font-bold flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{t('consultation')}</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-bodytext-muted hover:text-charcoal"
              >
                {t('aboutUs')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-bodytext-muted hover:text-charcoal"
              >
                {t('contactUs')}
              </Link>
              <Link
                to="/delivery-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-bodytext-muted hover:text-charcoal"
              >
                {t('deliveryPolicy')}
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 mt-2 text-center bg-charcoal text-sand rounded-lg font-semibold"
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
