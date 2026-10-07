import React from 'react';
import { Volume2, VolumeX, Award, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  starsCount: number;
  onOpenTracker: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  starsCount,
  onOpenTracker,
  isMuted,
  setIsMuted,
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
    if (!next) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { id: 'learn', label: 'Concept Hub' },
    { id: 'crafter', label: 'Chain Crafter' },
    { id: 'predator-prey', label: 'Predator vs Prey' },
    { id: 'sun-lab', label: 'Sun Energy Lab' },
    { id: 'sandbox', label: 'Ecosystem Shock' },
    { id: 'quiz', label: 'Mastery Quiz' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTab('learn');
          }}
          className="text-left group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-emerald-950 block leading-tight">
              EcoChains
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block leading-none">
              Primary Science Quest
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(link.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95 ${
                  isActive
                    ? 'bg-emerald-100/90 text-emerald-950 shadow-xs ring-1 ring-emerald-600/30 font-bold scale-[1.02]'
                    : 'text-slate-600 hover:text-emerald-950 hover:bg-slate-100/90 hover:shadow-xs'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Mute + Quest Tracker) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="p-2 text-slate-600 hover:text-emerald-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTracker();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-emerald-950 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-lg transition-all shadow-xs group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
            <span className="tabular-nums font-mono font-bold text-amber-900">
              {starsCount}/7
            </span>
            <span className="hidden sm:inline text-amber-900/80 font-medium">Objectives</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Scroll */}
      <div className="lg:hidden flex overflow-x-auto py-2 px-4 gap-1.5 border-t border-slate-100 no-scrollbar">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(link.id);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs font-bold scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
