import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { translations } = useLanguage();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33766145238';

  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string || key;
  };

  const handleWhatsAppClick = () => {
    const message = t('whatsapp.default_message');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 flex items-center gap-2"
      aria-label="Contact WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.29 22l4.17-1.59C7.88 21.4 9.87 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.89 14.14l-2.89-.82-.89-2.89 2.89.82.89 2.89zm4.11-4.11l-2.89-.82-.89-2.89 2.89.82.89 2.89zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        />
      </svg>
      <span className="hidden md:inline">{t('whatsapp.contact_us')}</span>
    </button>
  );
};

export default WhatsAppButton; 