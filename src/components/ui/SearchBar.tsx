'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  selectedCategory?: string;
}

export default function SearchBar({ onSearch, onCategoryFilter, selectedCategory = '' }: SearchBarProps) {
  // 直接使用硬编码的文本，不再依赖next-intl
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'dress-up', 'makeup', 'simulation', 'nurturing', 
    'adventure', 'puzzle', 'romance', 'monster'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <motion.button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-lg border flex items-center gap-2 transition-all ${
            showFilters 
              ? 'bg-primary text-white border-primary' 
              : 'border-gray-200 text-gray-600 hover:border-primary'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter size={20} />
          Categories
        </motion.button>
      </form>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showFilters ? 'auto' : 0, 
          opacity: showFilters ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onCategoryFilter('')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === '' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all capitalize ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}