import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const TermsPrivacy = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 font-body space-y-8">
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">{t('termsPrivacy')}</h1>
        <p className="text-xs text-bodytext-muted">Legal terms, customer privacy protection, and veterinary sales compliance.</p>
      </div>

      <div className="bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm space-y-6 text-xs text-bodytext leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-display font-bold text-charcoal text-base">1. Veterinary Medical Compliance</h3>
          <p>
            Al Namoos Veterinary Store & Pharmacy operates under Omani Ministry of Agriculture & Fisheries regulations. All medical supplies, supplements, and equipment sold are genuine and certified for livestock usage.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-surface-bordered">
          <h3 className="font-display font-bold text-charcoal text-base">2. Customer Privacy Protection</h3>
          <p>
            We strictly protect customer phone numbers, delivery addresses, and payment records. No customer data is shared with third parties beyond licensed logistics partners for order fulfillment.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-surface-bordered">
          <h3 className="font-display font-bold text-charcoal text-base">3. Returns & Refunds Policy</h3>
          <p>
            Due to pharmaceutical cold-chain integrity, opened or temperature-compromised medical items cannot be returned. Damaged or defective goods must be reported within 24 hours of delivery.
          </p>
        </section>
      </div>
    </div>
  );
};
