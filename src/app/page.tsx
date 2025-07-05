"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

const VEHICULES = [
  {
    key: 'economy',
    img: '/economy.png',
    seats: 3,
    luggage: 3,
  },
  {
    key: 'comfort',
    img: '/confort.png',
    seats: 3,
    luggage: 3,
  },
  
  {
    key: 'business',
    img: '/business.png',
    seats: 3,
    luggage: 3,
  },
  {
    key: 'van',
    img: '/van.png',
    seats: 8,
    luggage: 6,
  },
  
  {
    key: 'suv',
    img: '/suv.png',
    seats: 4,
    luggage: 4,
  },
  
  
  {
    key: 'minibus',
    img: '/minibus.png',
    seats: 16,
    luggage: 16,
  },
  
  {
    key: 'premium',
    img: '/premium.png',
    seats: 3,
    luggage: 3,
  },
  {
    key: 'bus',
    img: '/autobus.png',
    seats: 50,
    luggage: 50,
  },
];

const AVANTAGES = [
  {
    key: 'attractive_prices',
    icon: '🔥',
  },
  {
    key: 'free_waiting',
    icon: '⏰',
  },
  {
    key: 'no_hidden_fees',
    icon: '💰',
  },
  {
    key: 'safe_rides',
    icon: '🛡️',
  },
];

export default function Home() {
  const { translations, language, setLanguage } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string || key;
  };
  const [formData, setFormData] = useState({
    depart: '',
    destination: '',
    date: '',
    time: '',
    passengers: '',
    vehicule: VEHICULES[0].key,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVehiculeChange = (value: string) => {
    setFormData(prev => ({ ...prev, vehicule: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des champs requis
    if (!formData.depart || !formData.destination || !formData.date || !formData.time || !formData.passengers) {
      alert(t('home.booking_form.required_fields'));
      return;
    }

    // Vérification de la date
    const selectedDate = new Date(formData.date);
    if (selectedDate < new Date()) {
      alert(t('home.booking_form.date_past_error'));
      return;
    }

    // Envoyer l'événement de conversion à Google Ads
    if (typeof window !== 'undefined' && (window as any).sendGoogleAdsEvent) {
      (window as any).sendGoogleAdsEvent('booking_request', {
        value: 1.0,
        currency: 'EUR',
        transaction_id: Date.now().toString(),
      });
    }

    const message = t('home.booking_form.whatsapp_message')
      .replace("{depart}", formData.depart)
      .replace("{destination}", formData.destination)
      .replace("{date}", formData.date)
      .replace("{time}", formData.time)
      .replace("{passengers}", formData.passengers)
      .replace("{vehicule}", formData.vehicule);

    const whatsappUrl = `https://wa.me/33766145238?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen">
      <WhatsAppButton />
      <div className="min-h-screen text-white px-4 py-8" style={{
        backgroundImage: "url('/taxi.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backgroundBlendMode: "multiply"
      }}>
        <header className="flex justify-between items-center max-w-6xl mx-auto mb-10">
          <h1 className="text-3xl font-bold">TAXI</h1>
          <div className="relative" ref={languageMenuRef}>
            <button 
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {language === 'fr' && 'Français'}
              {language === 'en' && 'English'}
              {language === 'es' && 'Español'}
              {language === 'ar' && <span dir="rtl">العربية</span>}
              <span className={`transform transition-transform duration-300 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            <div className={`absolute right-0 mt-2 w-48 py-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 transition-all duration-300 z-50 ${
              isLanguageMenuOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible -translate-y-2'
            }`}>
              <button 
                onClick={() => {
                  setLanguage('fr');
                  setIsLanguageMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/20 transition-colors ${language === 'fr' ? 'text-yellow-400' : 'text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4">{language === 'fr' ? '✓' : ''}</span>
                  Français
                </div>
              </button>
              <button 
                onClick={() => {
                  setLanguage('en');
                  setIsLanguageMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/20 transition-colors ${language === 'en' ? 'text-yellow-400' : 'text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4">{language === 'en' ? '✓' : ''}</span>
                  English
                </div>
              </button>
              <button 
                onClick={() => {
                  setLanguage('es');
                  setIsLanguageMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/20 transition-colors ${language === 'es' ? 'text-yellow-400' : 'text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4">{language === 'es' ? '✓' : ''}</span>
                  Español
                </div>
              </button>
              <button 
                onClick={() => {
                  setLanguage('ar');
                  setIsLanguageMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/20 transition-colors ${language === 'ar' ? 'text-yellow-400' : 'text-white'}`}
              >
                <div className="flex items-center gap-2" dir="rtl">
                  <span className="w-4">{language === 'ar' ? '✓' : ''}</span>
                  العربية
                </div>
              </button>
            </div>
          </div>
        </header>

        <section className="flex flex-col items-center mt-10">
          <h2 className="text-4xl font-bold mb-6">{t('home.hero.title')}</h2>
          <p className="text-xl mb-12 text-center max-w-2xl">{t('home.hero.subtitle')}</p>
          <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-5xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('home.booking_form.departure')}
                </label>
                <input
                  type="text"
                  name="depart"
                  value={formData.depart}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('home.booking_form.destination')}
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('home.booking_form.date')}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('home.booking_form.time')}
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('home.booking_form.passengers')}
                </label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('home.booking_form.vehicle_type')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICULES.map(v => (
                  <label key={v.key} className={`flex items-center border rounded-lg p-2 cursor-pointer transition-all duration-150 ${formData.vehicule === v.key ? 'ring-2 ring-yellow-500 bg-yellow-50' : 'bg-white'}`}>
                    <input
                      type="radio"
                      name="vehicule"
                      value={v.key}
                      checked={formData.vehicule === v.key}
                      onChange={() => handleVehiculeChange(v.key)}
                      className="mr-2"
                    />
                    <div className="w-14 h-10 relative mr-2">
                      <Image
                        src={v.img}
                        alt={t(`home.fleet.vehicles.${v.key}`)}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold">
                        {t(`home.fleet.vehicles.${v.key}`)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {v.seats} {t('home.fleet.seats')} · {v.luggage} {t('home.fleet.luggage')}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
              >
                {t('home.booking_form.book_now')}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Section Avantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.advantages.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AVANTAGES.map((avantage) => (
              <div 
                key={avantage.key} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl">{avantage.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  {t(`home.advantages.${avantage.key}.title`)}
                </h3>
                <p className="text-gray-600 text-center">
                  {t(`home.advantages.${avantage.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Service Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('service_details.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('service_details.subtitle')}
            </p>
            <div className="h-1 w-24 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {Object.keys(translations.service_details.paragraphs).map((key) => (
              <div key={key} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {t(`service_details.paragraphs.${key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`service_details.paragraphs.${key}.content`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Notre Flotte avec barre orange */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('home.fleet.title')}
            </h2>
            <div className="h-1 w-24 bg-orange-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-4">
            {VEHICULES.map((vehicule) => (
              <div key={vehicule.key} className="flex flex-col items-center">
                <div className="w-full aspect-[4/3] relative mb-2">
                  <Image
                    src={vehicule.img}
                    alt={t(`home.fleet.vehicles.${vehicule.key}`)}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-center">
                  {t(`home.fleet.vehicles.${vehicule.key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
