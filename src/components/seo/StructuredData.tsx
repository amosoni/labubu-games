import { sampleGames } from '@/lib/gameData';
import { seoConfig } from '@/lib/seo';
import { IGame } from '@/lib/models/Game';
import Script from 'next/script';

interface StructuredDataProps {
  type?: 'website' | 'game' | 'collection';
  game?: Partial<IGame>;
  locale?: string;
}

export default function StructuredData({ type = 'website', game, locale = 'en' }: StructuredDataProps) {
  const baseUrl = seoConfig.siteUrl;
  
  if (type === 'website') {
    return (
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Labubu Game",
            "description": "Build your cute monster world and play the best games for girls!",
            "url": baseUrl,
            "inLanguage": locale,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Labubu Game",
              "url": baseUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/favicon.ico`
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Labubu Games Collection",
              "description": "Collection of cute Labubu monster games",
              "numberOfItems": sampleGames.length,
              "itemListElement": sampleGames.slice(0, 10).map((game, index) => ({
                "@type": "Game",
                "position": index + 1,
                "name": game.title,
                "description": game.description,
                "url": `${baseUrl}/${locale}/play/${game._id || game.title?.toLowerCase().replace(/\s+/g, '-')}`,
                "image": game.thumbnailUrl ? `${baseUrl}${game.thumbnailUrl}` : undefined,
                "genre": game.category,
                "gamePlatform": "Web Browser",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }))
            }
          })
        }}
      />
    );
  }

  if (type === 'game' && game) {
    return (
      <Script
        id={`ld-game-${(game._id || game.title || 'game').toString()}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            "name": game.title,
            "description": game.description,
            "url": `${baseUrl}/${locale}/play/${game._id || game.title?.toLowerCase().replace(/\s+/g, '-')}`,
            "image": game.thumbnailUrl ? `${baseUrl}${game.thumbnailUrl}` : undefined,
            "genre": game.category,
            "gamePlatform": "Web Browser",
            "operatingSystem": "Any",
            "inLanguage": locale,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Labubu Game"
            },
            "aggregateRating": game.popularity ? {
              "@type": "AggregateRating",
              "ratingValue": game.popularity / 20, // 转换为5星制
              "ratingCount": 100 + (game.popularity || 0),
              "bestRating": 5,
              "worstRating": 1
            } : undefined
          })
        }}
      />
    );
  }

  if (type === 'collection') {
    return (
      <Script
        id="ld-collection"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Labubu Games Collection",
            "description": "Complete collection of Labubu monster games",
            "url": `${baseUrl}/${locale}/games`,
            "inLanguage": locale,
            "mainEntity": {
              "@type": "ItemList",
              "name": "Labubu Games",
              "description": "All available Labubu games",
              "numberOfItems": sampleGames.length,
              "itemListElement": sampleGames.map((game, index) => ({
                "@type": "Game",
                "position": index + 1,
                "name": game.title,
                "description": game.description,
                "url": `${baseUrl}/${locale}/play/${game._id || game.title?.toLowerCase().replace(/\s+/g, '-')}`,
                "image": game.thumbnailUrl ? `${baseUrl}${game.thumbnailUrl}` : undefined,
                "genre": game.category
              }))
            }
          })
        }}
      />
    );
  }

  return null;
}
