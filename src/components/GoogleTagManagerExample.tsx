'use client';

import React, { useEffect, useState } from 'react';

const GoogleTagManagerExample: React.FC = () => {
  // Récupération de l'ID GTM
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Exemple d'utilisation dans une fonction
  const handleEvent = () => {
    if (gtmId) {
      // Accès à dataLayer
      (window as any).dataLayer?.push({
        event: 'custom_event',
        eventCategory: 'User Interaction',
        eventAction: 'Click',
      });
    }
  };

  return (
    <div>
      {/* Affichage conditionnel basé sur la présence de GTM_ID */}
      {gtmId ? (
        <button 
          onClick={handleEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Déclencher un événement GTM
        </button>
      ) : (
        <p className="text-red-500">GTM n'est pas configuré</p>
      )}
    </div>
  );
};

export default GoogleTagManagerExample; 