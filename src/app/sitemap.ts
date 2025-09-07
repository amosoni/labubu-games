import { MetadataRoute } from 'next';
import { sampleGames } from '@/lib/gameData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://labubu-games.vercel.app';
  const locales = ['en', 'es', 'fr'];
  
  const staticPages = [
    '',
    '/games',
    '/community',
    '/users',
    '/about',
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  locales.forEach(locale => {
    staticPages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  // Add game play pages for each locale
  locales.forEach(locale => {
    sampleGames.forEach(game => {
      const gameId = game._id || game.title?.toLowerCase().replace(/\s+/g, '-');
      if (gameId) {
        urls.push({
          url: `${baseUrl}/${locale}/play/${gameId}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    });
  });

  return urls;
}