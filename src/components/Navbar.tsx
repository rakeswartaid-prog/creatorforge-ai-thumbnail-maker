import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onExportClick }) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand title wordmark */}
      <a
        href="#studio"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('studio');
        }}
        className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 flex items-center gap-2.5"
      >
        <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm transform rotate-45 inline-block" />
        CreatorForge <span className="text-xs text-slate-400 font-normal font-mono">v1.0</span>
      </a>

      {/* Zone 2: Concise single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('studio')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'studio' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('captions')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'captions' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          AI Captions
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'templates' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('scheduler')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'scheduler' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Scheduler
        </button>
        <button
          onClick={() => setActiveTab('feed-simulator')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'feed-simulator' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Feed Simulator
        </button>
        <button
          onClick={() => setActiveTab('strategy')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'strategy' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Strategy
        </button>
        <button
          onClick={() => setActiveTab('unit-economics')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'unit-economics' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Economics
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onExportClick}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          Export 1080p
        </button>
      </div>
    </header>
  );
};
