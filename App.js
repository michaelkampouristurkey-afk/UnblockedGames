
import React, { useState, useMemo } from 'react';
import { GAMES_DATA } from './data/games.js';
import GameCard from './components/GameCard.js';
import GamePlayer from './components/GamePlayer.js';

const CATEGORIES = ['All', 'Action', 'Arcade', 'Puzzle', 'Sports', 'Strategy', 'Adventure'];

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredGame = GAMES_DATA[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-xl">N</div>
            <h1 className="font-black text-xl tracking-tighter hidden sm:block">NEXUS<span className="text-indigo-500">ARCADE</span></h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <input 
              type="text" 
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-4 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Popular</a>
              <a href="#" className="hover:text-white transition-colors">Newest</a>
              <a href="#" className="hover:text-white transition-colors">Help</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Featured Section */}
        {!searchQuery && selectedCategory === 'All' && featuredGame && (
          <section className="mb-12">
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setSelectedGame(featuredGame)}>
              <img 
                src={featuredGame.thumbnail} 
                alt="Featured Game" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
                <span className="bg-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block tracking-widest">Featured</span>
                <h2 className="text-4xl font-black mb-2 leading-tight">{featuredGame.title}</h2>
                <p className="text-slate-300 mb-6 line-clamp-2">{featuredGame.description}</p>
                <div className="flex gap-3">
                  <button className="bg-white text-slate-950 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">Play Now</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Bar */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {searchQuery ? `Search results for "${searchQuery}"` : `${selectedCategory} Games`}
              </h2>
              <p className="text-slate-500 text-sm">Showing {filteredGames.length} games available</p>
            </div>
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={setSelectedGame} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-bold">No games found</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-6 text-indigo-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Game Player Overlay */}
      {selectedGame && (
        <GamePlayer 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
}

export default App;
