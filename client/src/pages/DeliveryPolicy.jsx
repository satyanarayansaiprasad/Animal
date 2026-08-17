import React from 'react';
import { Truck, Thermometer, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeliveryPolicy = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 font-body space-y-8">
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">{t('deliveryPolicy')}</h1>
        <p className="text-xs text-bodytext-muted">Cold-chain transport standards across Oman and the GCC.</p>
      </div>

      <div className="bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm space-y-6 text-xs text-bodytext leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-display font-bold text-charcoal text-base flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-clay" />
            <span>Temperature-Controlled Cold-Chain Transport</span>
          </h3>
          <p>
            All temperature-sensitive veterinary medicines, vaccines, and joint injectable formulas are packed in insulated thermal boxes with gel refrigerants to maintain temperatures between 2°C and 8°C throughout transit.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-surface-bordered">
          <h3 className="font-display font-bold text-charcoal text-base flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal" />
            <span>GCC Delivery Destinations & Timelines</span>
          </h3>
          <ul className="list-disc ps-5 space-y-1 text-bodytext-muted">
            <li><strong>Sultanate of Oman:</strong> 24 to 48 hours (Muscat, Sohar, Salalah, Nizwa, Barka).</li>
            <li><strong>United Arab Emirates (UAE):</strong> 48 to 72 hours (Abu Dhabi, Dubai, Al Ain).</li>
            <li><strong>Saudi Arabia, Qatar, Kuwait, Bahrain:</strong> 3 to 5 business days via Express GCC Courier.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-surface-bordered">
          <h3 className="font-display font-bold text-charcoal text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <span>Free Delivery Threshold</span>
          </h3>
          <p>
            Orders exceeding <strong>50 OMR (~477 AED)</strong> automatically qualify for Free Standard GCC Shipping.
          </p>
        </section>
      </div>
    </div>
  );
};
