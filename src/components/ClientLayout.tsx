"use client";

import { useLanguage } from '../context/LanguageContext';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  
  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      {children}
    </div>
  );
};

export default ClientLayout; 