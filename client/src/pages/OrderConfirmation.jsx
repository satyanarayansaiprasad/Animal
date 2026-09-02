import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Building2, MessageCircle, ArrowRight, ArrowLeft, Printer, ShieldCheck, Smartphone, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { apiFetch } from '../services/api';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      apiFetch(`/api/orders/${orderId}`)
        .then((data) => {
          if (data && data.success && data.data) {
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
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 font-body space-y-8 text-start">
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
            <span>{t('notifyWhatsapp')} (+968 9526 6144)</span>
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

      {/* Payment Gateway Recapitulation */}
      <div className="bg-sand p-6 rounded-3xl border border-surface-bordered space-y-4">
        <div className="flex items-center gap-3 text-brand-orange">
          {orderData.payment_method === 'apple_pay' ? <Smartphone className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
          <h3 className="font-display font-bold text-charcoal text-base">Payment Gateway Details (تفاصيل الدفع)</h3>
        </div>
        <p className="text-xs text-bodytext-muted">
          Order Total: <strong className="text-brand-orange font-mono">{formatPrice(orderData.total_omr || 0)}</strong>. Please send payment reference to customer support for instant dispatch.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          {/* ADIB BANK */}
          <div className="bg-white p-4 rounded-2xl border border-surface-bordered space-y-1">
            <span className="font-bold text-charcoal block">ADIB BANK (مصرف أبوظبي الإسلامي)</span>
            <p className="text-sm font-mono font-bold text-brand-orange">Account: 28966881</p>
            <p className="text-[10px] text-bodytext-muted">Al Namoos Veterinary Pharmacy</p>
          </div>

          {/* Muscat Bank */}
          <div className="bg-white p-4 rounded-2xl border border-surface-bordered space-y-1">
            <span className="font-bold text-charcoal block">Muscat Bank (بنك مسقط)</span>
            <p className="text-sm font-mono font-bold text-brand-orange">Account: 0412004099970014</p>
            <p className="text-[10px] text-bodytext-muted">Al Namoos Veterinary Supplies LLC</p>
          </div>

          {/* Apple Pay */}
          <div className="bg-white p-4 rounded-2xl border border-surface-bordered space-y-1">
            <span className="font-bold text-charcoal block">Apple Pay Gateway</span>
            <p className="text-sm font-mono font-bold text-brand-orange">+968 9526 6144 (95266144)</p>
            <p className="text-[10px] text-bodytext-muted">Direct Mobile Transfer</p>
          </div>
        </div>
      </div>

      {/* Customer Support Information Box */}
      <div className="bg-surface border border-surface-bordered p-6 rounded-3xl space-y-4">
        <h3 className="font-display font-bold text-charcoal text-base flex items-center gap-2 border-b border-surface-bordered pb-3">
          <PhoneCall className="w-5 h-5 text-brand-orange" />
          <span>Customer Support (خدمة العملاء والتتبع)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-bodytext">
          <div>
            <span className="text-bodytext-muted block">Support Phone / WhatsApp:</span>
            <strong className="text-charcoal font-mono dir-ltr">+968 9526 6144</strong>
          </div>
          <div>
            <span className="text-bodytext-muted block">Support Email:</span>
            <strong className="text-brand-orange">foxx20041@hotmail.com</strong>
          </div>
        </div>
      </div>

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
        <Link to="/shop" className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1">
          <span>Continue Shopping Catalog</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>
    </div>
  );
};
