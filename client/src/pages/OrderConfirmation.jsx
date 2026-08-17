import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Building2, MessageCircle, ArrowRight, ArrowLeft, Printer, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setOrder(data.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-body">
        <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-display font-semibold text-charcoal text-sm">Generating Official Veterinary Receipt...</p>
      </div>
    );
  }

  const orderData = order || {
    id: orderId || 'ALN-84921',
    customer: { name: 'Customer', phone: '+968 9526 6144', city: 'Muscat', country: 'Oman', address: 'Main St.' },
    items: [],
    total_omr: 0,
    payment_method: 'bank_transfer',
  };

  const whatsappMessage = `السلام عليكم صيدلية الناموس البيطرية، لقد أتممت الطلب رقم: (${orderData.id}). أود تأكيد حالة الدفع والشحن / Completed Order: ${orderData.id}`;
  const whatsappUrl = `https://wa.me/96895266144?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 font-body space-y-8">
      {/* Confirmation Header Card */}
      <div className="bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-teal-light text-teal flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-teal uppercase tracking-widest">{t('orderConfirmed')}</span>
          <h1 className="font-display font-black text-3xl text-charcoal">{t('orderNumber')} {orderData.id}</h1>
          <p className="text-xs text-bodytext-muted">
            Thank you for choosing Al Namoos Veterinary Store & Pharmacy. Your order is registered in our Omani dispatch system.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>{t('notifyWhatsapp')}</span>
          </a>

          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 bg-sand hover:bg-sand-dark text-charcoal font-display font-semibold rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 border border-surface-bordered"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Bank Transfer Instructions Recap */}
      {orderData.payment_method === 'bank_transfer' && (
        <div className="bg-sand p-6 rounded-3xl border border-surface-bordered space-y-4">
          <div className="flex items-center gap-3 text-clay">
            <Building2 className="w-6 h-6" />
            <h3 className="font-display font-bold text-charcoal text-base">{t('bankInstructionsTitle')}</h3>
          </div>
          <p className="text-xs text-bodytext-muted">
            Please complete the transfer for order <strong className="text-charcoal font-mono">{orderData.id}</strong> to one of the authorized accounts below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-surface-bordered space-y-1">
              <span className="text-xs font-bold text-charcoal">Bank Muscat (بنك مسقط)</span>
              <p className="text-sm font-mono font-bold text-clay">0412004099970014</p>
              <p className="text-[10px] text-bodytext-muted">Account: Al Namoos Veterinary Supplies LLC</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-surface-bordered space-y-1">
              <span className="text-xs font-bold text-charcoal">ADIB (مصرف أبوظبي الإسلامي)</span>
              <p className="text-sm font-mono font-bold text-clay">28966881</p>
              <p className="text-[10px] text-bodytext-muted">Account: Al Namoos Veterinary Pharmacy</p>
            </div>
          </div>
        </div>
      )}

      {/* Customer & Shipping Summary */}
      <div className="bg-surface border border-surface-bordered p-6 rounded-3xl space-y-4">
        <h3 className="font-display font-bold text-charcoal text-base border-b border-surface-bordered pb-3">
          Customer & Delivery Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-bodytext">
          <div>
            <span className="text-bodytext-muted block">{t('fullName')}:</span>
            <strong className="text-charcoal">{orderData.customer?.name}</strong>
          </div>
          <div>
            <span className="text-bodytext-muted block">{t('phone')}:</span>
            <strong className="text-charcoal font-mono dir-ltr">{orderData.customer?.phone}</strong>
          </div>
          <div>
            <span className="text-bodytext-muted block">{t('country')} & {t('city')}:</span>
            <strong className="text-charcoal">{orderData.customer?.city}, {orderData.customer?.country}</strong>
          </div>
          <div>
            <span className="text-bodytext-muted block">{t('address')}:</span>
            <strong className="text-charcoal">{orderData.customer?.address}</strong>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/shop" className="text-xs font-bold text-clay hover:underline inline-flex items-center gap-1">
          <span>Continue Shopping Catalog</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
};
