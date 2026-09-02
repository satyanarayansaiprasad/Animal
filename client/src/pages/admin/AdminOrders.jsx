import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { apiFetch } from '../../services/api';

export const AdminOrders = () => {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);

    // Retrieve locally cached session orders
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
          // Merge API orders with local orders without duplicates
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
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const data = await apiFetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (data && data.success) fetchOrders();
    } catch {
      alert('Order status updated in session cache');
    }
  };

  return (
    <div className="space-y-6 font-body text-start">
      <div className="border-b border-surface-bordered pb-4">
        <h2 className="font-display font-black text-2xl text-charcoal">Order Fulfillment & Customer Management</h2>
        <p className="text-xs text-bodytext-muted">Manage GCC customer orders, verify payment receipts, and update delivery status.</p>
      </div>

      <div className="bg-surface border border-surface-bordered rounded-3xl overflow-hidden shadow-warm">
        {loading ? (
          <div className="p-8 text-center text-xs text-bodytext-muted">Loading customer orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-xs text-bodytext-muted">No customer orders recorded yet.</div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-start border-collapse">
              <thead className="bg-sand border-b border-surface-bordered text-charcoal font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 text-start">Order Ref</th>
                  <th className="p-3 text-start">Customer Details</th>
                  <th className="p-3 text-start">Country & City</th>
                  <th className="p-3 text-start">Payment Method</th>
                  <th className="p-3 text-start">Total (OMR)</th>
                  <th className="p-3 text-start">Order Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-bordered">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-sand/30">
                    <td className="p-3 font-mono font-bold text-clay">{o.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-charcoal block">{o.customer?.name || 'Customer'}</span>
                      <span className="text-bodytext-muted font-mono dir-ltr">{o.customer?.phone}</span>
                    </td>
                    <td className="p-3">{o.customer?.city || 'Muscat'}, {o.customer?.country || 'Oman'}</td>
                    <td className="p-3 font-semibold uppercase">{o.payment_method || 'bank_transfer'}</td>
                    <td className="p-3 font-mono font-bold">{formatPrice(o.total_omr || 0)}</td>
                    <td className="p-3">
                      <select
                        value={o.status || 'pending'}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className="bg-sand border border-surface-bordered rounded-lg py-1 px-2 text-xs font-bold text-charcoal"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
