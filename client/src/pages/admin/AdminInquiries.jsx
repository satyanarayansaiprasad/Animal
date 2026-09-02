import React, { useState, useEffect } from 'react';
import { Stethoscope, Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'general_contact' | 'doctor_consultation'

  useEffect(() => {
    // Retrieve doctor consultations & contact form inquiries from localStorage & sessionStorage
    const loaded = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('consultation_') || key.startsWith('contact_inquiry_'))) {
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

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterType === 'all') return true;
    if (filterType === 'general_contact') return inq.type === 'general_contact';
    if (filterType === 'doctor_consultation') return inq.type === 'doctor_consultation';
    return true;
  });

  return (
    <div className="space-y-6 font-body text-start">
      <div className="border-b border-surface-bordered pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-charcoal flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#D97706]" />
            <span>Customer Messages & Doctor Inquiries</span>
          </h2>
          <p className="text-xs text-bodytext-muted">Review direct web inquiries and doctor consultation callback requests for Dr. Hafez.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'general_contact', label: 'Contact Form' },
            { id: 'doctor_consultation', label: 'Doctor Callbacks' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterType(btn.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === btn.id
                  ? 'bg-[#D97706] text-white shadow-md'
                  : 'bg-white border border-surface-bordered text-charcoal hover:bg-sand'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-surface-bordered rounded-3xl overflow-hidden shadow-warm">
        {loading ? (
          <div className="p-8 text-center text-xs text-bodytext-muted">Loading customer inquiries...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <MessageSquare className="w-10 h-10 text-bodytext-muted mx-auto" />
            <h4 className="font-display font-bold text-charcoal text-base">No Customer Inquiries Recorded Yet</h4>
            <p className="text-xs text-bodytext-muted">Messages submitted via the "Contact Us" or "Ask a Doctor" pages will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-start border-collapse">
              <thead className="bg-[#351809] text-white font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 text-start">Inquiry ID</th>
                  <th className="p-3 text-start">Inquiry Type</th>
                  <th className="p-3 text-start">Customer Name</th>
                  <th className="p-3 text-start">Phone / WhatsApp</th>
                  <th className="p-3 text-start">Email / Details</th>
                  <th className="p-3 text-start">Message / Medical Symptoms</th>
                  <th className="p-3 text-start">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-bordered">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-sand/30">
                    <td className="p-3 font-mono font-bold text-[#D97706]">{inq.id}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        inq.type === 'doctor_consultation'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {inq.type === 'doctor_consultation' ? 'Doctor Callback' : 'Contact Form'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-charcoal">{inq.name || 'Customer'}</td>
                    <td className="p-3 font-mono text-charcoal dir-ltr">{inq.phone}</td>
                    <td className="p-3 text-bodytext-muted font-mono">
                      {inq.email || (inq.species ? `Species: ${inq.species}` : 'N/A')}
                    </td>
                    <td className="p-3 text-bodytext max-w-xs">{inq.message || inq.issue}</td>
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
