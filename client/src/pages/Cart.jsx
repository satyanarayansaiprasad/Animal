import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotalOMR } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 font-body bg-[#F9F6F0] min-h-[70vh]">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#D97706] mx-auto border border-surface-bordered shadow-md">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal">{t('cartEmpty')}</h2>
        <p className="text-xs sm:text-sm text-bodytext-muted max-w-md mx-auto">
          Explore our certified veterinary medicines, performance vitamins, and specialized feeds for camels, horses, and cattle.
        </p>
        <Link
          to="/shop"
          className="px-8 py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-display font-extrabold rounded-2xl text-xs sm:text-sm inline-block shadow-xl transition-all active:scale-98"
        >
          {t('startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-body space-y-6 sm:space-y-8 text-start bg-[#F9F6F0] min-h-screen">
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-2xl sm:text-4xl text-charcoal">
          {t('cart')} ({cartItems.length} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-surface-bordered rounded-3xl p-4 sm:p-6 shadow-warm divide-y divide-surface-bordered">
            {cartItems.map(({ product, quantity }) => {
              const title = language === 'ar' ? product.name_ar : product.name_en;
              const unitPrice = product.sale_price_omr || product.price_omr;
              const itemTotal = unitPrice * quantity;

              return (
                <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={product.image || '/favicon.svg'}
                      alt={title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-surface-bordered bg-sand shrink-0"
                    />
                    <div className="space-y-1 text-start">
                      <Link to={`/product/${product.id}`} className="font-display font-extrabold text-charcoal text-xs sm:text-base hover:text-[#D97706] line-clamp-2">
                        {title}
                      </Link>
                      <p className="text-[11px] sm:text-xs text-[#D97706] font-bold capitalize">{product.category} — {product.type}</p>
                      <p className="text-[10px] sm:text-xs text-bodytext-muted font-mono">SKU: {product.sku}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-surface-bordered rounded-xl bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 hover:bg-sand text-charcoal font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-mono font-extrabold text-xs">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 hover:bg-sand text-charcoal font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <span className="font-mono-price font-extrabold text-[#D97706] text-sm sm:text-lg">
                      {formatPrice(itemTotal)}
                    </span>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-bodytext-muted hover:text-rose-600 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center px-2">
            <button
              onClick={clearCart}
              className="text-xs font-bold text-bodytext-muted hover:text-rose-600 transition-colors"
            >
              Clear Cart
            </button>
            <Link to="/shop" className="text-xs font-extrabold text-[#D97706] hover:underline flex items-center gap-1">
              {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-6">
            <h3 className="font-display font-black text-charcoal text-base sm:text-lg border-b border-surface-bordered pb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-bodytext-muted">
                <span>{t('subtotal')}</span>
                <span className="font-mono-price font-bold text-charcoal">{formatPrice(subtotalOMR)}</span>
              </div>
              <div className="flex justify-between text-bodytext-muted">
                <span>{t('shipping')}</span>
                <span className="text-emerald-700 font-extrabold">Calculated at checkout</span>
              </div>
              <div className="pt-3 border-t border-surface-bordered flex justify-between font-display font-black text-base text-charcoal">
                <span>{t('total')}</span>
                <span className="font-mono-price text-[#D97706] text-xl font-extrabold">{formatPrice(subtotalOMR)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-display font-extrabold rounded-2xl text-sm transition-all shadow-xl flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{t('proceedCheckout')}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="space-y-2 pt-2 border-t border-surface-bordered text-[11px] text-bodytext-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Express GCC Delivery across Oman, UAE, KSA, Qatar, Kuwait & Bahrain</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Accepting Apple Pay & Direct Bank Transfer (ADIB & Bank Muscat)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
