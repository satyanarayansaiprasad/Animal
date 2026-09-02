import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { apiFetch } from '../../services/api';

export const AdminSettings = () => {
  const { setOmrToAedRate } = useCurrency();
  const [settings, setSettings] = useState({
    omr_to_aed: 9.55,
    primary_whatsapp: '+968 9526 6144',
    doctor_consultation_1: '+968 9469 4666',
    doctor_consultation_2: '+968 7964 4471',
    email: 'foxx20041@hotmail.com',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiFetch('/api/settings')
      .then((data) => {
        if (data && data.success && data.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (data && data.success) {
        setOmrToAedRate(Number(settings.omr_to_aed));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      alert('Error updating settings');
    }
  };

  return (
    <div className="space-y-6 font-body max-w-2xl text-start">
      <div className="border-b border-surface-bordered pb-4">
        <h2 className="font-display font-black text-2xl text-charcoal">Store Settings & FX Exchange Rate</h2>
        <p className="text-xs text-bodytext-muted">Configure WhatsApp contacts, doctor consultation numbers, and OMR↔AED conversion.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-surface-bordered p-6 rounded-3xl space-y-6 shadow-warm text-xs">
        <div className="space-y-1">
          <label className="font-bold text-charcoal block">Manual Currency Conversion Rate (1 OMR = ? AED)</label>
          <input
            type="number"
            step="0.01"
            value={settings.omr_to_aed}
            onChange={(e) => setSettings({ ...settings, omr_to_aed: Number(e.target.value) })}
            className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-3 font-mono font-bold text-[#D97706] text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-charcoal block">Primary Sales WhatsApp Number</label>
          <input
            type="text"
            value={settings.primary_whatsapp}
            onChange={(e) => setSettings({ ...settings, primary_whatsapp: e.target.value })}
            className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-3 font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-charcoal block">Primary Store Contact Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-3 font-mono text-[#D97706] font-bold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-charcoal block mb-1">Doctor Consultation Line 1</label>
            <input
              type="text"
              value={settings.doctor_consultation_1}
              onChange={(e) => setSettings({ ...settings, doctor_consultation_1: e.target.value })}
              className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-3 font-mono"
            />
          </div>
          <div>
            <label className="font-bold text-charcoal block mb-1">Doctor Consultation Line 2</label>
            <input
              type="text"
              value={settings.doctor_consultation_2}
              onChange={(e) => setSettings({ ...settings, doctor_consultation_2: e.target.value })}
              className="w-full bg-sand/50 border border-surface-bordered rounded-xl p-3 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-display font-extrabold rounded-2xl text-sm transition-all shadow-xl flex items-center justify-center gap-2 active:scale-98"
        >
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          <span>{saved ? 'Settings Saved Successfully' : 'Save Configuration Changes'}</span>
        </button>
      </form>
    </div>
  );
};
