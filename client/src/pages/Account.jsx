import React, { useState, useEffect } from 'react';
import { Package, MapPin, Heart, User, Clock, CheckCircle2, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

export const Account = () => {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'wishlist' | 'profile'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOrders(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-8">
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">{t('account')}</h1>
        <p className="text-xs text-bodytext-muted">Manage your order history, delivery addresses, and camel/equine profile settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar Tabs */}
        <aside className="md:col-span-3 space-y-2">
          <div className="bg-surface border border-surface-bordered p-4 rounded-3xl space-y-1 shadow-warm">
            {[
              { id: 'orders', label: t('myOrders'), icon: Package },
              { id: 'addresses', label: t('addresses'), icon: MapPin },
              { id: 'wishlist', label: t('wishlist'), icon: Heart },
              { id: 'profile', label: t('profile'), icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-start ${
                    activeTab === tab.id
                      ? 'bg-clay text-white shadow-md'
                      : 'hover:bg-sand text-charcoal'
                  }`}
                >
                  <Icon className="w-4 h-4" />
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
              <h3 className="font-display font-bold text-charcoal text-lg">{t('myOrders')} History</h3>
              {loading ? (
                <div className="h-40 bg-surface rounded-2xl animate-pulse" />
              ) : orders.length === 0 ? (
                <div className="bg-surface p-8 text-center rounded-3xl border border-surface-bordered text-xs text-bodytext-muted">
                  No orders recorded yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-surface border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-bordered pb-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-clay text-sm">{ord.id}</span>
                          <span className="text-bodytext-muted block text-[11px]">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-sand text-charcoal font-bold text-[11px] capitalize">
                            Status: {ord.status}
                          </span>
                          <span className="font-mono-price font-bold text-clay text-base">
                            {formatPrice(ord.total_omr)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        {ord.items && ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-bodytext">
                            <span>{language === 'ar' ? item.name_ar : item.name_en} x {item.quantity}</span>
                            <span className="font-mono">{formatPrice(item.price_omr * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] text-bodytext-muted flex justify-between items-center border-t border-surface-bordered">
                        <span>Shipping to: {ord.customer?.city}, {ord.customer?.country}</span>
                        <span className="font-semibold text-teal">Payment: {ord.payment_method}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-surface border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
              <h3 className="font-display font-bold text-charcoal text-lg">Saved Farm & Camp Addresses</h3>
              <div className="p-4 bg-sand rounded-2xl border border-surface-bordered space-y-1 text-xs">
                <span className="font-bold text-charcoal">Muscat Main Stable Address</span>
                <p className="text-bodytext-muted">Villa 12, Al Mouj Area, Muscat, Sultanate of Oman</p>
                <p className="font-mono text-clay">+968 9526 6144</p>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-surface border border-surface-bordered p-8 text-center rounded-3xl space-y-2 text-xs text-bodytext-muted">
              <Heart className="w-8 h-8 text-clay mx-auto" />
              <p className="font-display font-bold text-charcoal text-sm">Your Wishlist is empty</p>
              <p>Save camel vitamins, horse joint gels, and cattle supplies for quick reordering.</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-surface border border-surface-bordered p-6 rounded-3xl space-y-4 shadow-warm">
              <h3 className="font-display font-bold text-charcoal text-lg">Account Profile</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-charcoal block">Full Name</label>
                  <input type="text" defaultValue="Sheikh Saeed Al-Hajri" className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-2.5 mt-1" />
                </div>
                <div>
                  <label className="font-bold text-charcoal block">Phone / WhatsApp</label>
                  <input type="text" defaultValue="+968 9526 6144" className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-2.5 mt-1 font-mono" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
