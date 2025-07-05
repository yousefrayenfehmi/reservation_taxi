import Script from 'next/script';

interface GoogleAdsEventsProps {
  conversionId: string;
}

const GoogleAdsEvents: React.FC<GoogleAdsEventsProps> = ({ conversionId }) => {
  return (
    <Script
      id="google-ads-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');

          // Fonction pour envoyer des événements de conversion
          window.sendGoogleAdsEvent = function(eventName, eventParams = {}) {
            gtag('event', 'conversion', {
              'send_to': '${conversionId}/' + eventName,
              ...eventParams
            });
          };
        `,
      }}
    />
  );
};

export default GoogleAdsEvents; 