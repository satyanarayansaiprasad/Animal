import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../services/api';

export const Contact = () => {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inquiryId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const inquiryPayload = {
      id: inquiryId,
      createdAt: new Date().toISOString(),
      recipient: 'foxx20041@hotmail.com',
      type: 'general_contact',
      ...formData,
    };

    // Save in local/session storage for Admin Dashboard display
    if (typeof window !== 'undefined') {
      localStorage.setItem(`contact_inquiry_${inquiryId}`, JSON.stringify(inquiryPayload));
      sessionStorage.setItem(`contact_inquiry_${inquiryId}`, JSON.stringify(inquiryPayload));
    }

    try {
      await apiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryPayload),
      });
    } catch {
      // Fallback
    }

    // Trigger direct mailto notification to foxx20041@hotmail.com
    const mailtoSubject = encodeURIComponent(`AL-NAMOOS Web Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nPhone/WhatsApp: ${formData.phone}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:foxx20041@hotmail.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-12 text-start">
      <div className="border-b border-surface-bordered pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">{t('contactUs')}</h1>
        <p className="text-xs text-bodytext-muted">Reach out to our central pharmacy hubs or submit your direct inquiry below.</p>
      </div>

      {/* Main Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm space-y-6">
            <h3 className="font-display font-extrabold text-charcoal text-xl">{t('contactInfo')}</h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[#D97706] block uppercase text-[10px] tracking-wider">Primary Sales WhatsApp</span>
                <a href="https://wa.me/96895266144" target="_blank" rel="noopener noreferrer" className="text-sm font-mono font-bold text-charcoal hover:text-[#D97706] flex items-center gap-2 dir-ltr">
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>+968 9526 6144</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-teal block uppercase text-[10px] tracking-wider">Additional Oman & UAE Lines</span>
                <p className="font-mono text-charcoal dir-ltr">+968 9951 9155</p>
                <p className="font-mono text-charcoal dir-ltr">+971 56 297 3007</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#351809] block uppercase text-[10px] tracking-wider">Veterinary Doctor Consultation</span>
                <p className="font-mono text-charcoal dir-ltr">+968 9469 4666 & +968 7964 4471</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-surface-bordered">
                <span className="font-bold text-charcoal block">Official Contact Email</span>
                <a href="mailto:foxx20041@hotmail.com" className="text-[#D97706] font-bold hover:underline">foxx20041@hotmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-warm space-y-6">
            <h3 className="font-display font-extrabold text-charcoal text-xl">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#D97706] mx-auto" />
                <h4 className="font-display font-extrabold text-charcoal text-base">Message Transmitted Successfully</h4>
                <p className="text-xs text-bodytext">Form submission details sent to <strong className="text-[#D97706]">foxx20041@hotmail.com</strong> and logged into Admin Portal. Our team will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Salim Al-Hajri"
                      className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-charcoal block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+968 9XXXXXXX"
                      className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 font-mono dir-ltr text-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Your Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal"
                  />
                </div>

                <div>
                  <label className="font-bold text-charcoal block mb-1">Message / Inquiry *</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Inquire about bulk feed orders, medicine availability, or GCC shipping rates..."
                    className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-display font-extrabold rounded-2xl text-sm transition-all shadow-xl active:scale-98"
                >
                  {loading ? 'Transmitting to foxx20041@hotmail.com...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2 BRANCH GOOGLE MAP EMBEDS */}
      <div className="space-y-6 pt-4">
        <h2 className="font-display font-black text-charcoal text-2xl">Our Physical Branches in Oman</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Branch 1: Muscat */}
          <div className="bg-white border border-surface-bordered rounded-3xl overflow-hidden shadow-warm space-y-4 p-6">
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-charcoal text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D97706]" />
                <span>Muscat Branch — Central Pharmacy (فرع مسقط)</span>
              </h3>
              <p className="text-xs text-bodytext-muted">Al Seeb Industrial Zone, Muscat, Sultanate of Oman</p>
            </div>
            <div className="h-64 bg-sand rounded-2xl overflow-hidden border border-surface-bordered">
              <iframe
                title="Muscat Branch Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.345!2d58.1834!3d23.6012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzA0LjMiTiA1OMKwMTEnMDAuMiJF!5e0!3m2!1sen!2som!4v1600000000000!5m2!1sen!2som"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Branch 2: Sohar */}
          <div className="bg-white border border-surface-bordered rounded-3xl overflow-hidden shadow-warm space-y-4 p-6">
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-charcoal text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal" />
                <span>Al Batinah Branch — Camel & Livestock Hub (فرع الباطنة)</span>
              </h3>
              <p className="text-xs text-bodytext-muted">Sohar Livestock Market Road, Sohar, Sultanate of Oman</p>
            </div>
            <div className="h-64 bg-sand rounded-2xl overflow-hidden border border-surface-bordered">
              <iframe
                title="Sohar Branch Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.123!2d56.7321!3d24.3567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDIxJzI0LjEiTiA1NsKwNDMnNTUuNiJF!5e0!3m2!1sen!2som!4v1600000000000!5m2!1sen!2som"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
