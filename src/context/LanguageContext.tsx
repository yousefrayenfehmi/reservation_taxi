"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { fr } from '../translations/fr';
import { en } from '../translations/en';
import { es } from '../translations/es';
import { ar } from '../translations/ar';

type Language = 'fr' | 'en' | 'es' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof fr;
};

const translations = {
  fr,
  en,
  es,
  ar,
};
// 
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const value = {
    language,
    setLanguage,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 