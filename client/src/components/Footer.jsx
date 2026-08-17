import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, ShieldCheck, Truck, CreditCard, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PetroglyphIcon } from './PetroglyphIcon';

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-charcoal text-sand pt-12 pb-8 border-t-4 border-clay font-body text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Feature Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 mb-10 border-b border-charcoal-light">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-charcoal-light text-gold rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">{t('trustedSpecialist')}</h4>
              <p className="text-xs text-sand/70">Certified veterinary formulas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-charcoal-light text-clay rounded-2xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">{t('expressGccDelivery')}</h4>
              <p className="text-xs text-sand/70">Oman, UAE, KSA, Qatar, Kuwait & Bahrain</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-charcoal-light text-teal rounded-2xl shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Doctor Consultation</h4>
              <p className="text-xs text-sand/70">+968 9469 4666 / +968 7964 4471</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-charcoal-light text-gold rounded-2xl shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Apple Pay & Bank Transfer</h4>
              <p className="text-xs text-sand/70">Bank Muscat & ADIB</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-charcoal-light">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Al Namoos Vet Clinic Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-gold/40 shadow-md"
              />
              <span className="font-display font-black text-xl text-white">
                {language === 'ar' ? 'صيدلية الناموس' : 'Al Namoos Vet'}
              </span>
            </div>
            <p className="text-xs text-sand/80 leading-relaxed">
              {t('aboutFooter')}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/alnamoos.c"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-charcoal-light hover:bg-clay text-white rounded-xl transition-colors flex items-center gap-2 text-xs font-semibold"
              >
                <Instagram className="w-4 h-4 text-gold" />
                <span>@alnamoos.c</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-gold text-sm uppercase tracking-wider">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-xs text-sand/80">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">{t('home')}</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">{t('shop')}</Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-gold transition-colors">{t('consultation')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">{t('contactUs')}</Link>
              </li>
              <li>
                <Link to="/delivery-policy" className="hover:text-gold transition-colors">{t('deliveryPolicy')}</Link>
              </li>
              <li>
                <Link to="/terms-privacy" className="hover:text-gold transition-colors">{t('termsPrivacy')}</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gold transition-colors font-bold">{t('adminPanel')}</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Species Categories */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-gold text-sm uppercase tracking-wider">{t('categories')}</h4>
            <ul className="space-y-2.5 text-xs text-sand/80">
              <li>
                <Link to="/shop?category=camel" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <PetroglyphIcon species="camel" size="sm" badge={false} className="w-4 h-4" />
                  <span>{t('camel')}</span>
                </Link>
              </li>
              <li>
                <Link to="/shop?category=horse" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <PetroglyphIcon species="horse" size="sm" badge={false} className="w-4 h-4" />
                  <span>{t('horse')}</span>
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cow" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <PetroglyphIcon species="cow" size="sm" badge={false} className="w-4 h-4" />
                  <span>{t('cow')}</span>
                </Link>
              </li>
              <li>
                <Link to="/shop?type=medicine" className="hover:text-gold transition-colors">{t('medicine')}</Link>
              </li>
              <li>
                <Link to="/shop?type=supplements" className="hover:text-gold transition-colors">{t('supplements')}</Link>
              </li>
              <li>
                <Link to="/shop?type=feed" className="hover:text-gold transition-colors">{t('feed')}</Link>
              </li>
              <li>
                <Link to="/shop?type=equipment" className="hover:text-gold transition-colors">{t('equipment')}</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-gold text-sm uppercase tracking-wider">{t('contactInfo')}</h4>
            <div className="space-y-2 text-xs text-sand/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                <span>Muscat Central & Sohar Livestock Hub, Oman</span>
              </div>
              <div className="flex items-center gap-2 dir-ltr">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <a href="tel:+96895266144" className="hover:text-gold font-mono">+968 9526 6144</a>
              </div>
              <div className="flex items-center gap-2 dir-ltr">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <a href="tel:+96899519155" className="hover:text-gold font-mono">+968 9951 9155</a>
              </div>
              <div className="flex items-center gap-2 dir-ltr">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <a href="tel:+971562973007" className="hover:text-gold font-mono">+971 56 297 3007</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:ysalhajri20006@gmail.com" className="hover:text-gold">ysalhajri20006@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sand/60">
          <p className="text-center sm:text-start">{t('rightsReserved')}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-sand/50 me-1">Accepted Payments:</span>
            <span className="px-2.5 py-1 bg-charcoal-light rounded-lg text-white font-mono font-bold text-[10px]">Apple Pay</span>
            <span className="px-2.5 py-1 bg-charcoal-light rounded-lg text-gold font-mono font-bold text-[10px]">Bank Muscat</span>
            <span className="px-2.5 py-1 bg-charcoal-light rounded-lg text-teal-light text-charcoal font-mono font-bold text-[10px]">ADIB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
