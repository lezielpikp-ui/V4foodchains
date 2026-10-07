import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, TrendingUp, CheckCircle2, RotateCcw, Sparkles, HelpCircle, Activity, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { DISRUPTION_SCENARIOS } from '../data/ecosystemData';
import { soundFx } from '../utils/audio';

interface EcosystemSandboxProps {
  onObjectiveAchieved: (id: number) => void;
}

export const EcosystemSandbox: React.FC<EcosystemSandboxProps> = ({
  onObjectiveAchieved,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isDisruptionTriggered, setIsDisruptionTriggered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [solvedScenarioIds, setSolvedScenarioIds] = useState<string[]>([]);

  // Free sandbox custom populations
  const [sandboxMode, setSandboxMode] = useState<'guided' | 'free'>('guided');
  const [freeGrass, setFreeGrass] = useState(70);
  const [freeRabbit, setFreeRabbit] = useState(50);
  const [freeFox, setFreeFox] = useState(30);

  const scenario = DISRUPTION_SCENARIOS[selectedScenarioIndex];

  const handleTriggerEvent = () => {
    soundFx.playEnergyPulse();
    setIsDisruptionTriggered(true);
  };

  const handleSelectOption = (index: number) => {
    setSelectedAnswerIndex(index);
    const option = scenario.options[index];
    if (option.isCorrect) {
      soundFx.playCorrect();
      soundFx.playStar();
      if (!solvedScenarioIds.includes(scenario.id)) {
        setSolvedScenarioIds([...solvedScenarioIds, scenario.id]);
      }
      onObjectiveAchieved(7);
    } else {
      soundFx.playIncorrect();
    }
  };

  const handleResetScenario = () => {
    soundFx.playClick();
    setIsDisruptionTriggered(false);
    setSelectedAnswerIndex(null);
  };

  const handleNextScenario = () => {
    soundFx.playClick();
    const nextIdx = (selectedScenarioIndex + 1) % DISRUPTION_SCENARIOS.length;
    setSelectedScenarioIndex(nextIdx);
    setIsDisruptionTriggered(false);
    setSelectedAnswerIndex(null);
  };

  const handlePrevScenario = () => {
    soundFx.playClick();
    const prevIdx = (selectedScenarioIndex - 1 + DISRUPTION_SCENARIOS.length) % DISRUPTION_SCENARIOS.length;
    setSelectedScenarioIndex(prevIdx);
    setIsDisruptionTriggered(false);
    setSelectedAnswerIndex(null);
  };

  // Determine state in free sandbox
  const isOvergrazed = freeRabbit > freeGrass * 0.8;
  const isFoxStarving = freeFox > freeRabbit * 0.7;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Mode Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Curriculum Objective 7 Laboratory
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Ecosystem Shockwave: How Organisms Affect One Another
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            In any food chain, living things are tightly interconnected. If one organism changes, it creates ripples through the entire ecosystem!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              setSandboxMode('guided');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${
              sandboxMode === 'guided'
                ? 'bg-emerald-800 text-white shadow-xs scale-[1.02]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-xs'
            }`}
          >
            Guided Mystery Scenarios
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setSandboxMode('free');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${
              sandboxMode === 'free'
                ? 'bg-emerald-800 text-white shadow-xs scale-[1.02]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-xs'
            }`}
          >
            Free Population Sandbox
          </button>
        </div>
      </div>

      {sandboxMode === 'guided' ? (
        /* Guided Disruption Scenarios */
        <div className="space-y-6">
          {/* Scenario Tabs Header & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select an Ecological Mystery Case (10 Available):
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 self-start sm:self-auto">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Mysteries Solved: {solvedScenarioIds.length} / {DISRUPTION_SCENARIOS.length}</span>
            </div>
          </div>

          {/* Scenario Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {DISRUPTION_SCENARIOS.map((sc, idx) => {
              const isSelected = idx === selectedScenarioIndex;
              const isSolved = solvedScenarioIds.includes(sc.id);
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedScenarioIndex(idx);
                    setIsDisruptionTriggered(false);
                    setSelectedAnswerIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap flex items-center gap-1.5 shrink-0 cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-500/20 scale-[1.02]'
                      : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:shadow-xs'
                  }`}
                >
                  <span>Case {idx + 1}</span>
                  {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            {/* Top Navigation Row */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Case {selectedScenarioIndex + 1} of {DISRUPTION_SCENARIOS.length} · Habitat: {scenario.habitat}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevScenario}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Previous Mystery Case"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextScenario}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title="Next Mystery Case"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Event Description Card */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-200/60 text-amber-800 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-950">
                    {scenario.title}
                  </h3>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    {scenario.event}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleResetScenario}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> Reset
                </button>
                <button
                  onClick={handleTriggerEvent}
                  disabled={isDisruptionTriggered}
                  className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors shadow-xs disabled:opacity-40"
                >
                  ⚡ Trigger Disruption
                </button>
              </div>
            </div>

            {/* Live Population Bar Charts Before / After */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Food Chain Population Balances
                </span>
                <span className="text-[11px] text-slate-500">
                  {isDisruptionTriggered ? 'Status: Disruption In Effect' : 'Status: Baseline Normal Ecosystem'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {scenario.chain.map((org) => {
                  const effect = scenario.effectsSummary.find((e) => e.organismId === org.id);
                  let currentLevel = org.basePop;
                  if (isDisruptionTriggered && effect) {
                    if (effect.trend === 'crashed') currentLevel = 10;
                    else if (effect.trend === 'down') currentLevel = 30;
                    else if (effect.trend === 'up') currentLevel = 130;
                  }

                  return (
                    <div
                      key={org.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{org.emoji}</span>
                        {isDisruptionTriggered && effect && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                              effect.trend === 'crashed'
                                ? 'bg-rose-100 text-rose-800'
                                : effect.trend === 'down'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {effect.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {effect.trend.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {org.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {org.role}
                        </div>
                      </div>

                      {/* Bar indicator */}
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isDisruptionTriggered && effect?.trend === 'crashed'
                              ? 'bg-rose-500'
                              : isDisruptionTriggered && effect?.trend === 'down'
                              ? 'bg-amber-500'
                              : isDisruptionTriggered && effect?.trend === 'up'
                              ? 'bg-blue-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, (currentLevel / 100) * 100)}%` }}
                        />
                      </div>

                      {isDisruptionTriggered && effect && (
                        <div className="text-[10px] text-slate-600 italic">
                          Why: {effect.reason}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cause-and-Effect Challenge Question */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  {scenario.question}
                </h4>
              </div>

              <div className="space-y-2">
                {scenario.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswerIndex === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                            : 'bg-rose-50 border-rose-400 text-rose-950 font-medium'
                          : 'bg-white hover:bg-slate-100/70 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedAnswerIndex !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in space-y-2 ${
                    scenario.options[selectedAnswerIndex].isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div>
                    <strong>
                      {scenario.options[selectedAnswerIndex].isCorrect
                        ? '✔ Excellent Scientific Reasoning!'
                        : '✖ Scientific Explanation:'}
                    </strong>{' '}
                    {scenario.options[selectedAnswerIndex].explanation}
                  </div>

                  {scenario.options[selectedAnswerIndex].isCorrect && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextScenario}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Next Mystery Case</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Free Sandbox Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-base font-bold text-slate-900">
              Free Ecosystem Balance Playground
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Drag the sliders below to manually change the population of Producers, Primary Consumers, or Predators and see the ecological balance meter!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grass Slider */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                <span>🌱 Green Grass (Producers)</span>
                <span className="font-mono">{freeGrass}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={freeGrass}
                onChange={(e) => setFreeGrass(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Rabbit Slider */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-amber-950">
                <span>🐇 Rabbits (Primary Consumers)</span>
                <span className="font-mono">{freeRabbit}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={freeRabbit}
                onChange={(e) => setFreeRabbit(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Fox Slider */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-rose-950">
                <span>🦊 Red Foxes (Secondary Consumers)</span>
                <span className="font-mono">{freeFox}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={freeFox}
                onChange={(e) => setFreeFox(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
            </div>
          </div>

          {/* Real-time Status Card */}
          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              isOvergrazed
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : isFoxStarving
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <Activity className="w-4 h-4" />
              <span>
                {isOvergrazed
                  ? 'CRITICAL WARNING: Overgrazing Alert!'
                  : isFoxStarving
                  ? 'WARNING: Predator Starvation Alert!'
                  : 'STABLE: Ecosystem is in Healthy Dynamic Equilibrium!'}
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              {isOvergrazed
                ? 'The rabbit population is too large for the available grass! The plants are being destroyed faster than they can grow back.'
                : isFoxStarving
                ? 'There are too many foxes hunting too few rabbits! Foxes will soon begin starving and their numbers will decrease.'
                : 'Producers provide adequate food for herbivores, and predators prevent overpopulation. All levels are well balanced!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
