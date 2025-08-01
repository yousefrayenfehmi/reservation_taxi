import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import GoogleTagManager from '@/components/GoogleTagManager';
import GoogleAdsEvents from '@/components/GoogleAdsEvents';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Taxi Reservation',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Service de réservation de taxi professionnel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html lang={process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'fr'}>
      <head>
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {googleAdsId && <GoogleAdsEvents conversionId={googleAdsId} />}

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17368565564"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17368565564');
            `,
          }}
        />

        <link rel="icon" href="logo_paris.png" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
