
import React from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center h-16 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="font-bold text-lg text-slate-100">{game.title}</h2>
            <p className="text-xs text-indigo-400 font-medium">{game.category}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700">
             <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
             </svg>
             Favorite
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-sm font-bold transition-colors">
            Share
          </button>
        </div>
      </header>
      
      <main className="flex-1 relative bg-black flex items-center justify-center">
        <div className="w-full h-full max-w-6xl max-h-[85vh] shadow-2xl shadow-indigo-500/10">
          <iframe 
            src={game.iframeUrl}
            className="w-full h-full border-0 rounded-md"
            allowFullScreen
            title={game.title}
          />
        </div>
      </main>
      
      <footer className="bg-slate-900 border-t border-slate-800 p-6 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-slate-100 mb-2">Description</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              {game.description}
            </p>
          </div>
          <div className="md:w-64 space-y-4">
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
               <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Plays</div>
               <div className="text-xl font-bold text-slate-100">{game.plays}</div>
             </div>
             <div className="flex gap-2">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-xs text-center border border-slate-700 transition-colors">Report Bug</button>
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-xs text-center border border-slate-700 transition-colors">Controls</button>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GamePlayer;
