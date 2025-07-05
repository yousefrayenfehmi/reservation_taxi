import { fr } from './fr';
import { en } from './en';
import { ar } from './ar';
import { es } from './es';

export type Language = 'fr' | 'en' | 'ar' | 'es';

export type TranslationType = typeof fr;

export type TranslationKey = keyof typeof fr;

export const translations = {
  fr,
  en,
  ar,
  es,
} as const; 