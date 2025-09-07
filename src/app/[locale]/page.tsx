'use client';

import { useState, useEffect } from 'react';
// Removed framer-motion on homepage to avoid vendor chunk runtime issues
import { Search, Filter, Heart, Star, Eye, Clock, Users, ChevronDown } from 'lucide-react';
import MonsterIcon from '@/components/ui/MonsterIcon';
import { sampleGames } from '@/lib/gameData';
import { IGame } from '@/lib/models/Game';
// NOTE: 首页是客户端组件，元数据在 layout 里全局提供

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage({ params }: HomePageProps) {
  const [locale, setLocale] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const getLocale = async () => {
      try {
        const resolvedParams = await params;
        setLocale(resolvedParams.locale);
      } catch (error) {
        console.error('Error resolving params:', error);
        setLocale('en');
      }
    };
    getLocale();
  }, [params]);

  const categories = [
    { id: 'all', name: 'All Games', icon: '🎮' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'simulation', name: 'Simulation', icon: '🏠' },
    { id: 'dress-up', name: 'Dress Up', icon: '👗' },
    { id: 'makeup', name: 'Makeup', icon: '💄' },
    { id: 'nurturing', name: 'Nurturing', icon: '👶' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
    { id: 'romance', name: 'Romance', icon: '💕' },
    { id: 'monster', name: 'Monster', icon: '👹' },
  ];

  const sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'newest', name: 'Newest' },
    { id: 'alphabetical', name: 'A-Z' },
  ];

  useEffect(() => {
    const savedFavorites = localStorage.getItem('labubu-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (gameId: string) => {
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter(id => id !== gameId)
      : [...favorites, gameId];
    setFavorites(newFavorites);
    localStorage.setItem('labubu-favorites', JSON.stringify(newFavorites));
  };

  const filteredGames = sampleGames.filter((game: Partial<IGame>) => {
    const matchesSearch = game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a: Partial<IGame>, b: Partial<IGame>) => {
    switch (sortBy) {
      case 'popularity':
        return (b.popularity || 0) - (a.popularity || 0);
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case 'alphabetical':
        return (a.title || '').localeCompare(b.title || '');
      default:
        return 0;
    }
  });

  // Pick a featured game for the hero iframe
  const featuredGame = (sampleGames.find(g => g.featured) || sampleGames[0]) as Partial<IGame> | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6">
                <MonsterIcon size={48} variant="happy" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-6">
                🦄 Labubu Games
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover and play the cutest Labubu games! Merge, style, and adventure with your favorite monster.
              </p>
            </div>

            {/* Hero Iframe Game */}
            {featuredGame?.embedUrl && (
              <div className="max-w-5xl mx-auto mb-10">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white">
                  <iframe
                    src={featuredGame.embedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    title={featuredGame.title || 'Featured Game'}
                  />
                </div>
                <div className="mt-3 text-gray-700">
                  <div className="font-semibold">{featuredGame.title}</div>
                  <div className="text-sm opacity-80 line-clamp-2">{featuredGame.description}</div>
                </div>
              </div>
            )}

            {/* Category Quick Nav */}
            <div className="max-w-5xl mx-auto mb-10">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((c) => (
                  <button
                    key={`nav-${c.id}`}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border ${selectedCategory === c.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-700 border-gray-200 hover:border-pink-400'}`}
                  >
                    <span className="mr-1">{c.icon}</span>{c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-pink-500 focus:outline-none shadow-lg"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Filter size={20} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          <div className={`overflow-hidden transition-all duration-300 ${showFilters ? 'opacity-100 max-h-[800px]' : 'opacity-0 max-h-0'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Categories</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="text-lg mb-1 block">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Sort By</h3>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`w-full p-3 rounded-lg text-left font-medium transition-colors ${
                          sortBy === option.id
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Rows */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* Editor's Picks */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Editor’s Picks</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {(sampleGames.filter(g => g.featured).length ? sampleGames.filter(g => g.featured) : sampleGames).slice(0, 8).map((g, idx) => {
              const slug = (g._id || g.title?.toLowerCase().replace(/\s+/g, '-') || `pick-${idx}`);
              return (
                <div key={`pick-${slug}`} className="min-w-[380px] bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex">
                  <div className="w-40 aspect-[4/3] rounded-l-xl overflow-hidden">
                    <img loading="lazy" src={g.thumbnailUrl || '/images/Labubu-Merge.jpg'} alt={g.title || ''} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="font-semibold text-gray-800 line-clamp-1">{g.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-2 mb-2 flex-1">{g.description}</div>
                    <div className="text-xs text-gray-600 mb-2">Popularity: {g.popularity || 0}%</div>
                    <button onClick={() => (window.location.href = `/${locale}/play/${slug}`)} className="w-full text-sm bg-purple-500 text-white rounded-md py-2 hover:bg-purple-600">Play</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Arrivals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">New Arrivals</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...sampleGames]
              .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
              .slice(0, 8)
              .map((g, idx) => {
                const slug = (g._id || g.title?.toLowerCase().replace(/\s+/g, '-') || `new-${idx}`);
                return (
                  <div key={`new-${slug}`} className="min-w-[380px] bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex">
                    <div className="w-40 aspect-[4/3] rounded-l-xl overflow-hidden">
                      <img loading="lazy" src={g.thumbnailUrl || '/images/Labubu-Merge.jpg'} alt={g.title || ''} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="font-semibold text-gray-800 line-clamp-1">{g.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-2 mb-2 flex-1">{g.description}</div>
                      <div className="text-xs text-gray-600 mb-2">Popularity: {g.popularity || 0}%</div>
                      <button onClick={() => (window.location.href = `/${locale}/play/${slug}`)} className="w-full text-sm bg-purple-500 text-white rounded-md py-2 hover:bg-purple-600">Play</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Trending Now */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...sampleGames]
              .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
              .slice(0, 8)
              .map((g, idx) => {
                const slug = (g._id || g.title?.toLowerCase().replace(/\s+/g, '-') || `hot-${idx}`);
                return (
                  <div key={`hot-${slug}`} className="min-w-[380px] bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex">
                    <div className="w-40 aspect-[4/3] rounded-l-xl overflow-hidden">
                      <img loading="lazy" src={g.thumbnailUrl || '/images/Labubu-Merge.jpg'} alt={g.title || ''} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="font-semibold text-gray-800 line-clamp-1">{g.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-2 mb-2 flex-1">{g.description}</div>
                      <div className="text-xs text-gray-600 mb-2">Popularity: {g.popularity || 0}%</div>
                      <button onClick={() => (window.location.href = `/${locale}/play/${slug}`)} className="w-full text-sm bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600">Play</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedCategory === 'all' ? 'All Games' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="text-pink-500 ml-2">({filteredGames.length})</span>
          </h2>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game: Partial<IGame>, index: number) => (
              <div
                key={game._id || index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => {
                  const gameId = game._id || game.title?.toLowerCase().replace(/\s+/g, '-');
                  window.location.href = `/${locale}/play/${gameId}`;
                }}
              >
                {/* Media */}
                <div className="relative">
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <img
                      src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                      alt={game.title || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Featured badge */}
                  {game.featured && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Featured
                    </span>
                  )}
                  {/* Favorite */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(game._id || '');
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow ${
                      favorites.includes(game._id || '') ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-pink-500 hover:text-white'
                    }`}
                  >
                    <Heart size={18} fill={favorites.includes(game._id || '') ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1 leading-snug line-clamp-2">{game.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{game.description}</p>

                  {/* Metrics */}
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-5">
                    <div className="flex items-center gap-1"><Eye size={16} />{game.popularity || 0}%</div>
                    <div className="flex items-center gap-1"><Clock size={16} />5-10 min</div>
                    <div className="flex items-center gap-1"><Users size={16} />1P</div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const gameId = game._id || game.title?.toLowerCase().replace(/\s+/g, '-');
                        window.location.href = `/${locale}/play/${gameId}`;
                      }}
                      className="flex-1 h-11 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:shadow-lg"
                    >
                      Play Now
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-11 h-11 rounded-xl bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600 grid place-items-center"
                      aria-label="Bookmark"
                    >
                      <Star size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 空状态 */
          <div className="text-center py-12">
            <MonsterIcon size={64} variant="happy" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Homepage SEO copy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Play Cute Labubu Games Online</h2>
          <p className="text-gray-700 leading-7">
            Discover adorable Labubu monster games for girls: dress‑up, makeup, simulation and relaxing casual gameplay.
            All games are browser‑based, free and optimized for mobile. Click any card to start playing instantly.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Why choose Labubu Games</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>No downloads • play in your browser</li>
                <li>Mobile friendly • fast loading</li>
                <li>Hand‑picked cute & relaxing titles</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Popular categories</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Dress‑up & Makeup</li>
                <li>Simulation & Nurturing</li>
                <li>Puzzle & Casual</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Tips</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Use the search bar to find your favorite theme</li>
                <li>Bookmark games you like for quick access</li>
                <li>Try related games from each game page</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}