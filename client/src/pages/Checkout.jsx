import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Building2, Smartphone, Truck, ArrowLeft, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { apiFetch } from '../services/api';

export const Checkout = () => {
  const { language, isRtl, t } = useLanguage();
  const { currency, formatPrice, omrToAedRate } = useCurrency();
  const { cartItems, subtotalOMR, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Oman',
    city: '',
    address: '',
    notes: '',
  });

  const [shippingOption, setShippingOption] = useState('oman_standard');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer'); // 'bank_transfer' | 'apple_pay'
  const [bankSelected, setBankSelected] = useState('bank_muscat'); // 'bank_muscat' | 'adib'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shipping Rates Map in OMR
  const shippingRates = {
    oman_standard: 2.000,
    oman_express: 3.500,
    gcc_standard: 6.500,
    gcc_express: 10.000,
  };

  const shippingCostOMR = shippingRates[shippingOption] || 2.000;
  const totalOMR = subtotalOMR + shippingCostOMR;
  const totalAED = (totalOMR * omrToAedRate).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city || !formData.address) {
      alert(language === 'ar' ? 'يرجى تعبئة كافة الحقوق المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: formData,
      items: cartItems.map((i) => ({
        id: i.product.id,
        sku: i.product.sku,
        name_en: i.product.name_en,
        name_ar: i.product.name_ar,
        price_omr: i.product.sale_price_omr || i.product.price_omr,
        quantity: i.quantity,
      })),
      subtotal_omr: subtotalOMR,
      shipping_omr: shippingCostOMR,
      total_omr: totalOMR,
      total_aed: totalAED,
      currency_checkout: currency,
      payment_method: paymentMethod,
      bank_selected: paymentMethod === 'bank_transfer' ? bankSelected : null,
      shipping_option: shippingOption,
    };

    try {
      const data = await apiFetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (data && data.success && data.data) {
        clearCart();
        navigate(`/order-confirmation?orderId=${data.data.id}`);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch {
      alert('Network error. Please check server connectivity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-20 font-body space-y-8 text-start bg-brand-cream min-h-screen">
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
          {t('deliveryDetails')} & {t('paymentMethod')}
        </h1>
        <p className="text-xs text-bodytext-muted">Enter delivery details and select your preferred payment gateway.</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Form & Payment Selection */}
        <div className="lg:col-span-8 space-y-8">
          {/* STEP 1: Customer Info */}
          <div className="bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm space-y-4">
            <h3 className="font-display font-bold text-charcoal text-lg flex items-center gap-2 border-b border-surface-bordered pb-3">
              <span className="w-6 h-6 rounded-full bg-clay text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{t('deliveryDetails')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">{t('fullName')} *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Sheikh Saeed Al-Hajri"
                  className="w-full bg-sand/50 border border-surface-bordered rounded-xl py-3 px-3.5 text-xs text-charcoal focus:bg-white focus:border-clay"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">{t('phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+968 9XXXXXXX or +971 50XXXXXXX"
                  className="w-full bg-sand/50 border border-surface-bordered rounded-xl py-3 px-3.5 text-xs text-charcoal font-mono focus:bg-white focus:border-clay dir-ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">{t('country')} *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-sand/50 border border-surface-bordered rounded-xl py-3 px-3.5 text-xs text-charcoal font-semibold focus:bg-white focus:border-clay"
                >
                  <option value="Oman">🇴🇲 Sultanate of Oman</option>
                  <option value="UAE">🇦🇪 United Arab Emirates</option>
                  <option value="Saudi Arabia">🇸🇦 Kingdom of Saudi Arabia</option>
                  <option value="Qatar">🇶🇦 State of Qatar</option>
                  <option value="Kuwait">🇰🇼 State of Kuwait</option>
                  <option value="Bahrain">🇧🇭 Kingdom of Bahrain</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal">{t('city')} *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Muscat, Abu Dhabi, Riyadh"
                  className="w-full bg-sand/50 border border-surface-bordered rounded-xl py-3 px-3.5 text-xs text-charcoal focus:bg-white focus:border-clay"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-charcoal">{t('address')} *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street name, Villa/Farm number, Camel camp location"
                  className="w-full bg-sand/50 border border-surface-bordered rounded-xl py-3 px-3.5 text-xs text-charcoal focus:bg-white focus:border-clay"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Shipping Option Selection */}
          <div className="bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm space-y-4">
            <h3 className="font-display font-bold text-charcoal text-lg flex items-center gap-2 border-b border-surface-bordered pb-3">
              <span className="w-6 h-6 rounded-full bg-clay text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{t('deliveryOption')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'oman_standard', title: t('omanStandard'), price: 2.000 },
                { id: 'oman_express', title: t('omanExpress'), price: 3.500 },
                { id: 'gcc_standard', title: t('gccStandard'), price: 6.500 },
                { id: 'gcc_express', title: t('gccExpress'), price: 10.000 },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    shippingOption === opt.id
                      ? 'border-clay bg-clay-light/30 shadow-md'
                      : 'border-surface-bordered bg-sand/30 hover:bg-sand/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={shippingOption === opt.id}
                      onChange={() => setShippingOption(opt.id)}
                      className="mt-1 text-clay focus:ring-clay"
                    />
                    <div>
                      <h4 className="font-display font-bold text-charcoal text-xs sm:text-sm">{opt.title}</h4>
                      <p className="text-[11px] text-bodytext-muted">Temperature-controlled delivery</p>
                    </div>
                  </div>
                  <span className="font-mono-price font-bold text-clay text-xs">{formatPrice(opt.price)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* STEP 3: Payment Method Selection */}
          <div className="bg-surface border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm space-y-6">
            <h3 className="font-display font-bold text-charcoal text-lg flex items-center gap-2 border-b border-surface-bordered pb-3">
              <span className="w-6 h-6 rounded-full bg-clay text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Gateways (خيارات الدفع)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Direct Bank Account Transfer */}
              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-clay bg-clay-light/40 shadow-md'
                    : 'border-surface-bordered bg-sand/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-clay focus:ring-clay"
                    />
                    <Building2 className="w-5 h-5 text-clay" />
                    <span className="font-display font-bold text-charcoal text-xs sm:text-sm">
                      Direct Bank Transfer
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-gold text-charcoal text-[10px] font-bold rounded">RECOMMENDED</span>
                </div>
                <p className="text-[11px] text-bodytext-muted">
                  Direct transfer to ADIB Bank or Bank Muscat official account.
                </p>
              </label>

              {/* Option 2: Apple Pay */}
              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'apple_pay'
                    ? 'border-clay bg-clay-light/40 shadow-md'
                    : 'border-surface-bordered bg-sand/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'apple_pay'}
                      onChange={() => setPaymentMethod('apple_pay')}
                      className="text-clay focus:ring-clay"
                    />
                    <Smartphone className="w-5 h-5 text-charcoal" />
                    <span className="font-display font-bold text-charcoal text-xs sm:text-sm">
                      Apple Pay
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-charcoal text-white font-mono text-[10px] font-bold rounded">
                    Apple Pay
                  </span>
                </div>
                <p className="text-[11px] text-bodytext-muted">
                  Instant mobile transfer via Apple Pay recipient number 95266144.
                </p>
              </label>
            </div>

            {/* If Bank Transfer Selected: Show Bank Accounts Box */}
            {paymentMethod === 'bank_transfer' && (
              <div className="bg-sand p-5 rounded-2xl border border-surface-bordered space-y-4 animate-fade-in">
                <h4 className="font-display font-bold text-charcoal text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-clay" />
                  <span>Authorized Bank Account Details</span>
                </h4>
                <p className="text-xs text-bodytext-muted">Please transfer the order total to one of our official bank accounts below:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ADIB BANK */}
                  <div
                    onClick={() => setBankSelected('adib')}
                    className={`p-4 rounded-xl border cursor-pointer bg-white space-y-1 ${
                      bankSelected === 'adib' ? 'border-clay ring-2 ring-clay/20' : 'border-surface-bordered'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-charcoal text-xs">ADIB BANK (مصرف أبوظبي الإسلامي)</span>
                      {bankSelected === 'adib' && <CheckCircle2 className="w-4 h-4 text-clay" />}
                    </div>
                    <p className="text-sm font-mono font-bold text-clay">Account: 28966881</p>
                    <p className="text-[10px] text-bodytext-muted">Al Namoos Veterinary Pharmacy</p>
                  </div>

                  {/* Bank Muscat */}
                  <div
                    onClick={() => setBankSelected('bank_muscat')}
                    className={`p-4 rounded-xl border cursor-pointer bg-white space-y-1 ${
                      bankSelected === 'bank_muscat' ? 'border-clay ring-2 ring-clay/20' : 'border-surface-bordered'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-charcoal text-xs">Muscat Bank (بنك مسقط)</span>
                      {bankSelected === 'bank_muscat' && <CheckCircle2 className="w-4 h-4 text-clay" />}
                    </div>
                    <p className="text-sm font-mono font-bold text-clay">Account: 0412004099970014</p>
                    <p className="text-[10px] text-bodytext-muted">Al Namoos Veterinary Supplies LLC</p>
                  </div>
                </div>
              </div>
            )}

            {/* If Apple Pay Selected: Show Apple Pay Instructions */}
            {paymentMethod === 'apple_pay' && (
              <div className="bg-sand p-5 rounded-2xl border border-surface-bordered space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-charcoal">
                  <Smartphone className="w-5 h-5 text-clay" />
                  <h4 className="font-display font-bold text-sm">Apple Pay Transfer Instructions</h4>
                </div>
                <p className="text-xs text-bodytext">
                  Please send Apple Pay payment of <strong className="text-clay font-mono">{formatPrice(totalOMR)}</strong> to recipient mobile number:
                </p>
                <div className="p-3 bg-white border border-surface-bordered rounded-xl font-mono text-center">
                  <span className="text-xs text-bodytext-muted block uppercase text-[10px]">Apple Pay Recipient Number</span>
                  <strong className="text-lg text-clay font-bold">+968 9526 6144 (95266144)</strong>
                </div>
              </div>
            )}

            {/* Customer Support Notice */}
            <div className="p-4 bg-white border border-surface-bordered rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-orange" />
                <span className="font-bold text-charcoal">Customer Support: +968 9526 6144 | foxx20041@hotmail.com</span>
              </div>
              <span className="text-[11px] text-bodytext-muted">Available 24/7 for payment assistance</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-6 sticky top-36">
            <h3 className="font-display font-bold text-charcoal text-lg border-b border-surface-bordered pb-4">
              Final Checkout Summary
            </h3>

            {/* Cart Preview List */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-surface-bordered text-xs">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="pt-2 first:pt-0 flex justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-bold text-charcoal">{language === 'ar' ? product.name_ar : product.name_en}</span>
                    <p className="text-bodytext-muted">Qty: {quantity}</p>
                  </div>
                  <span className="font-mono-price font-bold text-clay">
                    {formatPrice((product.sale_price_omr || product.price_omr) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-surface-bordered pt-4 text-xs">
              <div className="flex justify-between text-bodytext-muted">
                <span>Subtotal</span>
                <span className="font-mono-price font-bold text-charcoal">{formatPrice(subtotalOMR)}</span>
              </div>
              <div className="flex justify-between text-bodytext-muted">
                <span>Shipping ({shippingOption.replace('_', ' ')})</span>
                <span className="font-mono-price font-bold text-charcoal">{formatPrice(shippingCostOMR)}</span>
              </div>
              <div className="pt-3 border-t border-surface-bordered flex justify-between font-display font-extrabold text-base text-charcoal">
                <span>Total Amount</span>
                <span className="font-mono-price text-clay text-xl">{formatPrice(totalOMR)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold rounded-2xl text-base transition-all shadow-xl flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>{t('placeOrder')}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
