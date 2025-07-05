'use client';

import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 rounded ${language === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`px-2 py-1 rounded ${language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-2 py-1 rounded ${language === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-200'} font-arabic`}
        dir="rtl"
      >
        ع
      </button>
    </div>
  );
};

export default LanguageSwitcher; 