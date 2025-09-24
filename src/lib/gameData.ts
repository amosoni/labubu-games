 import { IGame } from './models/Game';

export const sampleGames: Partial<IGame>[] = [
  {
    title: "Labubu Merge",
    description: "Merge cute Labubu characters to create new and exciting combinations!",
    embedUrl: "https://html5.gamedistribution.com/f4cd70935a644d7daae05b2b4db64807/?gd_sdk_referrer_url=https://www.onlinegames.io/labubu-merge/",
    thumbnailUrl: "/images/Labubu-Merge.jpg",
    category: "puzzle",
    tags: ["labubu", "merge", "puzzle", "cute"],
    language: "en",
    featured: true,
    popularity: 95,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    title: "Labubu Doll Mukbang ASMR",
    description: "Watch Labubu enjoy delicious food in this relaxing ASMR experience!",
    embedUrl: "https://www.twoplayergames.org/gameframe/labubu-doll-mukbang-asmr?embed=1",
    thumbnailUrl: "/images/Labubu-Doll-Mukbang-Asmr.jpg",
    category: "simulation",
    tags: ["labubu", "asmr", "mukbang", "relaxing"],
    language: "en",
    featured: true,
    popularity: 88,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    title: "Labubu Merge 1",
    description: "Another version of the popular Labubu merge game!",
    embedUrl: "https://html5.gamedistribution.com/rvvASMiM/3bd8d990c6294379a7755f938a4944b4/index.html",
    thumbnailUrl: "/images/Labubu-Merge-1.webp",
    category: "puzzle",
    tags: ["labubu", "merge", "puzzle", "cute"],
    language: "en",
    featured: false,
    popularity: 82,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

// 获取特色游戏
export function getFeaturedGames(): Partial<IGame>[] {
  return sampleGames.filter(game => game.featured);
}

// 获取新游戏
export function getNewGames(): Partial<IGame>[] {
  return sampleGames.slice(0, 6);
}

// 根据分类获取游戏
export function getGamesByCategory(category: string): Partial<IGame>[] {
  return sampleGames.filter(game => game.category === category);
}

// 根据网络速度选择游戏
interface NetworkConnection {
  effectiveType: string;
}

export function getGamesByNetworkSpeed(): Partial<IGame>[] {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return sampleGames;
  }
  
  const connection = (navigator as unknown as { connection?: NetworkConnection }).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return sampleGames.filter(game => {
        const gameWithLoadTime = game as IGame & { loadTime?: number };
        return gameWithLoadTime.loadTime && gameWithLoadTime.loadTime <= 5;
      });
    }
  }
  return sampleGames;
}

// 搜索游戏
export function searchGames(query: string): Partial<IGame>[] {
  const lowercaseQuery = query.toLowerCase();
  return sampleGames.filter(game => 
    game.title?.toLowerCase().includes(lowercaseQuery) ||
    game.description?.toLowerCase().includes(lowercaseQuery) ||
    game.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}