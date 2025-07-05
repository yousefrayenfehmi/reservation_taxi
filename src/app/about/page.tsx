"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { translations } = useLanguage();
  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string || key;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* En-tête avec image de fond */}
      <div className="relative h-[300px]">
        <Image
          src="/about-header.jpg"
          alt={t('about.title')}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('about.title')}
          </h1>
        </div>
      </div>

      {/* Section Notre Histoire */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('about.our_story.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                {t('about.our_story.content1')}
              </p>
              <p className="text-gray-600 mb-4">
                {t('about.our_story.content2')}
              </p>
              <p className="text-gray-600">
                {t('about.our_story.content3')}
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about-story.jpg"
                alt={t('about.our_story.title')}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('about.values.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('about.values.excellence.title')}
              </h3>
              <p className="text-gray-600">
                {t('about.values.excellence.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('about.values.punctuality.title')}
              </h3>
              <p className="text-gray-600">
                {t('about.values.punctuality.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('about.values.safety.title')}
              </h3>
              <p className="text-gray-600">
                {t('about.values.safety.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Réserver */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('about.ready_to_book.title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('about.ready_to_book.description')}
          </p>
          <Link 
            href="/"
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            {t('common.book_now')}
          </Link>
        </div>
      </section>
    </main>
  );
} 