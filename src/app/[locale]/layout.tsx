import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import Script from 'next/script';

const locales = ['en', 'es', 'fr'];

export const metadata: Metadata = {
  metadataBase: new URL('https://labubugame.app'),
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/favicon.ico'
  },
  title: 'Labubu Game - Cute Monster Games for Girls',
  description: 'Build your cute monster world and play the best games for girls! Dress-up, makeup, simulation, and more kawaii games.',
  keywords: 'labubu, cute games, girls games, monster games, dress up, makeup, kawaii',
  alternates: {
    canonical: `https://labubugame.app`,
    languages: Object.fromEntries(locales.map(l => [l, `https://labubugame.app/${l}`]))
  },
  openGraph: {
    title: 'Labubu Game - Cute Monster Games for Girls',
    description: 'Build your cute monster world and play the best games for girls!',
    type: 'website',
    locale: 'en'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labubu Game - Cute Monster Games for Girls',
    description: 'Build your cute monster world and play the best games for girls!'
  }
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div className="min-h-screen bg-gradient-rainbow">
          <Navbar locale={locale} />
          <main className="pb-16">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LGK50XTFZQ" strategy="afterInteractive" />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-LGK50XTFZQ');
          `}
        </Script>
      </body>
    </html>
  );
}