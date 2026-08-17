import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const AdminDashboard = ({ onNavigate }) => {
  const { formatPrice } = useCurrency();
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/orders').then((r) => r.json()),
    ])
      .then(([prodRes, orderRes]) => {
        if (prodRes.success && prodRes.data) setProductsCount(prodRes.data.length);
        if (orderRes.success && orderRes.data) setOrders(orderRes.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalRevenueOMR = orders.reduce((sum, o) => sum + (o.total_omr || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');

  return (
    <div className="space-y-8 font-body">
      <div>
        <h2 className="font-display font-black text-2xl text-charcoal">Store Overview & Sales Dashboard</h2>
        <p className="text-xs text-bodytext-muted">Al Namoos Veterinary Store live order metrics and inventory status.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-clay">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Total Revenue</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="font-mono-price font-extrabold text-2xl text-clay">
            {formatPrice(totalRevenueOMR)}
          </p>
        </div>

        <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-teal">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="font-mono font-extrabold text-2xl text-charcoal">{orders.length}</p>
        </div>

        <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-gold">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Pending Orders</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="font-mono font-extrabold text-2xl text-gold">{pendingOrders.length}</p>
        </div>

        <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-2">
          <div className="flex items-center justify-between text-charcoal">
            <span className="text-xs font-bold text-bodytext-muted uppercase">Catalog Products</span>
            <Package className="w-5 h-5" />
          </div>
          <p className="font-mono font-extrabold text-2xl text-charcoal">{productsCount}</p>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="bg-sand-dark border border-surface-bordered p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-clay shrink-0" />
          <div>
            <h4 className="font-display font-bold text-charcoal text-sm">Need to update product prices or add new medicine stock?</h4>
            <p className="text-xs text-bodytext-muted">Access product catalog editor with dual language support.</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="px-6 py-2.5 bg-clay text-white font-bold text-xs rounded-xl shadow-md hover:bg-clay-hover shrink-0"
        >
          Manage Products (CRUD)
        </button>
      </div>

      {/* Recent Orders Overview Table */}
      <div className="bg-surface border border-surface-bordered p-6 rounded-3xl shadow-warm space-y-4">
        <div className="flex items-center justify-between border-b border-surface-bordered pb-3">
          <h3 className="font-display font-bold text-charcoal text-base">Recent Customer Orders</h3>
          <button onClick={() => onNavigate('orders')} className="text-xs font-bold text-clay hover:underline">View All Orders</button>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-surface-bordered text-bodytext-muted uppercase text-[10px]">
                <th className="py-2 text-start">Order ID</th>
                <th className="py-2 text-start">Customer</th>
                <th className="py-2 text-start">Date</th>
                <th className="py-2 text-start">Total</th>
                <th className="py-2 text-start">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-bordered">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-sand/30">
                  <td className="py-3 font-mono font-bold text-clay">{o.id}</td>
                  <td className="py-3 font-semibold text-charcoal">{o.customer?.name}</td>
                  <td className="py-3 text-bodytext-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 font-mono font-bold">{formatPrice(o.total_omr)}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sand text-charcoal uppercase">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
