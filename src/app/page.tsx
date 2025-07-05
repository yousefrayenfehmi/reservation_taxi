"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useRef, useEffect } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

const VEHICULES = [
  {
    key: 'economy',
    img: '/economy.png',
    seats: 4,
    luggage: 4,
  },
  {
    key: 'comfort',
    img: '/confort.png',
    seats: 4,
    luggage: 4,
  },
  
  {
    key: 'business',
    img: '/business.png',
    seats: 4,
    luggage: 4,
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
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);
  const vehicleDropdownRef = useRef<HTMLDivElement>(null);

  // Fermer les menus si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
      if (vehicleDropdownRef.current && !vehicleDropdownRef.current.contains(event.target as Node)) {
        setIsVehicleDropdownOpen(false);
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
    vehicule: '',
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
               
                <input
                placeholder={t('home.booking_form.departure')}
                  type="text"
                  name="depart"
                  value={formData.depart}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
               
                <input
                  placeholder={t('home.booking_form.destination')}
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
               
                <input
                  placeholder={t('home.booking_form.date')}
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                
                <input
                  placeholder={t('home.booking_form.time')}
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                
                <input
                  placeholder={t('home.booking_form.passengers')}
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
              
              {/* Liste déroulante personnalisée avec images */}
              <div className="relative" ref={vehicleDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsVehicleDropdownOpen(!isVehicleDropdownOpen)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {formData.vehicule ? (
                      <>
                        <div className="w-6 h-6 relative">
                          <Image
                            src={VEHICULES.find(v => v.key === formData.vehicule)?.img || ''}
                            alt={t(`home.fleet.vehicles.${formData.vehicule}`)}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>{t(`home.fleet.vehicles.${formData.vehicule}`)}</span>
                      </>
                    ) : (
                      <span className="text-gray-500">{t('home.booking_form.vehicle_type')}</span>
                    )}
                  </div>
                  <span className={`transform transition-transform duration-200 ${isVehicleDropdownOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {isVehicleDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {VEHICULES.map(v => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => {
                          handleVehiculeChange(v.key);
                          setIsVehicleDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0 ${
                          formData.vehicule === v.key ? 'bg-yellow-50 border-yellow-200' : ''
                        }`}
                      >
                        <div className="w-8 h-8 relative flex-shrink-0">
                          <Image
                            src={v.img}
                            alt={t(`home.fleet.vehicles.${v.key}`)}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {t(`home.fleet.vehicles.${v.key}`)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {v.seats} {t('home.fleet.seats')} · {v.luggage} {t('home.fleet.luggage')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors flex items-center gap-2 mx-auto"
              >
                {/* Icône WhatsApp */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
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
