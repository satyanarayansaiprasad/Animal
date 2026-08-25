import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full font-body text-start">
      {/* 1. SUB-FOOTER BRAND RIBBON */}
      <div className="bg-[#F9F6F0] py-6 px-4 sm:px-8 border-t border-surface-bordered">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-start">
            <span className="text-xs text-bodytext-muted block">{t('itsAllWithYou')}</span>
            <span className="font-display font-black text-xl sm:text-2xl text-brand-orange">
              AL-NAMOOS VET CLINIC
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/alnamoos.c"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white border border-surface-bordered rounded-xl text-bodytext hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white border border-surface-bordered rounded-xl text-bodytext hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white border border-surface-bordered rounded-xl text-bodytext hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm font-bold text-xs"
              aria-label="TikTok"
            >
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN DARK BROWN FOOTER */}
      <div className="bg-[#4A230F] text-white py-12 px-4 sm:px-8 border-t border-[#5C2D15]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand Info & Branch Contacts */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="AL-NAMOOS VET CLINIC Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-orange shadow-md"
              />
              <div className="flex flex-col text-start">
                <span className="font-display font-black text-xl text-white">
                  AL-NAMOOS VET CLINIC
                </span>
                <span className="text-[10px] text-brand-orange font-bold uppercase tracking-widest font-display">
                  CARE • COMPASSION • COMMITMENT
                </span>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed max-w-lg">
              {t('aboutFooter')}
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/90">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-base">🇴🇲</span>
                <span className="font-bold text-white/70">OMAN</span>
                <a href="tel:+96895266144" className="hover:text-brand-orange transition-colors">
                  +968 9526 6144
                </a>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-base">🇦🇪</span>
                <span className="font-bold text-white/70">UAE</span>
                <a href="tel:+971562973007" className="hover:text-brand-orange transition-colors">
                  +971 56 297 3007
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link to="/" className="hover:text-brand-orange transition-colors">{t('home')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-orange transition-colors">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link to="/shop?type=medicine" className="hover:text-brand-orange transition-colors">Doping Test</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-orange transition-colors">{t('shop')}</Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-brand-orange transition-colors">{t('consultation')}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              {t('legal')}
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link to="/terms-privacy" className="hover:text-brand-orange transition-colors">{t('privacyPolicy')}</Link>
              </li>
              <li>
                <Link to="/delivery-policy" className="hover:text-brand-orange transition-colors">{t('shippingPolicy')}</Link>
              </li>
              <li>
                <Link to="/terms-privacy" className="hover:text-brand-orange transition-colors">{t('returnPolicy')}</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-orange transition-colors font-bold text-brand-orange">{t('adminPanel')}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM COPYRIGHT & PAYMENT BADGES STRIP */}
      <div className="bg-white text-bodytext-muted py-4 px-4 sm:px-8 border-t border-surface-bordered">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-center sm:text-start">
            {t('rightsReserved')}
          </p>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">AMEX</span>
            <span className="px-2 py-0.5 bg-black text-white rounded text-[10px] font-bold"> Pay</span>
            <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold">MasterCard</span>
            <span className="px-2.5 py-0.5 bg-blue-800 text-white rounded text-[10px] font-bold">VISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
