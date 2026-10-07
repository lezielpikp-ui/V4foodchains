/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ObjectiveTracker } from './components/ObjectiveTracker';
import { LearnZone } from './components/LearnZone';
import { ChainCrafterGame } from './components/ChainCrafterGame';
import { PredatorPreyGame } from './components/PredatorPreyGame';
import { PhotosynthesisLab } from './components/PhotosynthesisLab';
import { EcosystemSandbox } from './components/EcosystemSandbox';
import { MasteryQuiz } from './components/MasteryQuiz';
import { GameModeSwitcher } from './components/GameModeSwitcher';
import { Footer } from './components/Footer';
import { ObjectiveProgress } from './types/ecosystem';
import { soundFx } from './utils/audio';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('learn');
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [recentUnlockedObj, setRecentUnlockedObj] = useState<number | null>(null);

  const [progress, setProgress] = useState<ObjectiveProgress>(() => {
    try {
      const saved = localStorage.getItem('ecochains_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // Local storage fallback
    }
    return {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('ecochains_progress', JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  const handleObjectiveAchieved = (objId: number) => {
    if (!progress[objId as keyof ObjectiveProgress]) {
      soundFx.playStar();
      setProgress((prev) => ({ ...prev, [objId]: true }));
      setRecentUnlockedObj(objId);
      setTimeout(() => {
        setRecentUnlockedObj(null);
      }, 4500);
    }
  };

  const handleAllCompleted = () => {
    setProgress({
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
    });
  };

  const starsCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-emerald-950/[0.02]">
      {/* 3-Zone Clean Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        starsCount={starsCount}
        onOpenTracker={() => setIsTrackerOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Unlocked Toast Notification */}
        {recentUnlockedObj && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block">
                  Curriculum Mastery Unlocked!
                </span>
                <span className="text-sm font-extrabold text-white">
                  You mastered Objective {recentUnlockedObj}! ★
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsTrackerOpen(true)}
              className="text-xs font-bold bg-white text-emerald-950 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              View Progress
            </button>
          </div>
        )}

        {/* Game Mode Cards Switcher with Hover Lift & Scale */}
        <GameModeSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Router */}
        {activeTab === 'learn' && (
          <LearnZone
            onObjectiveAchieved={handleObjectiveAchieved}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'crafter' && (
          <ChainCrafterGame onObjectiveAchieved={handleObjectiveAchieved} />
        )}

        {activeTab === 'predator-prey' && (
          <PredatorPreyGame onObjectiveAchieved={handleObjectiveAchieved} />
        )}

        {activeTab === 'sun-lab' && (
          <PhotosynthesisLab onObjectiveAchieved={handleObjectiveAchieved} />
        )}

        {activeTab === 'sandbox' && (
          <EcosystemSandbox onObjectiveAchieved={handleObjectiveAchieved} />
        )}

        {activeTab === 'quiz' && (
          <MasteryQuiz
            onObjectiveAchieved={handleObjectiveAchieved}
            onAllCompleted={handleAllCompleted}
          />
        )}
      </main>

      {/* Curriculum Objective Tracker Modal */}
      <ObjectiveTracker
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        progress={progress}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />

      {/* Clean Footer */}
      <Footer
        onNavigateToTab={(tab) => setActiveTab(tab)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />
    </div>
  );
}
