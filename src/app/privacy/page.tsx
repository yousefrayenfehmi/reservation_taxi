"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Privacy() {
  const { translations, language } = useLanguage();
  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string || key;
  };

  return (
    <main className="min-h-screen">
      {/* En-tête avec background image */}
      <div className="min-h-screen text-white px-4 py-8" style={{
        backgroundImage: "url('/taxi.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backgroundBlendMode: "multiply"
      }}>
        <div className="max-w-6xl mx-auto text-center pt-32">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 text-center">
            {t('privacy.title')}
          </h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Introduction */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.intro')}
              </p>
            </div>

            {/* Articles de la politique de confidentialité */}
            <div className="space-y-8">
              {Object.keys(translations.privacy.sections).map((articleKey) => (
                <article key={articleKey} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {t(`privacy.sections.${articleKey}.title`)}
                  </h2>
                  <div 
                    className={`text-gray-600 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="whitespace-pre-line">{t(`privacy.sections.${articleKey}.content`)}</div>
                  </div>
                </article>
              ))}
            </div>

            {/* Section contact */}
            <div className="mt-12 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                {t('privacy.contact_info.title')}
              </h3>
              <div 
                className={`text-green-700 space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <p className="mb-3">{t('privacy.contact_info.description')}</p>
                <div className="space-y-1">
                  <p className="font-medium">{t('privacy.contact_info.email')}</p>
                  <p className="font-medium">{t('privacy.contact_info.phone')}</p>
                </div>
              </div>
            </div>

            {/* Bouton de navigation */}
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('privacy.navigation.back_home')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className={`max-w-4xl mx-auto px-4 text-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} www.easytaxiparis.fr. Tous droits réservés.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Cette politique de confidentialité est conforme au RGPD.
          </p>
        </div>
      </footer>
    </main>
  );
} 