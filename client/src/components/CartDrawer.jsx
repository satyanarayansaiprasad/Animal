import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotalOMR, itemCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-body">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed inset-y-0 max-w-full flex ${isRtl ? 'left-0' : 'right-0'}`}>
        <div className="w-screen max-w-md bg-surface border-l border-surface-bordered shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-charcoal text-sand flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-display font-bold text-lg text-white">
                {t('cart')} ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-sand/80 hover:text-white hover:bg-charcoal-light transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-surface-bordered">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-bodytext-muted">
                <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center text-clay">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-display font-semibold text-charcoal text-base">{t('cartEmpty')}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-clay hover:bg-clay-hover text-white rounded-xl text-xs font-bold transition-all"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => {
                const title = language === 'ar' ? product.name_ar : product.name_en;
                const unitPrice = product.sale_price_omr || product.price_omr;

                return (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      src={product.image || '/favicon.svg'}
                      alt={title}
                      className="w-16 h-16 object-cover rounded-xl border border-surface-bordered bg-sand shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-display font-bold text-charcoal text-xs sm:text-sm line-clamp-2">
                        {title}
                      </h4>
                      <p className="text-xs text-teal font-medium capitalize">{product.category}</p>
                      <p className="font-mono-price font-bold text-clay text-sm">
                        {formatPrice(unitPrice)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-surface-bordered rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-sand text-bodytext transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-sand text-bodytext transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-bodytext-muted hover:text-clay transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-sand-light border-t border-surface-bordered space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-bodytext-muted">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono-price font-semibold text-charcoal">
                    {formatPrice(subtotalOMR)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-bodytext-muted">
                  <span>{t('shipping')}</span>
                  <span className="text-teal font-semibold">Calculated at checkout</span>
                </div>
                <div className="pt-2 border-t border-surface-bordered flex justify-between font-display font-bold text-base text-charcoal">
                  <span>{t('total')}</span>
                  <span className="font-mono-price text-clay text-lg">
                    {formatPrice(subtotalOMR)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>{t('proceedCheckout')}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-surface border border-surface-bordered hover:bg-white text-charcoal font-semibold rounded-xl text-xs transition-colors"
                >
                  View Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
