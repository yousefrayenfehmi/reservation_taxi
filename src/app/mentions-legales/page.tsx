"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function MentionsLegales() {
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
            {t('mentions.title')}
          </h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Articles des mentions légales */}
            <div className="space-y-8">
              {Object.keys(translations.mentions.sections).map((articleKey) => (
                <article key={articleKey} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {t(`mentions.sections.${articleKey}.title`)}
                  </h2>
                  <div 
                    className={`text-gray-600 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="whitespace-pre-line">{t(`mentions.sections.${articleKey}.content`)}</div>
                  </div>
                </article>
              ))}
            </div>

            {/* Boutons de navigation */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                {t('mentions.navigation.back_home')}
              </Link>
              <Link 
                href="/privacy"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
              >
                {t('mentions.navigation.privacy_policy')}
              </Link>
              <Link 
                href="/cgv"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                {t('mentions.navigation.cgv')}
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
            Mentions légales conformes à la réglementation française.
          </p>
        </div>
      </footer>
    </main>
  );
} 