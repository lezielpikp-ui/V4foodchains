import React, { useState } from 'react';
import { Swords, ShieldAlert, Award, RotateCcw, CheckCircle2, XCircle, Sparkles, HelpCircle, Eye } from 'lucide-react';
import { ORGANISMS_DATABASE, LION_IMAGE, HAWK_IMAGE, ZEBRA_IMAGE, FROG_IMAGE } from '../data/ecosystemData';
import { soundFx } from '../utils/audio';

interface PredatorPreyGameProps {
  onObjectiveAchieved: (id: number) => void;
}

export const PredatorPreyGame: React.FC<PredatorPreyGameProps> = ({
  onObjectiveAchieved,
}) => {
  const [activeSubMode, setActiveSubMode] = useState<'classifier' | 'adaptations'>('classifier');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{
    correct: boolean;
    text: string;
    explanation: string;
  } | null>(null);

  // List of organisms to classify
  const gameOrganismIds = [
    'hawk',
    'grass',
    'frog',
    'rabbit',
    'lion',
    'bluebird',
    'caterpillar',
    'pondweed',
    'great_white_shark',
    'water_snail',
    'fox',
    'phytoplankton',
  ];

  const currentOrg = ORGANISMS_DATABASE[gameOrganismIds[currentIndex]];

  const handleClassify = (choice: 'producer' | 'prey' | 'predator' | 'both') => {
    let isCorrect = false;

    if (choice === 'producer' && currentOrg.type === 'producer') {
      isCorrect = true;
    } else if (choice === currentOrg.animalRole) {
      isCorrect = true;
    }

    if (isCorrect) {
      soundFx.playCorrect();
      const newScore = score + 10 + streak * 2;
      setScore(newScore);
      setStreak(streak + 1);

      // Achieve Objective 4 and 3 after 4 correct in a row or 6 total
      if (score >= 40 || streak >= 3) {
        onObjectiveAchieved(4);
        onObjectiveAchieved(3);
      }

      setLastFeedback({
        correct: true,
        text: `Correct! ${currentOrg.name} is classified as ${choice.toUpperCase()}!`,
        explanation: `${currentOrg.energySourceDescription} ${currentOrg.funFact}`,
      });
    } else {
      soundFx.playIncorrect();
      setStreak(0);
      setLastFeedback({
        correct: false,
        text: `Oops! ${currentOrg.name} is actually classified as ${currentOrg.animalRole.toUpperCase()}!`,
        explanation: `${currentOrg.energySourceDescription} (Eats: ${currentOrg.eats.join(', ')} | Eaten by: ${currentOrg.eatenBy.length > 0 ? currentOrg.eatenBy.join(', ') : 'None - Apex Predator'}).`,
      });
    }

    // Advance to next after slight pause or let student read
  };

  const handleNext = () => {
    soundFx.playClick();
    setLastFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % gameOrganismIds.length);
  };

  const handleReset = () => {
    soundFx.playClick();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setLastFeedback(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub Mode Toggle */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveSubMode('classifier');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${
              activeSubMode === 'classifier'
                ? 'bg-rose-800 text-white shadow-xs scale-[1.02]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-xs'
            }`}
          >
            Role Classifier Challenge
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveSubMode('adaptations');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${
              activeSubMode === 'adaptations'
                ? 'bg-rose-800 text-white shadow-xs scale-[1.02]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-xs'
            }`}
          >
            Predator vs Prey Clues & Adaptations
          </button>
        </div>

        {activeSubMode === 'classifier' && (
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="text-slate-500">
              Streak: <span className="text-amber-600 font-mono">{streak}🔥</span>
            </span>
            <span className="text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-mono">
              Score: {score} pts
            </span>
          </div>
        )}
      </div>

      {activeSubMode === 'classifier' ? (
        /* Classifier Arena */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Objective 3 & 4 Training
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Identify the Role: Producer, Prey, Predator, or Both?
            </h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Read the animal&apos;s clues and click the correct classification button below.
            </p>
          </div>

          {/* Organism Card in the Spotlight */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200 text-center relative overflow-hidden">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl overflow-hidden mb-4 border-2 border-emerald-400/50 shadow-md flex items-center justify-center bg-white relative group">
              {currentOrg.imageUrl ? (
                <img
                  src={currentOrg.imageUrl}
                  alt={currentOrg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-6xl sm:text-7xl animate-in zoom-in-75">
                  {currentOrg.emoji}
                </span>
              )}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-mono backdrop-blur-xs flex items-center gap-1">
                <span>{currentOrg.emoji}</span>
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              {currentOrg.name}
            </h3>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 mt-1 font-medium">
              <span>{currentOrg.scientificGroup}</span>
              <span>·</span>
              <span>Habitat: {currentOrg.habitat}</span>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-slate-700 leading-relaxed shadow-2xs">
              <strong>Feeding Behavior:</strong> {currentOrg.energySourceDescription}
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {currentOrg.adaptations.map((a, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200"
                >
                  ⚡ {a}
                </span>
              ))}
            </div>
          </div>

          {/* Four Classification Choice Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => handleClassify('producer')}
              disabled={lastFeedback !== null}
              className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border-2 border-emerald-200 hover:border-emerald-400 text-center transition-all disabled:opacity-50 group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🌱</span>
              <span className="text-xs font-bold text-emerald-950 block">Producer</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Makes own food</span>
            </button>

            <button
              onClick={() => handleClassify('prey')}
              disabled={lastFeedback !== null}
              className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-200 hover:border-amber-400 text-center transition-all disabled:opacity-50 group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🐇</span>
              <span className="text-xs font-bold text-amber-950 block">Prey Animal</span>
              <span className="text-[10px] text-amber-700 block mt-0.5">Hunted for food</span>
            </button>

            <button
              onClick={() => handleClassify('predator')}
              disabled={lastFeedback !== null}
              className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border-2 border-rose-200 hover:border-rose-400 text-center transition-all disabled:opacity-50 group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🦅</span>
              <span className="text-xs font-bold text-rose-950 block">Top Predator</span>
              <span className="text-[10px] text-rose-700 block mt-0.5">Hunts others</span>
            </button>

            <button
              onClick={() => handleClassify('both')}
              disabled={lastFeedback !== null}
              className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 border-2 border-indigo-200 hover:border-indigo-400 text-center transition-all disabled:opacity-50 group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🔄</span>
              <span className="text-xs font-bold text-indigo-950 block">Both Roles!</span>
              <span className="text-[10px] text-indigo-700 block mt-0.5">Hunts & is hunted</span>
            </button>
          </div>

          {/* Feedback Display */}
          {lastFeedback && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in space-y-2 ${
                lastFeedback.correct
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                {lastFeedback.correct ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600" />
                )}
                <span>{lastFeedback.text}</span>
              </div>
              <p className="text-xs leading-relaxed">{lastFeedback.explanation}</p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Next Creature →
                </button>
              </div>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              Creature {currentIndex + 1} of {gameOrganismIds.length}
            </span>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Arena
            </button>
          </div>
        </div>
      ) : (
        /* Adaptations & Field Clues Guide */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Field Science Clues
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              How to Tell a Predator from Prey in Nature
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Scientists use physical adaptations and body clues to discover whether an animal is built for hunting or escaping!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Eyes Rule */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <span>👀</span> The Famous Eye Placement Rule
              </h3>
              <div className="space-y-2 text-xs text-amber-900 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={LION_IMAGE}
                      alt="Lion with forward-facing eyes"
                      className="w-14 h-14 rounded-xl object-cover border border-amber-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-rose-800 block">&quot;Eyes on the front, born to hunt!&quot;</span>
                      <span className="text-[11px] text-slate-500">Notice the lion&apos;s forward-facing amber eyes</span>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    Predators (like lions, owls, hawks, humans) have eyes facing forward. This gives them <strong>binocular vision</strong> and excellent depth perception to judge how far away prey is.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={ZEBRA_IMAGE}
                      alt="Zebra with side-facing eyes"
                      className="w-14 h-14 rounded-xl object-cover border border-amber-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-emerald-800 block">&quot;Eyes on the side, born to hide!&quot;</span>
                      <span className="text-[11px] text-slate-500">Notice the zebra&apos;s side-mounted eyes</span>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    Prey animals (like rabbits, zebras, mice, deer) have eyes on the sides of their heads. This gives them almost <strong>360-degree panoramic vision</strong> to spot sneaking predators!
                  </p>
                </div>
              </div>
            </div>

            {/* Teeth and Weapons */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <span>🦷</span> Hunting Weapons vs Escape Defenses
              </h3>
              <div className="space-y-2 text-xs text-emerald-900 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={HAWK_IMAGE}
                      alt="Hawk with razor talons and hooked beak"
                      className="w-14 h-14 rounded-xl object-cover border border-emerald-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Predator Weapons:</span>
                      <span className="text-[11px] text-slate-500">Hooked tearing beaks, razor talons, stealth wings</span>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    Sharp, pointed canine teeth to grip prey; curved talons/claws; hooked beaks for tearing meat; stealth pads on feet.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={FROG_IMAGE}
                      alt="Green frog with camouflage and jumping legs"
                      className="w-14 h-14 rounded-xl object-cover border border-emerald-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">Prey Defenses:</span>
                      <span className="text-[11px] text-slate-500">Green leaf camouflage, sudden high leap</span>
                    </div>
                  </div>
                  <p className="text-slate-700">
                    Camouflage coloring to blend with lily pads; powerful jumping legs for fast zigzag sprints; hard protective shells.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
