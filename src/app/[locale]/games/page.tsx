'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Filter } from 'lucide-react';
import { sampleGames } from '@/lib/gameData';
import SearchBar from '@/components/ui/SearchBar';
import GameGrid from '@/components/ui/GameGrid';

interface GamesPageProps {
  params: Promise<{ locale: string }>;
}

export default function GamesPage({ params }: GamesPageProps) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [games] = useState(sampleGames);
  const [filteredGames, setFilteredGames] = useState(sampleGames);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let filtered = games;

    if (selectedCategory) {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(game => 
        game.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredGames(filtered);
  }, [games, selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Play size={64} className="mx-auto mb-4 text-primary animate-bounce" />
        <p className="text-lg">Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <Play className="inline mr-4 text-primary" />
            All Games
          </h1>
          <p className="text-xl text-white text-opacity-90">
            Discover amazing games in our cute monster world!
          </p>
        </motion.div>

        {/* Search and Filters */}
        <SearchBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          selectedCategory={selectedCategory}
        />

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <p className="text-white text-lg">
            {filteredGames.length === 0 ? (
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                No games found. Try different search terms! 🔍
              </span>
            ) : (
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                Found {filteredGames.length} awesome games! 🎮
              </span>
            )}
          </p>
        </motion.div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <GameGrid games={filteredGames} locale={locale} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white bg-opacity-90 rounded-xl p-12 max-w-md mx-auto">
              <Filter size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No games found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter to find more games!
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="bg-gradient-cute text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}