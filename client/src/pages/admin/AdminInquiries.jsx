import React, { useState, useEffect } from 'react';
import { Stethoscope, Mail, Phone, Calendar, User } from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve doctor consultation inquiries from localStorage & sessionStorage
    const loaded = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('consultation_')) {
          try {
            const item = JSON.parse(localStorage.getItem(key));
            if (item && item.id) loaded.push(item);
          } catch {}
        }
      }
    }

    setInquiries(loaded);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6 font-body text-start">
      <div className="border-b border-surface-bordered pb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-charcoal flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-[#D97706]" />
            <span>Doctor Consultations & Medical Inquiries</span>
          </h2>
          <p className="text-xs text-bodytext-muted">Review direct customer consultation callback requests for Dr. Hafez.</p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-mono text-xs font-bold">
          {inquiries.length} Inquiries Logged
        </span>
      </div>

      <div className="bg-white border border-surface-bordered rounded-3xl overflow-hidden shadow-warm">
        {loading ? (
          <div className="p-8 text-center text-xs text-bodytext-muted">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Stethoscope className="w-10 h-10 text-bodytext-muted mx-auto" />
            <h4 className="font-display font-bold text-charcoal text-base">No Doctor Consultation Inquiries Yet</h4>
            <p className="text-xs text-bodytext-muted">Customer requests submitted via the "Ask a Doctor" page will appear here instantly.</p>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-start border-collapse">
              <thead className="bg-[#351809] text-white font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 text-start">Ref ID</th>
                  <th className="p-3 text-start">Customer Name</th>
                  <th className="p-3 text-start">Phone / WhatsApp</th>
                  <th className="p-3 text-start">Species</th>
                  <th className="p-3 text-start">Medical Issue / Symptoms</th>
                  <th className="p-3 text-start">Target Doctor</th>
                  <th className="p-3 text-start">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-bordered">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-sand/30">
                    <td className="p-3 font-mono font-bold text-[#D97706]">{inq.id}</td>
                    <td className="p-3 font-bold text-charcoal">{inq.name || 'Customer'}</td>
                    <td className="p-3 font-mono text-charcoal dir-ltr">{inq.phone}</td>
                    <td className="p-3 font-semibold uppercase text-brand-orange">{inq.species}</td>
                    <td className="p-3 text-bodytext max-w-xs">{inq.issue}</td>
                    <td className="p-3 font-bold text-[#351809]">{inq.doctor || 'Dr. Hafez'}</td>
                    <td className="p-3 text-bodytext-muted">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Today'}
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
