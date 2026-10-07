import React from 'react';
import { Leaf } from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tab: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTab, onOpenTracker }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80 backdrop-blur-xs py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block leading-tight">
              EcoChains Primary Science Suite
            </span>
            <span className="text-xs text-slate-500 block">
              Aligned with Primary Science Curriculum Standards (Living Systems & Energy)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
          <button
            onClick={() => onNavigateToTab('learn')}
            className="hover:text-emerald-800 transition-colors"
          >
            Concepts Hub
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigateToTab('crafter')}
            className="hover:text-emerald-800 transition-colors"
          >
            Chain Crafter
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigateToTab('predator-prey')}
            className="hover:text-emerald-800 transition-colors"
          >
            Predator vs Prey
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigateToTab('sun-lab')}
            className="hover:text-emerald-800 transition-colors"
          >
            Sun Energy Lab
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigateToTab('sandbox')}
            className="hover:text-emerald-800 transition-colors"
          >
            Ecosystem Shockwave
          </button>
          <span>·</span>
          <button
            onClick={onOpenTracker}
            className="hover:text-emerald-800 transition-colors"
          >
            Curriculum Tracker
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Made for inquisitive young minds & primary science learners.
        </div>
      </div>
    </footer>
  );
};
