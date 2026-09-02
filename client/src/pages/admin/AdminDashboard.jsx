import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { apiFetch } from '../../services/api';

export const AdminDashboard = ({ onNavigate }) => {
  const { formatPrice } = useCurrency();
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve local orders
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

    Promise.all([
      apiFetch('/api/products'),
      apiFetch('/api/orders'),
    ])
      .then(([prodRes, orderRes]) => {
        if (prodRes && prodRes.success && prodRes.data) setProductsCount(prodRes.data.length);
        if (orderRes && orderRes.success && Array.isArray(orderRes.data)) {
          const merged = [...orderRes.data];
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

  const totalRevenueOMR = orders.reduce((sum, o) => sum + (Number(o.total_omr) || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');

  return (
    <div className="space-y-8 font-body text-start">
      <div className="border-b border-surface-bordered pb-4">
        <h2 className="font-display font-black text-2xl text-charcoal">Store Overview & Sales Dashboard</h2>
        <p className="text-xs text-bodytext-muted">Al Namoos Veterinary Store live order metrics and inventory status.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-[#D97706]">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Total Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="font-mono-price font-extrabold text-2xl text-[#D97706]">
            {formatPrice(totalRevenueOMR)}
          </p>
        </div>

        <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-[#0D9488]">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="font-mono font-extrabold text-2xl text-charcoal">{orders.length}</p>
        </div>

        <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-[#D97706]">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Pending Orders</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="font-mono font-extrabold text-2xl text-[#D97706]">{pendingOrders.length}</p>
        </div>

        <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-charcoal">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Catalog Products</span>
            <Package className="w-5 h-5" />
          </div>
          <p className="font-mono font-extrabold text-2xl text-charcoal">{productsCount}</p>
        </div>
      </div>

      {/* Quick Action Banner with High Contrast Button */}
      <div className="bg-[#351809] text-white border border-[#5C2D15] p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-[#D97706] shrink-0" />
          <div>
            <h4 className="font-display font-bold text-white text-sm">Need to update product prices or add new medicine stock?</h4>
            <p className="text-xs text-white/80">Access product catalog editor with dual language support.</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all shrink-0 active:scale-98"
        >
          Manage Products (CRUD)
        </button>
      </div>

      {/* Recent Orders Overview Table */}
      <div className="bg-white border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-4">
        <div className="flex items-center justify-between border-b border-surface-bordered pb-3">
          <h3 className="font-display font-bold text-charcoal text-base">Recent Customer Orders</h3>
          <button onClick={() => onNavigate('orders')} className="text-xs font-extrabold text-[#D97706] hover:underline">
            View All Orders ➔
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-6 text-center text-xs text-bodytext-muted">No customer orders recorded yet.</div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-[#351809] text-white font-bold uppercase text-[10px]">
                  <th className="p-3 text-start rounded-l-xl">Order ID</th>
                  <th className="p-3 text-start">Customer</th>
                  <th className="p-3 text-start">Date</th>
                  <th className="p-3 text-start">Total</th>
                  <th className="p-3 text-start rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-bordered">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-sand/30">
                    <td className="p-3 font-mono font-bold text-[#D97706]">{o.id}</td>
                    <td className="p-3 font-semibold text-charcoal">{o.customer?.name || 'Customer'}</td>
                    <td className="p-3 text-bodytext-muted">
                      {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Today'}
                    </td>
                    <td className="p-3 font-mono font-bold">{formatPrice(o.total_omr || 0)}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                        {o.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
