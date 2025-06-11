export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: { amount: number; unitShort: string; unitLong: string };
    metric: { amount: number; unitShort: string; unitLong: string };
  };
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: { id: number; name: string; localizedName: string; image: string }[];
  equipment: { id: number; name: string; localizedName: string; image: string }[];
  length?: { number: number; unit: string };
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  sourceUrl?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  extendedIngredients?: ExtendedIngredient[];
  analyzedInstructions?: AnalyzedInstruction[];
  instructions?: string;
  cuisines?: string[];
  diets?: string[];
  dishTypes?: string[];
}

export interface PantryItem {
  _id: string;
  name: string;
} 