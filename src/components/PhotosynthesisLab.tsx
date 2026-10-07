import React, { useState } from 'react';
import { Sun, Droplets, Wind, Sparkles, CheckCircle2, RotateCcw, AlertCircle, ArrowRight } from 'lucide-react';
import { HERO_IMAGE, CATERPILLAR_IMAGE } from '../data/ecosystemData';
import { soundFx } from '../utils/audio';

interface PhotosynthesisLabProps {
  onObjectiveAchieved: (id: number) => void;
}

export const PhotosynthesisLab: React.FC<PhotosynthesisLabProps> = ({
  onObjectiveAchieved,
}) => {
  const [sunlight, setSunlight] = useState<number>(3); // 1 = dark, 2 = low, 3 = bright
  const [water, setWater] = useState<number>(3); // 1 = dry, 2 = moist, 3 = optimal
  const [carbonDioxide, setCarbonDioxide] = useState<number>(3); // 1 = low, 2 = normal, 3 = abundant
  const [hasTestedEclipse, setHasTestedEclipse] = useState(false);
  const [feedConsumerActive, setFeedConsumerActive] = useState(false);

  // Compute photosynthesis energy output (0 to 100%)
  const isOptimal = sunlight === 3 && water === 3 && carbonDioxide === 3;
  const isNoSun = sunlight === 1;

  let sugarProduction = 0;
  if (sunlight === 1 || water === 1 || carbonDioxide === 1) {
    sugarProduction = 15;
  } else if (sunlight === 2 || water === 2 || carbonDioxide === 2) {
    sugarProduction = 55;
  } else {
    sugarProduction = 100;
  }

  const oxygenOutput = Math.round(sugarProduction * 0.9);

  const handleSliderChange = () => {
    soundFx.playClick();
    if (isOptimal) {
      soundFx.playEnergyPulse();
      onObjectiveAchieved(1);
      onObjectiveAchieved(2);
    }
  };

  const handleTestEclipse = () => {
    soundFx.playClick();
    setSunlight(1);
    setHasTestedEclipse(true);
    setFeedConsumerActive(false);
  };

  const handleResetLab = () => {
    soundFx.playClick();
    setSunlight(3);
    setWater(3);
    setCarbonDioxide(3);
    setFeedConsumerActive(false);
  };

  const handleFeedHerbivore = () => {
    if (isNoSun) {
      soundFx.playIncorrect();
      return;
    }
    soundFx.playCorrect();
    setFeedConsumerActive(true);
    onObjectiveAchieved(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
          Objectives 1 & 2 Interactive Laboratory
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          The Producer Powerhouse: How Plants Make Food & Energy
        </h2>
        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
          Unlike animals, green plants are <strong>producers</strong>. They do not have mouths to eat food. Instead, they produce their own food (sugar) inside their leaves using sunlight, water, and carbon dioxide. Experiment with the controls below to see how energy is manufactured!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Deck (4 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Photosynthesis Ingredients
            </h3>
            <button
              onClick={handleResetLab}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Lab
            </button>
          </div>

          {/* 1. Sunlight Control */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" /> 1. Sunlight Energy
              </span>
              <span className="tabular-nums font-mono text-amber-800">
                {sunlight === 1 ? 'Total Darkness' : sunlight === 2 ? 'Cloudy / Weak' : 'Bright Sunlight ☀️'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={sunlight}
              onChange={(e) => {
                setSunlight(Number(e.target.value));
                handleSliderChange();
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-amber-800/80 font-medium">
              <span>Darkness</span>
              <span>Partial Sun</span>
              <span>Optimal Sun</span>
            </div>
          </div>

          {/* 2. Water Control */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-sky-950">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-500" /> 2. Water (from Roots)
              </span>
              <span className="tabular-nums font-mono text-sky-800">
                {water === 1 ? 'Dry Soil' : water === 2 ? 'Moist Soil' : 'Optimal Hydration 💧'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={water}
              onChange={(e) => {
                setWater(Number(e.target.value));
                handleSliderChange();
              }}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-sky-800/80 font-medium">
              <span>Drought</span>
              <span>Moderate</span>
              <span>Abundant</span>
            </div>
          </div>

          {/* 3. Carbon Dioxide Control */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-emerald-600" /> 3. Carbon Dioxide (CO₂)
              </span>
              <span className="tabular-nums font-mono text-emerald-800">
                {carbonDioxide === 1 ? 'Depleted Air' : carbonDioxide === 2 ? 'Normal Air' : 'Fresh Air Flow 🍃'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={carbonDioxide}
              onChange={(e) => {
                setCarbonDioxide(Number(e.target.value));
                handleSliderChange();
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-emerald-800/80 font-medium">
              <span>Very Low</span>
              <span>Normal</span>
              <span>Optimal</span>
            </div>
          </div>

          {/* Quick Experiments */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Quick Experiment Challenges:
            </span>
            <button
              onClick={handleTestEclipse}
              className="w-full text-left p-2 rounded-xl text-xs bg-white hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>🌑 Simulate Total Solar Eclipse / Night</span>
              <span className="text-[10px] text-amber-700 font-bold">Try It</span>
            </button>
          </div>
        </div>

        {/* Visual Lab Stage & Meters (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Virtual Plant Chamber Simulation
              </h3>
              <div className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                Chloroplasts Active
              </div>
            </div>

            {/* Simulated Plant Canvas */}
            <div
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-700 border text-center relative overflow-hidden ${
                isNoSun
                  ? 'bg-slate-900 border-slate-800 text-white'
                  : sugarProduction >= 80
                  ? 'bg-gradient-to-b from-emerald-50 to-emerald-100 border-emerald-300'
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              {/* Sunbeam animation */}
              {!isNoSun && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-4 opacity-75">
                  <span className="animate-bounce text-2xl">☀️</span>
                  <span className="animate-pulse text-xl">✨</span>
                  <span className="animate-bounce delay-150 text-2xl">☀️</span>
                </div>
              )}

              <div className="my-4 flex flex-col items-center">
                {!isNoSun && sugarProduction >= 50 ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md mb-2">
                    <img
                      src={HERO_IMAGE}
                      alt="Sunlit green plants"
                      className="w-full h-full object-cover animate-in zoom-in-75"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <span className="text-6xl sm:text-7xl block transition-transform duration-500 hover:scale-110 mb-2">
                    {isNoSun ? '🥀' : '🌱'}
                  </span>
                )}
                <span className="text-sm font-bold block">
                  {isNoSun
                    ? 'Plant Dormant / Wilting in Darkness'
                    : sugarProduction >= 80
                    ? 'Supercharged Green Plant (High Photosynthesis)'
                    : 'Slow Food Production (Missing Resources)'}
                </span>
              </div>

              {/* Photosynthesis Reaction Formula */}
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200 inline-block text-xs text-slate-800 font-mono shadow-xs">
                Light + Water (H₂O) + CO₂ ➔ <strong>Glucose Food (Energy)</strong> + Oxygen (O₂)
              </div>
            </div>
          </div>

          {/* Real-Time Live Meters */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Food Energy (Sugar) Produced:</span>
                <span className="font-mono text-emerald-700">{sugarProduction}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${sugarProduction}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Fresh Oxygen Gas Released for Animals:</span>
                <span className="font-mono text-sky-700">{oxygenOutput}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${oxygenOutput}%` }}
                />
              </div>
            </div>
          </div>

          {/* Connection to Objective 1 & 3: Feeding the Consumer */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Connect to Consumers: Feed the Caterpillar!
              </span>
              <button
                onClick={handleFeedHerbivore}
                disabled={isNoSun}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors disabled:opacity-40"
              >
                Send Herbivore to Graze
              </button>
            </div>

            {feedConsumerActive ? (
              <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-950 flex items-start gap-3 animate-in fade-in">
                <img
                  src={CATERPILLAR_IMAGE}
                  alt="Green leaf caterpillar grazing"
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-400 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5">
                  <div className="font-bold text-emerald-800">
                    🐛 ➔ ⚡ Solar Energy Transferred into Animal!
                  </div>
                  <p>
                    The caterpillar eats the sweet leaf sugars created by sunlight. This is exactly how consumers obtain their energy—by eating food produced by plants!
                  </p>
                </div>
              </div>
            ) : isNoSun ? (
              <div className="text-xs text-rose-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>In the dark, the plant produces zero food, so the caterpillar would starve!</span>
              </div>
            ) : (
              <p className="text-xs text-emerald-900/80">
                Click &quot;Send Herbivore to Graze&quot; to see how the solar energy captured by the plant travels into an animal!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
