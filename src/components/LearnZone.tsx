import React, { useState } from 'react';
import { Sun, Leaf, Utensils, Swords, ArrowRight, Lightbulb, CheckCircle2, ChevronRight, Play, Camera } from 'lucide-react';
import { HERO_IMAGE, LION_IMAGE, ZEBRA_IMAGE, HAWK_IMAGE, FROG_IMAGE, CATERPILLAR_IMAGE } from '../data/ecosystemData';
import { soundFx } from '../utils/audio';

interface LearnZoneProps {
  onObjectiveAchieved: (id: number) => void;
  onNavigateToTab: (tab: string) => void;
}

export const LearnZone: React.FC<LearnZoneProps> = ({
  onObjectiveAchieved,
  onNavigateToTab,
}) => {
  const [activeModule, setActiveModule] = useState<'energy' | 'producers' | 'consumers' | 'predator_prey' | 'arrows'>('energy');
  const [arrowDemoEaten, setArrowDemoEaten] = useState(false);
  const [doubleRoleDemo, setDoubleRoleDemo] = useState<'bug_vs_frog' | 'frog_vs_hawk'>('bug_vs_frog');

  const modules = [
    {
      id: 'energy',
      title: '1. Where Energy Comes From',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      desc: 'The Sun powers life on Earth',
      objNum: 1,
    },
    {
      id: 'producers',
      title: '2. Producers (Self-Feeders)',
      icon: <Leaf className="w-4 h-4 text-emerald-600" />,
      desc: 'Can make their own food',
      objNum: 2,
    },
    {
      id: 'consumers',
      title: '3. Consumers (Other-Feeders)',
      icon: <Utensils className="w-4 h-4 text-orange-500" />,
      desc: 'Eat other living things',
      objNum: 3,
    },
    {
      id: 'predator_prey',
      title: '4. Predator vs Prey',
      icon: <Swords className="w-4 h-4 text-rose-500" />,
      desc: 'Hunters and the hunted',
      objNum: 4,
    },
    {
      id: 'arrows',
      title: '5. The Food Chain Arrow Rule',
      icon: <ArrowRight className="w-4 h-4 text-blue-500" />,
      desc: 'Direction of energy flow',
      objNum: 5,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner with Generated Ecosystem Illustration */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-emerald-900/20">
        <div className="relative aspect-21/9 min-h-[220px] sm:min-h-[260px] w-full overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Vibrant ecosystem showing the sun, green plants, rabbit, fox, and eagle with energy flow"
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent to-slate-950/60" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl text-white">
              <span className="text-xs font-bold text-amber-300 tracking-wider uppercase mb-1 block">
                Primary Science Core Guide
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-balance">
                How Living Things Obtain Energy & Feed Together
              </h1>
              <p className="text-sm text-slate-200 mt-2 line-clamp-2 sm:line-clamp-none">
                Discover why every living creature needs energy, how green producers harness the sun, why consumers must eat, and how food chains connect every living thing!
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateToTab('crafter');
              }}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs transition-colors shadow-md group"
            >
              <span>Jump Into Food Chain Game</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Concept Selector Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {modules.map((m) => {
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                soundFx.playClick();
                setActiveModule(m.id as typeof activeModule);
                onObjectiveAchieved(m.objNum);
              }}
              className={`text-left p-3.5 rounded-2xl border cursor-pointer select-none transform transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-[0.98] ${
                isActive
                  ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/20 scale-[1.02]'
                  : 'bg-white/90 hover:bg-white border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  {m.icon}
                </div>
                <span className="text-[11px] font-bold text-emerald-800 tracking-wider">
                  Obj {m.objNum}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{m.title}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{m.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Module 1: Where Energy Comes From */}
      {activeModule === 'energy' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                Curriculum Objective 1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                State How Organisms Obtain Their Energy
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Every living thing needs energy to grow, move, repair cells, and stay alive. But where does it all begin?
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('sun-lab')}
              className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200 shrink-0"
            >
              Launch Sun Power Lab →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* The Sun Card */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-200/70 flex items-center justify-center text-amber-700 text-xl mb-3">
                  ☀️
                </div>
                <h3 className="text-base font-bold text-amber-950">1. The Sun: Primary Energy Source</h3>
                <p className="text-xs text-amber-900/90 mt-2 leading-relaxed">
                  Almost all energy on planet Earth originates from the Sun. Light rays travel 93 million miles through space to reach our planet!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] font-semibold text-amber-800">
                Key takeaway: Without sunlight, living ecosystems cannot survive.
              </div>
            </div>

            {/* Plants Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-200/70 flex items-center justify-center text-emerald-700 text-xl mb-3">
                  🌱
                </div>
                <h3 className="text-base font-bold text-emerald-950">2. Plants Trap Solar Energy</h3>
                <p className="text-xs text-emerald-900/90 mt-2 leading-relaxed">
                  Green plants use a green chemical called <strong>chlorophyll</strong> in their leaves to capture sunlight and make food sugars via <em>photosynthesis</em>.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] font-semibold text-emerald-800">
                They convert light energy into chemical energy stored in food!
              </div>
            </div>

            {/* Animals Card */}
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-200/70 flex items-center justify-center text-sky-700 text-xl mb-3">
                  🦊
                </div>
                <h3 className="text-base font-bold text-sky-950">3. Animals Eat to Get Energy</h3>
                <p className="text-xs text-sky-900/90 mt-2 leading-relaxed">
                  Animals cannot absorb sunlight to make food. They obtain stored energy by <strong>feeding on plants</strong> (herbivores) or <strong>feeding on other animals</strong> (carnivores).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-200/60 text-[11px] font-semibold text-sky-800">
                Energy passes along when one living thing eats another.
              </div>
            </div>
          </div>

          {/* Interactive Energy Journey Flow */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Visual Energy Journey (Follow the Flow)
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              <div className="p-3 bg-amber-100 rounded-xl border border-amber-300 w-full sm:w-1/4 flex flex-col items-center">
                <span className="text-3xl animate-bounce">☀️</span>
                <div className="text-xs font-bold text-amber-950 mt-1">The Sun</div>
                <div className="text-[10px] text-amber-800">Light Energy</div>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-600 rotate-90 sm:rotate-0 shrink-0" />
              <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 w-full sm:w-1/4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 border border-emerald-400 shadow-xs">
                  <img
                    src={HERO_IMAGE}
                    alt="Green plants producing food"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs font-bold text-emerald-950">Green Producer</div>
                <div className="text-[10px] text-emerald-800">Makes Sugar Food</div>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-600 rotate-90 sm:rotate-0 shrink-0" />
              <div className="p-3 bg-lime-100 rounded-xl border border-lime-300 w-full sm:w-1/4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 border border-lime-400 shadow-xs">
                  <img
                    src={ZEBRA_IMAGE}
                    alt="Zebra herbivore"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs font-bold text-lime-950">Herbivore (Zebra)</div>
                <div className="text-[10px] text-lime-800">Eats the Plant</div>
              </div>
              <ArrowRight className="w-5 h-5 text-lime-600 rotate-90 sm:rotate-0 shrink-0" />
              <div className="p-3 bg-rose-100 rounded-xl border border-rose-300 w-full sm:w-1/4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 border border-rose-400 shadow-xs">
                  <img
                    src={LION_IMAGE}
                    alt="Lion carnivore"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs font-bold text-rose-950">Carnivore (Lion)</div>
                <div className="text-[10px] text-rose-800">Eats the Herbivore</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Module 2: Producers */}
      {activeModule === 'producers' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Curriculum Objective 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Show an Understanding That a Producer Can Make Its Own Food
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Why do we call plants &quot;producers&quot;? Because they produce (manufacture) their own nutrients!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <span>🌱</span> What Makes an Organism a Producer?
              </h3>
              <ul className="space-y-3 text-xs text-emerald-900 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Contains Chlorophyll:</strong> The green pigment that traps sunlight like tiny solar panels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Ingredients Needed:</strong> Sunlight + Carbon Dioxide (from air) + Water (from soil/water).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Never Hunts or Chews:</strong> Producers don&apos;t have mouths or stomachs; they do not eat other living organisms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Produces Oxygen:</strong> As a wonderful bonus, photosynthesis releases fresh oxygen gas for animals to breathe!</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Common Producers in Different Habitats
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-lg">🌿</span>
                  <div className="font-bold text-slate-800">Garden Grass & Clover</div>
                  <div className="text-[11px] text-slate-500">Makes energy for bugs & rabbits</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-lg">🌳</span>
                  <div className="font-bold text-slate-800">Acacia & Oak Trees</div>
                  <div className="text-[11px] text-slate-500">Leaves & seeds for giraffes & squirrels</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-lg">🦠</span>
                  <div className="font-bold text-slate-800">Phytoplankton & Algae</div>
                  <div className="text-[11px] text-slate-500">Microscopic ocean power plants</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-lg">🪷</span>
                  <div className="font-bold text-slate-800">Pondweed & Water Lilies</div>
                  <div className="text-[11px] text-slate-500">Freshwater aquatic producers</div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Exam Trap:</strong> Mushrooms are NOT producers! They are fungi that feed on dead matter; they cannot make food from sunlight.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Module 3: Consumers */}
      {activeModule === 'consumers' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
              Curriculum Objective 3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Consumers Cannot Make Their Own Food, So They Eat Other Living Things
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Because animals lack chlorophyll, they must consume living things to absorb their energy and nutrients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-lime-50 border border-lime-200">
              <span className="text-2xl">🐇</span>
              <h3 className="text-base font-bold text-lime-950 mt-2">Herbivores</h3>
              <p className="text-xs font-semibold text-lime-800 uppercase tracking-wider mt-0.5">
                Primary Consumers
              </p>
              <p className="text-xs text-lime-900 mt-2 leading-relaxed">
                Feed exclusively on producers (plants, leaves, seeds, fruits).
              </p>
              <div className="mt-3 text-xs bg-white/80 p-2 rounded-lg border border-lime-200 text-lime-900 font-medium">
                Examples: Zebra, Caterpillar, Rabbit, Water Snail, Krill.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-2xl">🦁</span>
              <h3 className="text-base font-bold text-rose-950 mt-2">Carnivores</h3>
              <p className="text-xs font-semibold text-rose-800 uppercase tracking-wider mt-0.5">
                Secondary & Apex Consumers
              </p>
              <p className="text-xs text-rose-900 mt-2 leading-relaxed">
                Feed on other animals (meat-eaters). They obtain energy that was previously stored in herbivores.
              </p>
              <div className="mt-3 text-xs bg-white/80 p-2 rounded-lg border border-rose-200 text-rose-900 font-medium">
                Examples: Lion, Great White Shark, Hawk, Heron.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-2xl">🐻</span>
              <h3 className="text-base font-bold text-amber-950 mt-2">Omnivores</h3>
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mt-0.5">
                Mixed Consumers
              </p>
              <p className="text-xs text-amber-900 mt-2 leading-relaxed">
                Eat both plants and other animals to obtain their energy.
              </p>
              <div className="mt-3 text-xs bg-white/80 p-2 rounded-lg border border-amber-200 text-amber-900 font-medium">
                Examples: Brown Bear (berries & salmon), Chimpanzee, Humans!
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Module 4: Predator vs Prey */}
      {activeModule === 'predator_prey' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">
                Curriculum Objective 4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Differentiate Between Predator and Prey
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                A predator is an animal that hunts and feeds on other animals. Prey is the animal that is hunted and eaten.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('predator-prey')}
              className="px-4 py-2 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200 shrink-0"
            >
              Play Predator vs Prey Arena →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Predator Box */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2">
                <span className="text-xl">🦅</span> PREDATOR (The Hunter)
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                An animal that hunts, captures, and kills other animals for food.
              </p>
              <div className="mt-3 space-y-1.5 text-xs text-rose-900">
                <div className="font-semibold text-rose-950">Hunter Adaptations:</div>
                <div>• Forward-facing eyes for 3D depth perception</div>
                <div>• Sharp claws, talons, hooked beaks, or sharp canine teeth</div>
                <div>• Stealthy movement or high burst speed</div>
              </div>
            </div>

            {/* Prey Box */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
                <span className="text-xl">🐇</span> PREY (The Hunted)
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                An animal that is hunted and eaten by a predator.
              </p>
              <div className="mt-3 space-y-1.5 text-xs text-amber-900">
                <div className="font-semibold text-amber-950">Defense Adaptations:</div>
                <div>• Eyes on the sides of the head for wide peripheral vision</div>
                <div>• Camouflage to blend into surroundings</div>
                <div>• Fast zigzag escape running, shells, or warning colors</div>
              </div>
            </div>
          </div>

          {/* Interactive Dual-Role Insight */}
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Critical Primary Science Concept
                </span>
                <h4 className="text-base font-bold text-indigo-950">
                  Can an Animal Be BOTH Predator and Prey?
                </h4>
              </div>
              <div className="text-xs font-bold text-indigo-900 bg-indigo-200/60 px-2.5 py-1 rounded-lg">
                YES! Very common!
              </div>
            </div>

            <p className="text-xs text-indigo-900/90 leading-relaxed">
              Most animals in the middle of a food chain are both predators to smaller creatures AND prey to bigger carnivores. Toggle below to see:
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setDoubleRoleDemo('bug_vs_frog');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  doubleRoleDemo === 'bug_vs_frog'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-900 border border-indigo-200'
                }`}
              >
                Frog eating Dragonfly (Frog is Predator)
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setDoubleRoleDemo('frog_vs_hawk');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  doubleRoleDemo === 'frog_vs_hawk'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-900 border border-indigo-200'
                }`}
              >
                Heron spearing Frog (Frog is Prey!)
              </button>
            </div>

            <div className="p-4 bg-white rounded-xl border border-indigo-200 flex items-center justify-center gap-4 text-center">
              {doubleRoleDemo === 'bug_vs_frog' ? (
                <>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl mb-1">🦗</span>
                    <div className="text-xs font-bold text-slate-800">Dragonfly / Bug</div>
                    <div className="text-[10px] text-amber-700 font-bold">PREY</div>
                  </div>
                  <div className="text-xs font-bold text-indigo-600">is eaten by ➔</div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden mb-1 border-2 border-rose-400 shadow-xs">
                      <img
                        src={FROG_IMAGE}
                        alt="Green frog predator"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs font-bold text-slate-800">Green Frog</div>
                    <div className="text-[10px] text-rose-700 font-bold">PREDATOR</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden mb-1 border-2 border-amber-400 shadow-xs">
                      <img
                        src={FROG_IMAGE}
                        alt="Green frog prey"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs font-bold text-slate-800">Green Frog</div>
                    <div className="text-[10px] text-amber-700 font-bold">PREY</div>
                  </div>
                  <div className="text-xs font-bold text-indigo-600">is eaten by ➔</div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden mb-1 border-2 border-rose-400 shadow-xs">
                      <img
                        src={HAWK_IMAGE}
                        alt="Hawk predator"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs font-bold text-slate-800">Raptor / Hawk</div>
                    <div className="text-[10px] text-rose-700 font-bold">PREDATOR</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Module 5: Food Chain Arrows */}
      {activeModule === 'arrows' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                Curriculum Objective 5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Show Understanding That a Food Chain Shows Food Relationships
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                A food chain shows who eats whom and the direction that energy flows through organisms.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('crafter')}
              className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200 shrink-0"
            >
              Build Chains in Game →
            </button>
          </div>

          {/* Interactive Arrow Rule Demo */}
          <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                <span>🎯</span> The #1 Exam Rule: Which Way Does the Arrow Point?
              </h3>
              <button
                onClick={() => {
                  soundFx.playEnergyPulse();
                  setArrowDemoEaten(!arrowDemoEaten);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Energy Transfer</span>
              </button>
            </div>

            <p className="text-xs text-blue-900 leading-relaxed">
              Many students accidentally think the arrow means &quot;points to what it attacks&quot;. <strong>THAT IS WRONG!</strong> The arrow ALWAYS points from the food to the eater:
            </p>

            <div className="p-4 bg-white rounded-xl border border-blue-200 text-center space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-2xl">🌱</span>
                  <span className="text-xs font-bold text-emerald-950">Green Grass</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-blue-600 font-extrabold text-lg px-2">➔</span>
                  <span className="text-[10px] text-blue-700 font-semibold font-mono">energy flows into</span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-200">
                  <img
                    src={ZEBRA_IMAGE}
                    alt="Zebra"
                    className="w-10 h-10 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-amber-950 block">Plains Zebra</span>
                    <span className="text-[10px] text-amber-800">Primary Consumer</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-blue-600 font-extrabold text-lg px-2">➔</span>
                  <span className="text-[10px] text-blue-700 font-semibold font-mono">energy flows into</span>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200">
                  <img
                    src={LION_IMAGE}
                    alt="Lion"
                    className="w-10 h-10 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-rose-950 block">Savanna Lion</span>
                    <span className="text-[10px] text-rose-800">Apex Predator</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 flex items-center justify-center gap-2 font-mono">
                <span className="text-emerald-700 font-bold">Food / Prey</span>
                <span className="text-blue-600 font-bold">―(is eaten by & energy flows into)➔</span>
                <span className="text-rose-700 font-bold">Eater / Predator</span>
              </div>

              {arrowDemoEaten && (
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 text-xs text-emerald-950 animate-in fade-in">
                  ✨ <strong>Energy Flow Active:</strong> Solar energy absorbed by Grass enters the Zebra when grazed, and then enters the Lion when hunted!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-100/60 rounded-xl border border-emerald-300 text-emerald-950">
                <strong>✔ Correct Meaning:</strong><br />
                Arrow points in the direction that <em>energy and nutrients travel</em>.
              </div>
              <div className="p-3 bg-rose-100/60 rounded-xl border border-rose-300 text-rose-950">
                <strong>✖ Common Mistake:</strong><br />
                Never draw &quot;Lion → Zebra&quot;! A lion is not food for a zebra.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Wildlife Photo Field Guide Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block">
              Wildlife Field Guide & Photo Gallery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Meet the Organisms in Real Life
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High-resolution field photography showing predator adaptations, prey camouflage, and primary producers in the wild.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 shrink-0">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>Field Wildlife Photos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Lion */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={LION_IMAGE}
                  alt="Majestic Savanna Lion"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold">
                  Apex Predator
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900">Savanna Lion</h3>
                <span className="text-[11px] text-slate-500 block">Carnivore · Savanna</span>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Forward-facing amber eyes, sharp retractable claws, and powerful jaws to hunt large herbivores.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <span className="text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded block text-center">
                Eats: Zebras & Antelopes
              </span>
            </div>
          </div>

          {/* 2. Zebra */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={ZEBRA_IMAGE}
                  alt="Plains Zebra in grassland"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px] font-bold">
                  Primary Consumer
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900">Plains Zebra</h3>
                <span className="text-[11px] text-slate-500 block">Herbivore · Savanna</span>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Side-mounted eyes for 360-degree vision, dazzling black-and-white stripes that confuse hunting lions.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded block text-center">
                Eats: Savanna Grasses
              </span>
            </div>
          </div>

          {/* 3. Hawk */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={HAWK_IMAGE}
                  alt="Red-Tailed Hawk raptor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold">
                  Apex Raptor
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900">Red-Tailed Hawk</h3>
                <span className="text-[11px] text-slate-500 block">Carnivore · Garden & Meadow</span>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Telescopic eyes 8x sharper than humans, curved razor talons, and a hooked tearing beak.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <span className="text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded block text-center">
                Eats: Small Birds & Frogs
              </span>
            </div>
          </div>

          {/* 4. Frog */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={FROG_IMAGE}
                  alt="Green Tree Frog on lily pad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold">
                  Both Predator & Prey
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900">Green Pond Frog</h3>
                <span className="text-[11px] text-slate-500 block">Carnivore · Freshwater Pond</span>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Hunts insects with a lightning-fast sticky tongue, but must evade hungry herons and snakes!
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <span className="text-[10px] font-semibold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded block text-center">
                Dual Role Creature!
              </span>
            </div>
          </div>

          {/* 5. Caterpillar */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-square w-full overflow-hidden relative">
                <img
                  src={CATERPILLAR_IMAGE}
                  alt="Green caterpillar eating leaf"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                  Primary Consumer
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-slate-900">Leaf Caterpillar</h3>
                <span className="text-[11px] text-slate-500 block">Herbivore · Garden</span>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Powerful chewing mouthparts that feed non-stop on fresh leaves produced by solar photosynthesis.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded block text-center">
                Eats: Green Leaves
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
