import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/seo/StructuredData';
import { seoConfig } from '@/lib/seo';
import { Metadata } from 'next';
import Script from 'next/script';

const locales = ['en', 'es', 'fr'];

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  title: {
    default: 'Labubu Game - Cute Monster Games for Girls',
    template: '%s | Labubu Game'
  },
  description: 'Build your cute monster world and play the best games for girls! Dress-up, makeup, simulation, and more kawaii games. Free online browser games.',
  keywords: ['labubu', 'cute games', 'girls games', 'monster games', 'dress up', 'makeup', 'kawaii', 'online games', 'browser games', 'free games'],
  authors: [{ name: 'Labubu Game Team' }],
  creator: 'Labubu Game',
  publisher: 'Labubu Game',
  alternates: {
    canonical: seoConfig.siteUrl,
    languages: Object.fromEntries(locales.map(l => [l, `${seoConfig.siteUrl}/${l}`]))
  },
  openGraph: {
    title: 'Labubu Game - Cute Monster Games for Girls',
    description: 'Build your cute monster world and play the best games for girls!',
    type: 'website',
    locale: 'en_US',
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: '/images/The-World-of-Labubu.jpg',
        width: 1200,
        height: 630,
        alt: 'Labubu Games - Cute Monster Games',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labubu Game - Cute Monster Games for Girls',
    description: 'Build your cute monster world and play the best games for girls!',
    images: ['/images/The-World-of-Labubu.jpg']
  },
  verification: {
    google: seoConfig.googleVerification,
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
      <head>
        {/* Google Search Console 验证 - 直接放在 head 中 */}
        <meta name="google-site-verification" content="dbc97d323fee3928" />
        
        {/* Google Analytics - 必须在 <head> 部分用于验证 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LGK50XTFZQ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LGK50XTFZQ', {
              send_page_view: true
            });
          `
        }} />
        {/* 结构化数据 */}
        <StructuredData type="website" locale={locale} />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-rainbow">
          <Navbar locale={locale} />
          <main className="pb-16">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}