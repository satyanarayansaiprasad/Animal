import React, { useState } from 'react';
import { Stethoscope, PhoneCall, MessageCircle, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../services/api';

export const Consultation = () => {
  const { language, isRtl, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    species: 'camel',
    issue: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inquiryId = `INC-${Math.floor(10000 + Math.random() * 90000)}`;
    const inquiryPayload = {
      id: inquiryId,
      createdAt: new Date().toISOString(),
      recipient: 'foxx20041@hotmail.com',
      type: 'doctor_consultation',
      doctor: 'Dr. Hafez',
      ...formData,
    };

    // Save in local/session storage for Admin Dashboard display
    if (typeof window !== 'undefined') {
      localStorage.setItem(`consultation_${inquiryId}`, JSON.stringify(inquiryPayload));
      sessionStorage.setItem(`consultation_${inquiryId}`, JSON.stringify(inquiryPayload));
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
    const mailtoSubject = encodeURIComponent(`AL-NAMOOS Doctor Consultation Request from ${formData.name} [${formData.species.toUpperCase()}]`);
    const mailtoBody = encodeURIComponent(
      `Full Name: ${formData.name}\nPhone/WhatsApp: ${formData.phone}\nSpecies: ${formData.species}\nTarget Doctor: Dr. Hafez\n\nSymptoms / Medical Inquiry:\n${formData.issue}`
    );
    window.open(`mailto:foxx20041@hotmail.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-10 text-start bg-[#F9F6F0] min-h-screen">
      {/* Premium Dark Brown Header Banner */}
      <div className="bg-[#351809] text-white p-8 sm:p-12 rounded-3xl border border-[#5C2D15] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#5C2D15] border border-[#D97706]/40 text-amber-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-[#D97706]" />
            <span>Senior Veterinary Medical Consultation</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
            {language === 'ar' ? 'استشارة طبية بيطرية متخصصة' : 'Veterinary Consultation — Talk to Dr. Hafez'}
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {language === 'ar'
              ? 'تواصل مباشرة مع د. حافظ للحصول على الاستشارات الطبية وبرامج التغذية وجداول محفزات سباقات الهجن والخيل'
              : 'Our senior veterinary specialist is available for treatment advice, camel race ATP protocols, and equine feeding regimens.'}
          </p>
        </div>
      </div>

      {/* Doctor Profile Card (Dr. Hafez) */}
      <div className="max-w-4xl mx-auto bg-white border border-surface-bordered p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center">
        {/* Doctor Photo */}
        <div className="relative shrink-0">
          <img
            src="/images/doctor_banner.jpg"
            alt="Dr. Hafez — Senior Veterinary Specialist"
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover border-4 border-[#D97706] shadow-xl"
          />
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#351809] text-amber-300 text-[10px] font-bold rounded-full border border-[#D97706] whitespace-nowrap shadow-md">
            Senior Veterinary Specialist
          </span>
        </div>

        {/* Doctor Details */}
        <div className="space-y-4 flex-1 text-start">
          <div className="space-y-1">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold rounded-lg uppercase">
              Lead Veterinary Surgeon & Care Director
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
              {language === 'ar'
                ? 'د. حافظ — استشاري طب وجراحة الهجن والخيل'
                : 'Dr. Hafez — Senior Veterinary Specialist'}
            </h3>
            <p className="text-xs text-[#D97706] font-bold">
              Al Namoos Veterinary Pharmacy & Livestock Clinic
            </p>
          </div>

          <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
            {language === 'ar'
              ? 'خبير متخصص في تركيبات محفزات سباقات الهجن، وفيتامينات اللياقة البدنية، وجداول أحماض ATP، والعناية بالمواشي وخيل السباق.'
              : 'Specialized in Arabian racing camel performance formulas, endurance vitamin regimens, pre-race ATP protocols, and equine joint mobility.'}
          </p>

          <div className="space-y-2 text-xs text-bodytext-muted pt-2 border-t border-surface-bordered">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D97706]" />
              <span className="font-semibold">15+ Years Senior Desert Veterinary Practice in Oman & UAE</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Available Sat–Thu: 8:00 AM – 9:00 PM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <a
              href="tel:+96895266144"
              className="py-3 px-4 bg-[#351809] hover:bg-[#5C2D15] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all dir-ltr shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#D97706]" />
              <span>+968 9526 6144</span>
            </a>
            <a
              href="https://wa.me/96895266144?text=السلام%20عليكم%20دكتور%20حافظ،%20لدي%20استفسار%20بيطري"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Dr. Hafez</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consultation Callback Request Form */}
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-surface-bordered shadow-warm space-y-6">
        <div className="border-b border-surface-bordered pb-4">
          <h3 className="font-display font-extrabold text-charcoal text-xl">
            {language === 'ar' ? 'طلب استشارة بيطرية مباشرة من د. حافظ' : 'Request a Doctor Call-Back from Dr. Hafez'}
          </h3>
          <p className="text-xs text-bodytext-muted">Fill in your livestock details to schedule a call-back directly with Dr. Hafez.</p>
        </div>

        {submitted ? (
          <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-[#D97706] mx-auto" />
            <h4 className="font-display font-extrabold text-charcoal text-lg">Consultation Request Transmitted</h4>
            <p className="text-xs text-bodytext">
              Request details sent to <strong className="text-[#D97706]">foxx20041@hotmail.com</strong> and logged into the Admin Portal. Dr. Hafez will call or WhatsApp your number shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-charcoal">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sheikh Saeed Al-Hajri"
                className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+968 9XXXXXXX or +971 50XXXXXXX"
                className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal font-mono dir-ltr"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal">Target Species *</label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal font-bold"
              >
                <option value="camel">Camel (الإبل والهجن)</option>
                <option value="horse">Horse (الخيل)</option>
                <option value="cow">Cattle / Cows (الأبقار والمواشي)</option>
                <option value="dog">Dog / Pets (الكلاب والأليفة)</option>
                <option value="falcon">Falcon / Birds (الصقور والطيور)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-charcoal">Describe Medical Symptoms / Inquiry *</label>
              <textarea
                rows="3"
                required
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                placeholder="Describe racing camel fatigue, horse joint limp, cattle feeding issues, or medicine dosage advice..."
                className="w-full bg-[#F9F6F0] border border-surface-bordered rounded-xl p-3 text-charcoal"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-display font-extrabold rounded-2xl text-sm transition-all shadow-xl active:scale-98"
            >
              {loading ? 'Transmitting to foxx20041@hotmail.com...' : 'Submit Doctor Consultation Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
