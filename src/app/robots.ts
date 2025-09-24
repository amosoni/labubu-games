import { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = seoConfig.siteUrl;
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}