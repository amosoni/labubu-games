// SEO 配置文件
export const seoConfig = {
  siteUrl: 'https://labubugame.app',
  siteName: 'Labubu Game',
  siteDescription: 'Build your cute monster world and play the best games for girls!',
  gaId: 'G-LGK50XTFZQ',
  googleVerification: 'your-google-verification-code', // 如果需要Google Search Console验证，请替换此值
  
  // 社交媒体配置
  social: {
    twitter: '@labubugame',
    facebook: 'labubugame',
  },
  
  // 默认图片
  defaultImage: '/images/The-World-of-Labubu.jpg',
  
  // 支持的语言
  locales: ['en', 'es', 'fr'],
  
  // 默认语言
  defaultLocale: 'en',
};

// 生成规范URL
export function getCanonicalUrl(path: string = '', locale?: string): string {
  const baseUrl = seoConfig.siteUrl;
  const localePrefix = locale && locale !== seoConfig.defaultLocale ? `/${locale}` : '';
  return `${baseUrl}${localePrefix}${path}`;
}

// 生成Open Graph图片URL
export function getOgImageUrl(imagePath?: string): string {
  if (imagePath) {
    return imagePath.startsWith('http') ? imagePath : `${seoConfig.siteUrl}${imagePath}`;
  }
  return `${seoConfig.siteUrl}${seoConfig.defaultImage}`;
}
