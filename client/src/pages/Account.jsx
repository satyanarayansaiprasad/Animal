import React, { useState, useEffect } from 'react';
import { Package, MapPin, Heart, User, Clock, CheckCircle2, Truck, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { apiFetch } from '../services/api';
import { Link } from 'react-router-dom';

export const Account = () => {
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'wishlist' | 'profile'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve locally stored session orders
    const localOrders = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('order_')) {
          try {
            const item = JSON.parse(localStorage.getItem(key));
            if (item && item.id) localOrders.push(item);
          } catch {}
        }
      }
    }

    apiFetch('/api/orders')
      .then((data) => {
        if (data && data.success && Array.isArray(data.data)) {
          const merged = [...data.data];
          localOrders.forEach((lo) => {
            if (!merged.some((m) => String(m.id) === String(lo.id))) {
              merged.unshift(lo);
            }
          });
          setOrders(merged.length > 0 ? merged : localOrders);
        } else {
          setOrders(localOrders);
        }
        setLoading(false);
      })
      .catch(() => {
        setOrders(localOrders);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-8 text-start bg-[#F9F6F0] min-h-screen">
      {/* Header */}
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">{t('account')}</h1>
        <p className="text-xs text-bodytext-muted">Manage your order history, delivery addresses, and camel/equine profile settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar Tabs */}
        <aside className="md:col-span-3 space-y-3">
          <div className="bg-white border border-surface-bordered p-4 rounded-3xl space-y-2 shadow-warm">
            <span className="text-[10px] font-bold text-bodytext-muted uppercase tracking-wider px-3 block pb-1 border-b border-surface-bordered">
              Customer Portal
            </span>

            {[
              { id: 'orders', label: t('myOrders'), icon: Package },
              { id: 'addresses', label: t('addresses'), icon: MapPin },
              { id: 'wishlist', label: t('wishlist'), icon: Heart },
              { id: 'profile', label: t('profile'), icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all text-start shadow-sm ${
                    isActive
                      ? 'bg-[#D97706] text-white shadow-md ring-2 ring-[#D97706]/30'
                      : 'bg-white text-charcoal hover:bg-[#F3EBE0] hover:text-[#D97706] border border-surface-bordered'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#D97706]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab Main Content */}
        <main className="md:col-span-9 space-y-6">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-charcoal text-xl">{t('myOrders')} History</h3>
              {loading ? (
                <div className="h-40 bg-white rounded-3xl animate-pulse border border-surface-bordered" />
              ) : orders.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-surface-bordered space-y-3 shadow-warm">
                  <ShoppingBag className="w-10 h-10 text-bodytext-muted mx-auto" />
                  <h4 className="font-display font-bold text-charcoal text-base">No Orders Recorded Yet</h4>
                  <p className="text-xs text-bodytext-muted">Place your first order for racing camel vitamins, horse supplies, or livestock medicine.</p>
                  <Link
                    to="/shop"
                    className="px-6 py-2.5 bg-[#D97706] text-white font-extrabold rounded-xl text-xs inline-block shadow-md"
                  >
                    Start Shopping ➔
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-white border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-bordered pb-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-[#D97706] text-sm">{ord.id}</span>
                          <span className="text-bodytext-muted block text-[11px]">
                            {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent Order'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] uppercase">
                            {ord.status || 'pending'}
                          </span>
                          <span className="font-mono-price font-extrabold text-[#D97706] text-base">
                            {formatPrice(ord.total_omr)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        {ord.items && ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-bodytext">
                            <span className="font-semibold">{language === 'ar' ? item.name_ar : item.name_en} x {item.quantity}</span>
                            <span className="font-mono font-bold">{formatPrice(item.price_omr * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] text-bodytext-muted flex justify-between items-center border-t border-surface-bordered">
                        <span>Delivery to: {ord.customer?.city || 'Muscat'}, {ord.customer?.country || 'Oman'}</span>
                        <span className="font-bold text-emerald-700 uppercase">Payment: {ord.payment_method || 'bank_transfer'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl space-y-4 shadow-warm">
              <h3 className="font-display font-extrabold text-charcoal text-xl">Saved Farm & Camp Addresses</h3>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 text-xs">
                <span className="font-bold text-charcoal text-sm">Muscat Main Stable Address</span>
                <p className="text-bodytext">Villa 12, Al Mouj Area, Muscat, Sultanate of Oman</p>
                <p className="font-mono font-bold text-[#D97706]">+968 9526 6144</p>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white border border-surface-bordered p-12 text-center rounded-3xl space-y-2 text-xs text-bodytext-muted shadow-warm">
              <Heart className="w-10 h-10 text-[#D97706] mx-auto" />
              <h4 className="font-display font-extrabold text-charcoal text-base">Your Wishlist is Empty</h4>
              <p>Save camel vitamins, horse joint gels, and cattle supplies for quick reordering.</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl space-y-4 shadow-warm">
              <h3 className="font-display font-extrabold text-charcoal text-xl">Account Profile</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-charcoal block">Full Name</label>
                  <input type="text" defaultValue="Sheikh Saeed Al-Hajri" className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 mt-1 font-semibold text-charcoal" />
                </div>
                <div>
                  <label className="font-bold text-charcoal block">Phone / WhatsApp</label>
                  <input type="text" defaultValue="+968 9526 6144" className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 mt-1 font-mono font-bold text-[#D97706]" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
