"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const SERVICES = [
  {
    key: 'airport_transfer',
    icon: "✈️",
    image: "/airport-transfer.jpg"
  },
  {
    key: 'business_transfer',
    icon: "💼",
    image: "/business-transfer.jpg"
  },
  {
    key: 'special_events',
    icon: "🎉",
    image: "/events-transfer.jpg"
  },
  {
    key: 'medical_transfer',
    icon: "🏥",
    image: "/medical-transfer.jpg"
  },
  {
    key: 'group_transfer',
    icon: "👥",
    image: "/group-transfer.jpg"
  },
  {
    key: 'package_delivery',
    icon: "📦",
    image: "/package-transfer.jpg"
  }
];

export default function Services() {
  const { translations } = useLanguage();
  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string || key;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* En-tête avec image de fond */}
      <div className="relative h-[300px]">
        <Image
          src="/services-header.jpg"
          alt={t('services.title')}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('services.title')}
          </h1>
        </div>
      </div>

      {/* Section Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.key} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={t(`services.${service.key}.title`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <Link
                    href="/"
                    className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
                  >
                    {t('common.book_now')} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('services.why_choose_us.title')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {t('services.why_choose_us.transparent_pricing.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.why_choose_us.transparent_pricing.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {t('services.why_choose_us.modern_fleet.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.why_choose_us.modern_fleet.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍✈️</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {t('services.why_choose_us.professional_drivers.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.why_choose_us.professional_drivers.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                {t('services.why_choose_us.easy_booking.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.why_choose_us.easy_booking.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('services.custom_service.title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('services.custom_service.description')}
          </p>
          <Link 
            href="/contact"
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            {t('common.contact_us')}
          </Link>
        </div>
      </section>
    </main>
  );
} 