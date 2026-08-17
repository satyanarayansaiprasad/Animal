import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export const AdminSettings = () => {
  const { setOmrToAedRate } = useCurrency();
  const [settings, setSettings] = useState({
    omr_to_aed: 9.55,
    primary_whatsapp: '+968 9526 6144',
    doctor_consultation_1: '+968 9469 4666',
    doctor_consultation_2: '+968 7964 4471',
    email: 'ysalhajri20006@gmail.com',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setOmrToAedRate(Number(settings.omr_to_aed));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      alert('Error updating settings');
    }
  };

  return (
    <div className="space-y-6 font-body max-w-2xl">
      <div className="border-b border-surface-bordered pb-4">
        <h2 className="font-display font-black text-2xl text-charcoal">Store Settings & FX Exchange Rate</h2>
        <p className="text-xs text-bodytext-muted">Configure WhatsApp contacts, doctor consultation numbers, and OMR↔AED conversion.</p>
      </div>

      <form onSubmit={handleSave} className="bg-surface border border-surface-bordered p-6 rounded-3xl space-y-6 shadow-warm text-xs">
        <div className="space-y-1">
          <label className="font-bold text-charcoal block">Manual Currency Conversion Rate (1 OMR = ? AED)</label>
          <input
            type="number"
            step="0.01"
            value={settings.omr_to_aed}
            onChange={(e) => setSettings({ ...settings, omr_to_aed: Number(e.target.value) })}
            className="w-full bg-sand/50 border rounded-xl p-3 font-mono font-bold text-clay text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-charcoal block">Primary Sales WhatsApp Number</label>
          <input
            type="text"
            value={settings.primary_whatsapp}
            onChange={(e) => setSettings({ ...settings, primary_whatsapp: e.target.value })}
            className="w-full bg-sand/50 border rounded-xl p-3 font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-charcoal block mb-1">Doctor Consultation Line 1</label>
            <input
              type="text"
              value={settings.doctor_consultation_1}
              onChange={(e) => setSettings({ ...settings, doctor_consultation_1: e.target.value })}
              className="w-full bg-sand/50 border rounded-xl p-3 font-mono"
            />
          </div>
          <div>
            <label className="font-bold text-charcoal block mb-1">Doctor Consultation Line 2</label>
            <input
              type="text"
              value={settings.doctor_consultation_2}
              onChange={(e) => setSettings({ ...settings, doctor_consultation_2: e.target.value })}
              className="w-full bg-sand/50 border rounded-xl p-3 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          <span>{saved ? 'Settings Saved Successfully' : 'Save Configuration Changes'}</span>
        </button>
      </form>
    </div>
  );
};
