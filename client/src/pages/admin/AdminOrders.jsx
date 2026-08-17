import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

export const AdminOrders = () => {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) setOrders(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) fetchOrders();
    } catch {
      alert('Error updating order status');
    }
  };

  return (
    <div className="space-y-6 font-body">
      <div className="border-b border-surface-bordered pb-4">
        <h2 className="font-display font-black text-2xl text-charcoal">Order Fulfillment & Status Updates</h2>
        <p className="text-xs text-bodytext-muted">Manage GCC customer orders, verify payments, and set delivery status.</p>
      </div>

      <div className="bg-surface border border-surface-bordered rounded-3xl overflow-hidden shadow-warm">
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
                    <span className="font-bold text-charcoal block">{o.customer?.name}</span>
                    <span className="text-bodytext-muted font-mono dir-ltr">{o.customer?.phone}</span>
                  </td>
                  <td className="p-3">{o.customer?.city}, {o.customer?.country}</td>
                  <td className="p-3 font-semibold uppercase">{o.payment_method}</td>
                  <td className="p-3 font-mono font-bold">{formatPrice(o.total_omr)}</td>
                  <td className="p-3">
                    <select
                      value={o.status}
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
      </div>
    </div>
  );
};
