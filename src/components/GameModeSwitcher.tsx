import React from 'react';
import { BookOpen, Link2, Swords, Sun, AlertTriangle, Award, Sparkles, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface GameModeSwitcherProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const GameModeSwitcher: React.FC<GameModeSwitcherProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const gameModes = [
    {
      id: 'learn',
      title: 'Concept Hub',
      badge: 'Core Lessons',
      objective: 'Obj 1–5',
      emoji: '🌿',
      icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
      colorClass: 'emerald',
      activeBorder: 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/60',
      tagColor: 'text-emerald-800 bg-emerald-100/70',
      description: 'Sun energy, producers, consumers & arrow rules',
    },
    {
      id: 'crafter',
      title: 'Chain Crafter',
      badge: '5 Habitats',
      objective: 'Obj 5 & 6',
      emoji: '🔗',
      icon: <Link2 className="w-4 h-4 text-teal-600" />,
      colorClass: 'teal',
      activeBorder: 'border-teal-600 ring-2 ring-teal-500/20 bg-teal-50/60',
      tagColor: 'text-teal-800 bg-teal-100/70',
      description: 'Slot living creatures into valid food chains',
    },
    {
      id: 'predator-prey',
      title: 'Predator vs Prey',
      badge: 'Arena & Clues',
      objective: 'Obj 3 & 4',
      emoji: '🦅',
      icon: <Swords className="w-4 h-4 text-rose-600" />,
      colorClass: 'rose',
      activeBorder: 'border-rose-600 ring-2 ring-rose-500/20 bg-rose-50/60',
      tagColor: 'text-rose-800 bg-rose-100/70',
      description: 'Hunter vs hunted classification & eye placement',
    },
    {
      id: 'sun-lab',
      title: 'Sun Energy Lab',
      badge: 'Interactive Lab',
      objective: 'Obj 1 & 2',
      emoji: '☀️',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      colorClass: 'amber',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/60',
      tagColor: 'text-amber-800 bg-amber-100/70',
      description: 'Virtual chloroplasts, solar sugars & grazing',
    },
    {
      id: 'sandbox',
      title: 'Ecosystem Shock',
      badge: '10 Mysteries',
      objective: 'Obj 7',
      emoji: '⚡',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      colorClass: 'amber',
      activeBorder: 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/60',
      tagColor: 'text-amber-900 bg-amber-100/70',
      description: 'Simulate droughts, invasive species & cascades',
    },
    {
      id: 'quiz',
      title: 'Mastery Quiz',
      badge: 'Exam Challenge',
      objective: 'Final Exam',
      emoji: '🏆',
      icon: <Award className="w-4 h-4 text-purple-600" />,
      colorClass: 'purple',
      activeBorder: 'border-purple-600 ring-2 ring-purple-500/20 bg-purple-50/60',
      tagColor: 'text-purple-800 bg-purple-100/70',
      description: '10 randomized questions + printable diploma',
    },
  ];

  return (
    <nav aria-label="Game Mode Switcher" className="mb-6">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Game Modes & Interactive Learning Hub
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-400 font-medium">
            (Select any mode to play)
          </span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>6 Active Modes</span>
        </span>
      </div>

      {/* Game Mode Cards Grid with Hover Lift and Scale */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {gameModes.map((mode) => {
          const isActive = activeTab === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(mode.id);
              }}
              className={`group text-left p-3 sm:p-3.5 rounded-2xl border cursor-pointer select-none relative overflow-hidden transform transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.03] active:translate-y-0 active:scale-[0.98] ${
                isActive
                  ? `${mode.activeBorder} shadow-md`
                  : 'bg-white hover:bg-slate-50/90 border-slate-200/90 hover:border-emerald-300/80 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Active Indicator Bar on top */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />
              )}

              {/* Card Header: Icon + Objective Tag */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'bg-white shadow-xs' : 'bg-slate-100 group-hover:bg-white'
                  }`}
                >
                  <span>{mode.emoji}</span>
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-tight ${mode.tagColor}`}
                >
                  {mode.objective}
                </span>
              </div>

              {/* Title & Badge */}
              <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-950 transition-colors">
                {mode.title}
              </h3>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-700 transition-colors">
                {mode.badge}
              </p>

              {/* Micro Description */}
              <p className="hidden md:block text-[9px] text-slate-400 line-clamp-1 mt-1 group-hover:text-slate-500 transition-colors">
                {mode.description}
              </p>

              {/* Active Glow Subtle Accent */}
              {isActive && (
                <div className="mt-2 pt-1 border-t border-emerald-900/10 flex items-center justify-between text-[9px] font-bold text-emerald-800">
                  <span>PLAYING NOW</span>
                  <ChevronRight className="w-3 h-3 text-emerald-700 animate-pulse" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
