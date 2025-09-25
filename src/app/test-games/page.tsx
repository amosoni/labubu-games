'use client';

import { sampleGames } from '@/lib/gameData';
import { IGame } from '@/lib/models/Game';

export default function TestGamesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Test Games Display</h1>
      
      <div className="mb-4">
        <p>Total games: {sampleGames.length}</p>
        <p>Featured games: {sampleGames.filter(g => g.featured).length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleGames.slice(0, 12).map((game: Partial<IGame>, index: number) => {
          const gameId = game.title?.toLowerCase().replace(/\s+/g, '-') || `game-${index}`;
          return (
            <div
              key={gameId}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="aspect-video mb-4 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                  alt={game.title || ''}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/Labubu-Merge.jpg';
                  }}
                />
              </div>
              <h3 className="font-bold text-lg mb-2">{game.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{game.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {game.category}
                </span>
                <span className="text-xs text-gray-500">
                  {game.popularity || 0}%
                </span>
              </div>
              {game.featured && (
                <div className="mt-2">
                  <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                    Featured
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
