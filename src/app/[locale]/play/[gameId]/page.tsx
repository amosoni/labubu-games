import { Metadata } from 'next';
import Link from 'next/link';
import { sampleGames } from '@/lib/gameData';
import GamePageClient from './GamePageClient';

interface GamePageProps {
  params: Promise<{ locale: string; gameId: string }>;
}

// 生成元数据 - 简化版本
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  console.log('🔍 generateMetadata called!');
  
  try {
    const resolvedParams = await params;
    const gameId = resolvedParams.gameId;
    const locale = resolvedParams.locale || 'en';
    console.log('🎮 generateMetadata - gameId:', gameId);
    
    // 查找游戏数据
    const game = sampleGames.find(g => {
      const titleSlug = g.title?.toLowerCase().replace(/\s+/g, '-');
      return titleSlug === gameId || g._id === gameId;
    });

    console.log('🎯 generateMetadata - found game:', game?.title);

    if (!game) {
      console.log('❌ generateMetadata - Game not found');
      return {
        title: 'Game Not Found | Labubu Games',
        description: 'The requested game could not be found.',
      };
    }

    const gameTitle = game.title || 'Labubu Game';
    const gameDescription = game.description || 'Play this amazing Labubu game and have fun!';
    const gameImage = game.thumbnailUrl || '/images/Labubu-Merge.jpg';

    const fullTitle = `${gameTitle} - Play Online | Labubu Games`;
    console.log('📝 generateMetadata - generated title:', fullTitle);

    const canonicalPath = `/${locale}/play/${gameId}`;
    return {
      title: { absolute: fullTitle },
      description: `${gameDescription} Play ${gameTitle} online for free at Labubu Games.`,
      keywords: [
        'labubu', 'labubu games', 'cute games', 'girls games', 'kawaii',
        gameTitle.toLowerCase(), 'browser game', 'play online'
      ],
      alternates: {
        canonical: canonicalPath,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: fullTitle,
        description: gameDescription,
        url: canonicalPath,
        siteName: 'Labubu Games',
        images: [
          {
            url: gameImage,
            width: 1200,
            height: 630,
            alt: fullTitle,
          }
        ],
        locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: `${gameDescription}`,
        images: [gameImage],
        creator: '@labubugames',
        site: '@labubugames',
      },
    };
  } catch (error) {
    console.error('❌ Error in generateMetadata:', error);
    return {
      title: 'Labubu Games - Play Online',
      description: 'Play amazing Labubu games online for free!',
    };
  }
}

// 强制动态渲染，避免 dev 模式下 static-paths worker 触发第三方 vendor chunk 加载问题
export const dynamic = 'force-dynamic';

export default async function GamePage({ params }: GamePageProps) {
  try {
    const resolvedParams = await params;
    const locale = resolvedParams.locale || 'en';
    const gameId = resolvedParams.gameId;
    
    // 查找游戏数据
    const game = sampleGames.find(g => {
      const titleSlug = g.title?.toLowerCase().replace(/\s+/g, '-');
      return titleSlug === gameId || g._id === gameId;
    });

    if (!game) {
  return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Game not found</h1>
            <Link href={`/${locale}/games`} className="text-pink-500 hover:text-pink-600">
              ← Back to Games
            </Link>
          </div>
        </div>
      );
    }

    // JSON-LD: Game structured data
    const jsonLdGame = {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: game.title,
      description: game.description,
      image: game.thumbnailUrl || '/images/Labubu-Merge.jpg',
      genre: game.category,
      url: `https://labubugame.app/${locale}/play/${gameId}`,
      publisher: {
        '@type': 'Organization',
        name: 'Labubu Games'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        ratingCount: 892
      }
    } as const;

    // JSON-LD: Breadcrumb
    const jsonLdBreadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://labubugame.app/${locale}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Games',
          item: `https://labubugame.app/${locale}/games`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: game.title,
          item: `https://labubugame.app/${locale}/play/${gameId}`
        }
      ]
    } as const;

    return (
      <>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGame) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <GamePageClient game={game} locale={locale} gameId={gameId} />
      </>
    );
  } catch (error) {
    console.error('Error in GamePage:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error loading game</h1>
          <Link href="/en/games" className="text-pink-500 hover:text-pink-600">
            ← Back to Games
                  </Link>
      </div>
    </div>
  );
  }
} 