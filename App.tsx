
import React, { useState, useMemo } from 'react';
import { GAMES_DATA } from './data/games';
import { Game, Category } from './types';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';

const CATEGORIES: Category[] = ['All', 'Action', 'Arcade', 'Puzzle', 'Sports', 'Strategy', 'Adventure'];

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
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
            <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Featured Section (only show on home/all) */}
        {!searchQuery && selectedCategory === 'All' && (
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
                  <button className="bg-slate-900/50 backdrop-blur-md border border-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">Details</button>
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
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-lg">
               <button className="p-1.5 rounded bg-slate-800 text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
               <button className="p-1.5 rounded text-slate-600 hover:bg-slate-800 hover:text-slate-400 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg></button>
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
              <p className="text-sm">Try adjusting your filters or search query.</p>
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-xl">N</div>
                <h1 className="font-black text-xl tracking-tighter">NEXUS<span className="text-indigo-500">ARCADE</span></h1>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Nexus Arcade is a modern unblocked games portal designed for schools and restricted environments. 
                We provide a clean, ad-free-feeling experience with the best hand-picked games from across the web.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-200 uppercase text-xs tracking-widest">Categories</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Action Games</a></li>
                <li><a href="#" className="hover:text-indigo-400">Puzzle Games</a></li>
                <li><a href="#" className="hover:text-indigo-400">Racing Games</a></li>
                <li><a href="#" className="hover:text-indigo-400">Strategy Games</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-200 uppercase text-xs tracking-widest">Support</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400">Report Game</a></li>
                <li><a href="#" className="hover:text-indigo-400">Submit Game</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs">
            <p>© 2024 Nexus Arcade. All rights reserved.</p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-slate-400 transition-colors uppercase tracking-widest font-bold">Discord</a>
               <a href="#" className="hover:text-slate-400 transition-colors uppercase tracking-widest font-bold">Twitter</a>
               <a href="#" className="hover:text-slate-400 transition-colors uppercase tracking-widest font-bold">Github</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
