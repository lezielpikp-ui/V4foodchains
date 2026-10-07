import React from 'react';
import { X, CheckCircle2, Circle, Award, ArrowRight, Sparkles } from 'lucide-react';
import { CURRICULUM_OBJECTIVES } from '../data/ecosystemData';
import { ObjectiveProgress } from '../types/ecosystem';
import { soundFx } from '../utils/audio';

interface ObjectiveTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  progress: ObjectiveProgress;
  onNavigateToTab: (tab: string) => void;
}

export const ObjectiveTracker: React.FC<ObjectiveTrackerProps> = ({
  isOpen,
  onClose,
  progress,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const completedCount = Object.values(progress).filter(Boolean).length;
  const isMaster = completedCount === 7;

  const getObjectiveDestination = (id: number): string => {
    switch (id) {
      case 1:
        return 'sun-lab';
      case 2:
        return 'sun-lab';
      case 3:
        return 'predator-prey';
      case 4:
        return 'predator-prey';
      case 5:
        return 'learn';
      case 6:
        return 'crafter';
      case 7:
        return 'sandbox';
      default:
        return 'learn';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-emerald-900/10 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Curriculum Objectives Tracker</h2>
              <p className="text-xs text-emerald-200 font-medium">
                Primary Science Mastery Checklist (Singapore & International Standards)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score & Progress Summary */}
        <div className="px-6 py-4 bg-emerald-50/60 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Your Learning Progress
            </div>
            <div className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="tabular-nums">{completedCount} of 7</span> Objectives Mastered
              {isMaster && (
                <span className="text-xs bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Junior Ecologist Master!
                </span>
              )}
            </div>
          </div>

          <div className="w-full sm:w-48 bg-emerald-200/60 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completedCount / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Objectives List */}
        <div className="p-6 overflow-y-auto space-y-3.5 divide-y divide-slate-100">
          {CURRICULUM_OBJECTIVES.map((obj) => {
            const isCompleted = progress[obj.id as keyof ObjectiveProgress];
            const targetTab = getObjectiveDestination(obj.id);

            return (
              <div key={obj.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Objective {obj.id}
                      </span>
                      {isCompleted && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Mastered ★
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{obj.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{obj.summary}</p>
                    <div className="mt-1.5 text-[11px] text-emerald-800/80 bg-emerald-50/70 p-1.5 rounded-md">
                      <strong>Exam Key:</strong> {obj.keyConcept}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                    onNavigateToTab(targetTab);
                  }}
                  className="shrink-0 mt-1 flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/60 hover:bg-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Close & Keep Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
