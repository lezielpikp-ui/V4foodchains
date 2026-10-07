export type OrganismType = 'producer' | 'consumer';
export type ConsumerDiet = 'herbivore' | 'carnivore' | 'omnivore';
export type TrophicRole = 'producer' | 'primary_consumer' | 'secondary_consumer' | 'tertiary_consumer' | 'apex_predator';
export type AnimalRole = 'predator' | 'prey' | 'both' | 'producer';

export interface Organism {
  id: string;
  name: string;
  scientificGroup: string;
  type: OrganismType;
  diet?: ConsumerDiet;
  role: TrophicRole;
  animalRole: AnimalRole;
  eats: string[]; // organism ids or 'sunlight/minerals'
  eatenBy: string[];
  emoji: string;
  habitat: string;
  energySourceDescription: string;
  funFact: string;
  adaptations: string[];
  photoPlaceholderBg: string;
  imageUrl?: string;
}

export interface FoodChainChallenge {
  id: string;
  habitatName: string;
  habitatKey: 'garden' | 'savanna' | 'ocean' | 'pond' | 'forest';
  habitatBgImage: string;
  description: string;
  hint: string;
  correctChainIds: string[]; // Sequence from producer -> apex
  distractorIds: string[];   // Extra organisms that don't belong in this specific chain
  energyTrivia: string;
}

export interface DisruptionScenario {
  id: string;
  title: string;
  habitat: string;
  chain: {
    id: string;
    name: string;
    role: string;
    emoji: string;
    basePop: number;
  }[];
  event: string;
  targetId: string;
  changeType: 'decrease' | 'increase' | 'extinct';
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  effectsSummary: {
    organismId: string;
    trend: 'up' | 'down' | 'crashed';
    reason: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  objectiveIndex: number; // 1 to 7
  objectiveTitle: string;
  question: string;
  diagram?: {
    type: 'chain' | 'predator_prey' | 'photosynthesis';
    items: string[];
  };
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ObjectiveProgress {
  1: boolean; // Energy source (Sun + food)
  2: boolean; // Producers make food
  3: boolean; // Consumers eat living things
  4: boolean; // Predator vs Prey
  5: boolean; // Food chain relationships & arrows
  6: boolean; // Construct food chain
  7: boolean; // Producers and consumers affect one another
}
