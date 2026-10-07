import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle, ArrowRight, Sun, Award, HelpCircle, ChevronRight } from 'lucide-react';
import { FOOD_CHAIN_CHALLENGES, ORGANISMS_DATABASE } from '../data/ecosystemData';
import { soundFx } from '../utils/audio';

interface ChainCrafterGameProps {
  onObjectiveAchieved: (id: number) => void;
}

export const ChainCrafterGame: React.FC<ChainCrafterGameProps> = ({
  onObjectiveAchieved,
}) => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);
  const [validationState, setValidationState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showEnergyFlow, setShowEnergyFlow] = useState(false);

  const challenge = FOOD_CHAIN_CHALLENGES[currentChallengeIndex];
  const requiredLength = challenge.correctChainIds.length;

  // Active pool of organisms for this challenge (correct + distractors), shuffled/curated
  const poolIds = React.useMemo(() => {
    const list = [...challenge.correctChainIds, ...challenge.distractorIds];
    return list.sort(() => (challenge.id.charCodeAt(0) % 2 === 0 ? 0.5 - Math.random() : -1));
  }, [challenge]);

  // Adjust slots length to match challenge requirements
  React.useEffect(() => {
    setSlots(new Array(challenge.correctChainIds.length).fill(null));
    setValidationState('idle');
    setFeedbackMessage('');
    setShowEnergyFlow(false);
  }, [currentChallengeIndex, challenge]);

  const handleSelectPoolOrganism = (id: string) => {
    soundFx.playClick();
    // If an empty slot exists, auto-place it into the first empty slot
    const firstEmptyIndex = slots.findIndex((s) => s === null);
    if (firstEmptyIndex !== -1) {
      const nextSlots = [...slots];
      nextSlots[firstEmptyIndex] = id;
      setSlots(nextSlots);
      setValidationState('idle');
      setFeedbackMessage('');
    } else {
      setSelectedInventoryId(id);
    }
  };

  const handleClearSlot = (slotIndex: number) => {
    soundFx.playClick();
    const nextSlots = [...slots];
    nextSlots[slotIndex] = null;
    setSlots(nextSlots);
    setValidationState('idle');
    setFeedbackMessage('');
    setShowEnergyFlow(false);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (selectedInventoryId) {
      soundFx.playClick();
      const nextSlots = [...slots];
      nextSlots[slotIndex] = selectedInventoryId;
      setSlots(nextSlots);
      setSelectedInventoryId(null);
      setValidationState('idle');
      setFeedbackMessage('');
    } else if (slots[slotIndex]) {
      handleClearSlot(slotIndex);
    }
  };

  const handleCheckChain = () => {
    // Check if all slots are filled
    if (slots.some((s) => s === null)) {
      soundFx.playIncorrect();
      setValidationState('incorrect');
      setFeedbackMessage('Please fill all slots in the chain before checking!');
      return;
    }

    const currentPlacedIds = slots as string[];
    const isCorrect = currentPlacedIds.every(
      (id, idx) => id === challenge.correctChainIds[idx]
    );

    if (isCorrect) {
      soundFx.playCorrect();
      soundFx.playStar();
      setValidationState('correct');
      setShowEnergyFlow(true);
      setFeedbackMessage(
        `Brilliant! You correctly built the ${challenge.habitatName} food chain!`
      );
      if (!completedChallenges.includes(challenge.id)) {
        setCompletedChallenges([...completedChallenges, challenge.id]);
      }
      // Achieved Objective 6 (Construct a food chain) & 5 (Food chain relationships)
      onObjectiveAchieved(6);
      onObjectiveAchieved(5);
    } else {
      soundFx.playIncorrect();
      setValidationState('incorrect');

      // Specific helpful feedback for primary students
      const firstPlaced = currentPlacedIds[0];
      const firstOrg = ORGANISMS_DATABASE[firstPlaced];
      if (firstOrg && firstOrg.type !== 'producer') {
        setFeedbackMessage(
          `Remember: Every food chain must start with a PRODUCER (plant or algae) that makes food using sunlight!`
        );
      } else {
        setFeedbackMessage(
          `Not quite right yet! Check the order: Producer → Primary Consumer → Secondary Consumer → Apex Predator.`
        );
      }
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setSlots(new Array(challenge.correctChainIds.length).fill(null));
    setSelectedInventoryId(null);
    setValidationState('idle');
    setFeedbackMessage('');
    setShowEnergyFlow(false);
  };

  const handleNextChallenge = () => {
    soundFx.playClick();
    const nextIndex = (currentChallengeIndex + 1) % FOOD_CHAIN_CHALLENGES.length;
    setCurrentChallengeIndex(nextIndex);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Habitat Selector Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
            Habitats:
          </span>
          {FOOD_CHAIN_CHALLENGES.map((ch, idx) => {
            const isCurrent = idx === currentChallengeIndex;
            const isDone = completedChallenges.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentChallengeIndex(idx);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 flex items-center gap-1.5 whitespace-nowrap ${
                  isCurrent
                    ? 'bg-emerald-800 text-white shadow-xs scale-[1.02] font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:shadow-xs'
                }`}
              >
                <span>{ch.habitatName.split(' ')[0]}</span>
                {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Completed: {completedChallenges.length} / {FOOD_CHAIN_CHALLENGES.length}</span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
        {/* Habitat Backdrop Header */}
        <div className="relative aspect-16/5 min-h-[140px] sm:min-h-[170px] w-full overflow-hidden">
          <img
            src={challenge.habitatBgImage}
            alt={challenge.habitatName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Objective 6 Challenge
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {challenge.habitatName}
              </h2>
              <p className="text-xs text-slate-200 max-w-xl mt-0.5 line-clamp-1 sm:line-clamp-none">
                {challenge.description}
              </p>
            </div>
            <div className="hidden sm:block text-right text-xs text-emerald-200 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
              💡 {challenge.hint}
            </div>
          </div>
        </div>

        {/* Chain Construction Assembly Area */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
              <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>Energy starts at the Sun and flows through the food chain!</span>
            </div>
            <p className="text-xs text-slate-500">
              Click organisms below to add them to the chain. Click a slot to remove it.
            </p>
          </div>

          {/* Construction Slots with Arrows */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 min-h-[160px]">
            {/* The Sun Icon at the start */}
            <div className="flex flex-col items-center justify-center p-3 w-20 sm:w-24 h-28 sm:h-32 bg-amber-100/70 border-2 border-dashed border-amber-300 rounded-2xl text-center">
              <span className="text-3xl animate-bounce">☀️</span>
              <span className="text-[11px] font-bold text-amber-950 mt-1">The Sun</span>
              <span className="text-[9px] text-amber-800 font-medium">Solar Power</span>
            </div>

            <div className="flex items-center text-amber-600 font-bold px-1">
              <ArrowRight className={`w-5 h-5 ${showEnergyFlow ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
            </div>

            {slots.map((organismId, idx) => {
              const organism = organismId ? ORGANISMS_DATABASE[organismId] : null;
              const isLast = idx === slots.length - 1;

              const roleLabels = [
                '1. Producer',
                '2. Primary Consumer',
                '3. Secondary Consumer',
                '4. Apex Predator',
              ];

              return (
                <React.Fragment key={idx}>
                  <div
                    onClick={() => handleSlotClick(idx)}
                    className={`relative cursor-pointer transition-all flex flex-col items-center justify-between p-2.5 w-24 sm:w-28 h-28 sm:h-32 rounded-2xl border-2 ${
                      organism
                        ? 'bg-white border-emerald-500 shadow-md hover:border-rose-400'
                        : 'bg-white/60 border-dashed border-slate-300 hover:border-emerald-400 hover:bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                      {roleLabels[idx]}
                    </span>

                    {organism ? (
                      <>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden my-auto border border-emerald-300 shadow-xs flex items-center justify-center bg-emerald-50">
                          {organism.imageUrl ? (
                            <img
                              src={organism.imageUrl}
                              alt={organism.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-3xl sm:text-4xl animate-in zoom-in-50">
                              {organism.emoji}
                            </span>
                          )}
                        </div>
                        <div className="text-center w-full">
                          <span className="text-[11px] font-bold text-slate-900 block truncate">
                            {organism.name}
                          </span>
                          <span className="text-[9px] text-emerald-700 font-semibold uppercase block">
                            {organism.role.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                          ×
                        </span>
                      </>
                    ) : (
                      <div className="my-auto text-center">
                        <span className="text-xs text-slate-400 font-medium block">Drop here</span>
                        <span className="text-[10px] text-slate-400">Click to fill</span>
                      </div>
                    )}
                  </div>

                  {!isLast && (
                    <div className="flex items-center text-emerald-600 font-bold px-1">
                      <ArrowRight className={`w-5 h-5 ${showEnergyFlow ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Energy Flow Animation Banner when Correct */}
          {showEnergyFlow && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-emerald-100 to-teal-100 border border-emerald-300 animate-in fade-in space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>ENERGY FLOW ACTIVATED!</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {challenge.energyTrivia}
              </p>
            </div>
          )}

          {/* Feedback & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              {feedbackMessage && (
                <div
                  className={`text-xs font-bold p-2.5 rounded-xl border ${
                    validationState === 'correct'
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border-rose-300'
                  }`}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              {validationState === 'correct' ? (
                <button
                  onClick={handleNextChallenge}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next Habitat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCheckChain}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                >
                  Verify Food Chain
                </button>
              )}
            </div>
          </div>

          {/* Organisms Pool / Selection Tray */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Organisms (Select to place):
              </span>
              <span className="text-[11px] text-slate-500">
                Warning: Watch out for impostors from other habitats!
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {poolIds.map((orgId) => {
                const org = ORGANISMS_DATABASE[orgId];
                if (!org) return null;
                const isAlreadyPlaced = slots.includes(orgId);

                return (
                  <button
                    key={orgId}
                    disabled={isAlreadyPlaced}
                    onClick={() => handleSelectPoolOrganism(orgId)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                      isAlreadyPlaced
                        ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-emerald-50/60 border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-sm hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 border border-slate-200 flex items-center justify-center bg-slate-50">
                      {org.imageUrl ? (
                        <img
                          src={org.imageUrl}
                          alt={org.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-2xl">{org.emoji}</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-900 block truncate w-full">
                      {org.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block truncate w-full">
                      {org.scientificGroup}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-700 uppercase block mt-1">
                      {org.role.replace('_', ' ')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
