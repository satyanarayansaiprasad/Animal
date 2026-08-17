import React, { useState } from 'react';
import { Stethoscope, PhoneCall, MessageCircle, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PetroglyphIcon } from '../components/PetroglyphIcon';

export const Consultation = () => {
  const { language, isRtl, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    species: 'camel',
    issue: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-12">
      {/* Page Header */}
      <div className="bg-charcoal text-sand p-8 sm:p-12 rounded-3xl border border-charcoal-light shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal-light border border-gold/30 text-gold rounded-full text-xs font-bold">
            <Stethoscope className="w-4 h-4" />
            <span>Dedicated Veterinary Consultation</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
            {t('askDoctorTitle')}
          </h1>

          <p className="text-sand/80 text-sm sm:text-base leading-relaxed">
            {t('askDoctorSubtitle')}
          </p>
        </div>
      </div>

      {/* Doctor Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Doctor 1 */}
        <div className="bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-clay-light text-clay rounded-2xl">
                <PetroglyphIcon species="camel" size="md" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-charcoal text-lg sm:text-xl">
                  Dr. Ahmed Al-Hinaai (د. أحمد الهنائي)
                </h3>
                <p className="text-xs text-clay font-bold">Senior Camel & Racing Specialist</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
              Specialized in Arabian racing camel performance formulas, endurance vitamin regimens, pre-race ATP protocols, and digestive rumen health.
            </p>

            <div className="space-y-2 text-xs text-bodytext-muted">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" />
                <span>15+ Years Desert Veterinary Practice in Oman & UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal" />
                <span>Available Sat-Thu: 8:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-surface-bordered">
            <a
              href="tel:+96894694666"
              className="py-3 bg-charcoal hover:bg-charcoal-light text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all dir-ltr"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>+968 9469 4666</span>
            </a>
            <a
              href="https://wa.me/96894694666?text=السلام%20عليكم%20دكتور%20أحمد،%20لدي%20استفسار%20بيطري"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Dr. Ahmed</span>
            </a>
          </div>
        </div>

        {/* Doctor 2 */}
        <div className="bg-surface border border-surface-bordered p-8 rounded-3xl shadow-warm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-teal-light text-teal rounded-2xl">
                <PetroglyphIcon species="horse" size="md" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-charcoal text-lg sm:text-xl">
                  Dr. Sarah Al-Hashimi (د. سارة الهاشمي)
                </h3>
                <p className="text-xs text-teal font-bold">Equine & Livestock Specialist</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-bodytext leading-relaxed">
              Specialized in Arabian equine joint mobility, farrier hoof care, anti-ulcer protocols, and dairy cattle mastitis prevention.
            </p>

            <div className="space-y-2 text-xs text-bodytext-muted">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" />
                <span>Certified Equine Veterinary Practitioner</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal" />
                <span>Available 7 Days: 9:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-surface-bordered">
            <a
              href="tel:+96879644471"
              className="py-3 bg-charcoal hover:bg-charcoal-light text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all dir-ltr"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>+968 7964 4471</span>
            </a>
            <a
              href="https://wa.me/96879644471?text=السلام%20عليكم%20دكتورة%20سارة،%20لدي%20استفسار%20بيطري"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Dr. Sarah</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consultation Callback Request Form */}
      <div className="bg-sand p-8 rounded-3xl border border-surface-bordered space-y-6">
        <h3 className="font-display font-bold text-charcoal text-xl">
          Request a Doctor Call-Back
        </h3>

        {submitted ? (
          <div className="p-6 bg-surface rounded-2xl border border-surface-bordered text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
            <h4 className="font-display font-bold text-charcoal text-base">Consultation Request Received</h4>
            <p className="text-xs text-bodytext-muted">Our duty veterinarian will contact your phone/WhatsApp shortly.</p>
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
                placeholder="e.g. Salim Al-Kindi"
                className="w-full bg-white border border-surface-bordered rounded-xl p-3 text-charcoal"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+968 9XXXXXXX"
                className="w-full bg-white border border-surface-bordered rounded-xl p-3 text-charcoal font-mono dir-ltr"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-charcoal">Target Species *</label>
              <select
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                className="w-full bg-white border border-surface-bordered rounded-xl p-3 text-charcoal font-semibold"
              >
                <option value="camel">Camel (الإبل والهجن)</option>
                <option value="horse">Horse (الخيل)</option>
                <option value="cow">Cattle / Cows (الأبقار والمواشي)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-charcoal">Describe Medical Symptoms / Inquiry</label>
              <textarea
                rows="3"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                placeholder="Describe camel fatigue, horse joint limp, or cattle feed question..."
                className="w-full bg-white border border-surface-bordered rounded-xl p-3 text-charcoal"
              />
            </div>

            <button
              type="submit"
              className="sm:col-span-2 py-3.5 bg-clay hover:bg-clay-hover text-white font-display font-bold rounded-xl text-sm transition-all shadow-md"
            >
              Submit Consultation Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
