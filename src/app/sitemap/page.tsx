"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function Sitemap() {
  const { translations, language } = useLanguage();
  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], translations) as string || key;
  };

  const currentDate = new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'ar-SA');
  const [searchTerm, setSearchTerm] = useState('');

  // Liste complète des villes françaises
  const frenchCities = [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", 
    "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Nîmes", "Angers", "Villeurbanne", 
    "Le Mans", "Saint-Denis", "Aix-en-Provence", "Clermont-Ferrand", "Brest", "Limoges", "Tours", "Amiens", "Perpignan", "Metz", 
    "Besançon", "Boulogne-Billancourt", "Orléans", "Mulhouse", "Rouen", "Caen", "Argenteuil", "Saint-Paul", "Montreuil", "Nancy", 
    "Roubaix", "Tourcoing", "Nanterre", "Avignon", "Vitry-sur-Seine", "Créteil", "Dunkirk", "Poitiers", "Asnières-sur-Seine", "Courbevoie", 
    "Versailles", "Colombes", "Fort-de-France", "Aulnay-sous-Bois", "Saint-Pierre", "Rueil-Malmaison", "Pau", "Aubervilliers", "Le Tampon", "Champigny-sur-Marne", 
    "Antibes", "Béziers", "La Rochelle", "Saint-Maur-des-Fossés", "Cannes", "Calais", "Saint-Nazaire", "Mérignac", "Drancy", "Colmar", 
    "Ajaccio", "Bourges", "Issy-les-Moulineaux", "Levallois-Perret", "La Seyne-sur-Mer", "Quimper", "Noisy-le-Grand", "Villeneuve-d'Ascq", "Neuilly-sur-Seine", "Valence", 
    "Antony", "Cergy", "Vénissieux", "Pessac", "Troyes", "Clichy", "Ivry-sur-Seine", "Chambéry", "Lorient", "Les Abymes", 
    "Montauban", "Sarcelles", "Niort", "Villejuif", "Saint-André", "Hyères", "Saint-Quentin", "Beauvais", "Épinay-sur-Seine", "Cayenne", 
    "Maisons-Alfort", "Cholet", "Meaux", "Chelles", "Pantin", "Évry", "Fontenay-sous-Bois", "Fréjus", "Vannes", "Bondy", 
    "Le Blanc-Mesnil", "La Roche-sur-Yon", "Saint-Louis", "Arles", "Clamart", "Narbonne", "Annecy", "Sartrouville", "Grasse", "Laval", 
    "Belfort", "Bobigny", "Évreux", "Vincennes", "Montrouge", "Sevran", "Albi", "Charleville-Mézières", "Suresnes", "Martigues", 
    "Corbeil-Essonnes", "Saint-Ouen", "Bayonne", "Cagnes-sur-Mer", "Brive-la-Gaillarde", "Carcassonne", "Massy", "Blois", "Aubagne", "Saint-Brieuc", 
    "Châteauroux", "Chalon-sur-Saône", "Mantes-la-Jolie", "Meudon", "Saint-Malo", "Châlons-en-Champagne", "Alfortville", "Sète", "Salon-de-Provence", "Vaulx-en-Velin",
    "Puteaux", "Rosny-sous-Bois", "Saint-Herblain", "Gennevilliers", "Le Cannet", "Livry-Gargan", "Saint-Priest", "Istres", "Valenciennes", "Choisy-le-Roi", 
    "Caluire-et-Cuire", "Boulogne-sur-Mer", "Bastia", "Angoulême", "Garges-lès-Gonesse", "Castres", "Thionville", "Wattrelos", "Talence", "Saint-Laurent-du-Maroni", 
    "Douai", "Noisy-le-Sec", "Tarbes", "Arras", "Alès", "La Courneuve", "Bourg-en-Bresse", "Compiègne", "Gap", "Melun", 
    "Le Lamentin", "Rezé", "Saint-Germain-en-Laye", "Marcq-en-Barœul", "Gagny", "Anglet", "Draguignan", "Chartres", "Bron", "Bagneux", 
    "Colomiers", "Saint-Martin-d'Hères", "Pontault-Combault", "Montluçon", "Joué-lès-Tours", "Saint-Joseph", "Poissy", "Savigny-sur-Orge", "Cherbourg-Octeville", "Montélimar", 
    "Villefranche-sur-Saône", "Stains", "Saint-Benoît", "Bagnolet", "Châtillon", "Le Port", "Sainte-Geneviève-des-Bois", "Échirolles", "Roanne", "Villepinte", 
    "Saint-Chamond", "Conflans-Sainte-Honorine", "Auxerre", "Nevers", "Neuilly-sur-Marne", "La Ciotat", "Tremblay-en-France", "Thonon-les-Bains", "Vitrolles", "Haguenau", 
    "Six-Fours-les-Plages", "Agen", "Creil", "Annemasse", "Saint-Raphaël", "Marignane", "Romans-sur-Isère", "Montigny-le-Bretonneux", "Le Perreux-sur-Marne", "Franconville", 
    "Mâcon", "Saint-Leu", "Cambrai", "Châtenay-Malabry", "Sainte-Marie", "Villeneuve-Saint-Georges", "Houilles", "Épinal", "Lens", "Liévin", 
    "Les Mureaux", "Schiltigheim", "La Possession", "Meyzieu", "Dreux", "Nogent-sur-Marne", "Plaisir", "Mont-de-Marsan", "Palaiseau", "Châtellerault", 
    "Goussainville", "L'Haÿ-les-Roses", "Viry-Châtillon", "Vigneux-sur-Seine", "Chatou", "Trappes", "Clichy-sous-Bois", "Rillieux-la-Pape", "Villenave-d'Ornon", "Maubeuge", 
    "Charenton-le-Pont", "Malakoff", "Matoury", "Dieppe", "Athis-Mons", "Savigny-le-Temple", "Périgueux", "Baie-Mahault", "Vandoeuvre-lès-Nancy", "Pontoise", 
    "Aix-les-Bains", "Cachan", "Vienne", "Thiais", "Orange", "Saint-Médard-en-Jalles", "Villemomble", "Saint-Cloud", "Saint-Laurent-du-Var", "Yerres", 
    "Saint-Étienne-du-Rouvray", "Sotteville-lès-Rouen", "Draveil", "Le Chesnay", "Bois-Colombes", "Le Plessis-Robinson", "La Garenne-Colombes", "Lambersart", "Soissons", "Pierrefitte-sur-Seine", 
    "Carpentras", "Villiers-sur-Marne", "Vanves", "Menton", "Bergerac", "Ermont", "Bezons", "Grigny", "Guyancourt", "Saumur", 
    "Herblay", "Ris-Orangis", "Villiers-le-Bel", "Bourgoin-Jallieu", "Vierzon", "Le Gosier", "Décines-Charpieu", "Hénin-Beaumont", "Fresnes", "Aurillac", 
    "Sannois", "Vallauris", "Illkirch-Graffenstaden", "Alençon", "Élancourt", "Tournefeuille", "Bègles", "Gonesse", "Oullins", "Brunoy", 
    "Taverny", "Armentières", "Montfermeil", "Rambouillet", "Villeparisis", "Le Kremlin-Bicêtre", "Sucy-en-Brie", "Kourou", "Montbéliard", "Romainville", 
    "Cavaillon", "Saint-Dizier", "Brétigny-sur-Orge", "Saint-Sébastien-sur-Loire", "Saintes", "La Teste-de-Buch", "Villeneuve-la-Garenne", "Béthune", "Bussy-Saint-Georges", "Vichy", 
    "La Garde", "Agde", "Laon", "Sens", "Lunel", "Miramas", "Biarritz", "Le Grand-Quevilly", "Orvault", "Les Ulis", 
    "Champs-sur-Marne", "Rochefort", "Muret", "Sainte-Anne", "Eaubonne", "Étampes", "Gradignan", "Vernon", "Petit-Bourg", "Libourne", 
    "Abbeville", "Rodez", "Saint-Ouen-l'Aumône", "Torcy", "Maisons-Laffitte", "Montgeron", "Villeneuve-sur-Lot", "Cormeilles-en-Parisis", "Épernay", "Sèvres", 
    "Dole", "Le Robert", "Le Bouscat", "Blagnac", "Frontignan", "Cenon", "Mandelieu-la-Napoule", "Vertou", "Les Lilas", "Bruay-la-Buissière", 
    "Les Pavillons-sous-Bois", "Chaumont", "Roissy-en-Brie", "Le Moule", "Le Petit-Quevilly", "Manosque", "Saint-Mandé", "Fontenay-aux-Roses", "Orly", "Le Creusot", 
    "Oyonnax", "La Madeleine", "Sainte-Suzanne", "Millau", "Combs-la-Ville", "Fontaine", "Deuil-la-Barre", "Coudekerque-Branche", "Auch", "Lanester", 
    "Beaune", "Montigny-lès-Metz", "Hazebrouck", "Longjumeau", "Sainte-Foy-lès-Lyon", "Forbach", "Sarreguemines", "Mons-en-Barœul", "La Valette-du-Var", "Hérouville-Saint-Clair", 
    "Morsang-sur-Orge", "Grande-Synthe", "La Celle-Saint-Cloud", "Lisieux", "Croix", "Dammarie-les-Lys", "Vélizy-Villacoublay", "Wasquehal", "Saint-Gratien", "Halluin", 
    "Neuilly-Plaisance", "Montmorency", "Dax", "Lagny-sur-Marne", "Le Mée-sur-Seine", "Saint-Genis-Laval", "Fleury-les-Aubrais", "Loos", "Gif-sur-Yvette", "Denain", 
    "Saint-Dié-des-Vosges", "Sainte-Rose", "Saint-Michel-sur-Orge"
  ];

  // Filtrer les villes selon le terme de recherche
  const filteredCities = frenchCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Définition des liens de pages avec leurs URLs
  const pageLinks = {
    main_pages: [
      { key: 'home', url: '/', icon: '🏠' },
      { key: 'about', url: '/about', icon: '👥' },
      { key: 'services', url: '/services', icon: '🚗' },
      { key: 'contact', url: '/contact', icon: '📞' }
    ],
    legal_pages: [
      { key: 'cgv', url: '/cgv', icon: '📋' },
      { key: 'privacy', url: '/privacy', icon: '🔒' },
      { key: 'mentions', url: '/mentions-legales', icon: '⚖️' }
    ],
    services_detail: [
      { key: 'airport_transfer', url: '/services#airport', icon: '✈️' },
      { key: 'city_transfer', url: '/services#city', icon: '🏙️' },
      { key: 'business_travel', url: '/services#business', icon: '💼' },
      { key: 'event_transport', url: '/services#events', icon: '🎉' }
    ]
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-center">
            {t('sitemap.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-12 text-center max-w-3xl mx-auto">
            {t('sitemap.intro')}
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Date de mise à jour */}
            <div className="text-center mb-8 text-gray-600">
              <p className="text-sm">
                {t('sitemap.last_updated')}: {currentDate}
              </p>
            </div>

            {/* Sections du sitemap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Pages principales */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🏠</span>
                  {t('sitemap.sections.main_pages.title')}
                </h2>
                <ul className="space-y-3">
                  {pageLinks.main_pages.map((page) => (
                    <li key={page.key}>
                      <Link 
                        href={page.url}
                        className="flex items-center gap-3 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-all duration-200 group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                          {page.icon}
                        </span>
                        <span className="font-medium">
                          {t(`sitemap.sections.main_pages.pages.${page.key}`)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pages légales */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">⚖️</span>
                  {t('sitemap.sections.legal_pages.title')}
                </h2>
                <ul className="space-y-3">
                  {pageLinks.legal_pages.map((page) => (
                    <li key={page.key}>
                      <Link 
                        href={page.url}
                        className="flex items-center gap-3 text-green-700 hover:text-green-900 hover:bg-green-100 p-3 rounded-lg transition-all duration-200 group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                          {page.icon}
                        </span>
                        <span className="font-medium">
                          {t(`sitemap.sections.legal_pages.pages.${page.key}`)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services détaillés */}
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h2 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
                  <span className="text-3xl">🚗</span>
                  {t('sitemap.sections.services_detail.title')}
                </h2>
                <ul className="space-y-3">
                  {pageLinks.services_detail.map((page) => (
                    <li key={page.key}>
                      <Link 
                        href={page.url}
                        className="flex items-center gap-3 text-orange-700 hover:text-orange-900 hover:bg-orange-100 p-3 rounded-lg transition-all duration-200 group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                          {page.icon}
                        </span>
                        <span className="font-medium">
                          {t(`sitemap.sections.services_detail.pages.${page.key}`)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section Villes desservies */}
            <div className="mt-12">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h2 className="text-3xl font-bold text-purple-800 mb-4 flex items-center gap-2 text-center">
                  <span className="text-4xl">🗺️</span>
                  {t('sitemap.sections.cities_served.title')}
                </h2>
                <p className="text-purple-700 text-center mb-6">
                  {t('sitemap.sections.cities_served.subtitle')}
                </p>
                
                {/* Barre de recherche */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder={t('sitemap.sections.cities_served.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Liste des villes */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-80 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <span className="text-purple-700 font-medium text-sm group-hover:text-purple-900">
                        {city}
                      </span>
                    </div>
                  ))}
                </div>
                
                {filteredCities.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-purple-600">
                    <p>Aucune ville trouvée pour "{searchTerm}"</p>
                  </div>
                )}
                
                <div className="mt-4 text-center text-purple-600 text-sm">
                  {filteredCities.length} villes affichées
                </div>
              </div>
            </div>

            {/* Section supplémentaire : Contact rapide */}
            <div className="mt-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                📞 Contact Rapide
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:+33766145238"
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <span>📞</span>
                  +33 7 66 14 52 38
                </a>
                <a 
                  href="mailto:contact@easytaxiparis.fr"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <span>✉️</span>
                  contact@easytaxiparis.fr
                </a>
                <a 
                  href="https://wa.me/33766145238"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <span>💬</span>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Bouton de navigation */}
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                {t('sitemap.navigation.back_home')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className={`max-w-6xl mx-auto px-4 text-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} www.easytaxiparis.fr. Tous droits réservés.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Plan du site - Navigation simplifiée de toutes nos pages.
          </p>
        </div>
      </footer>
    </main>
  );
} 