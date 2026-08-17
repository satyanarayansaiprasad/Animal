import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhatsAppBubble = () => {
  const { isRtl } = useLanguage();
  const primaryNumber = "96895266144";
  const whatsappUrl = `https://wa.me/${primaryNumber}?text=${encodeURIComponent(
    "السلام عليكم، أستفسر من صيدلية الناموس البيطرية / Hello, inquiring from Al Namoos Vet Pharmacy"
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 z-40 flex items-center gap-2 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white ${
        isRtl ? 'left-6' : 'right-6'
      }`}
    >
      <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
      <span className="hidden sm:inline font-display font-bold text-xs">
        {isRtl ? 'تواصل معنا واتساب' : 'WhatsApp Us'}
      </span>
    </a>
  );
};
