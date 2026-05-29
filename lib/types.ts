export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
}

export interface RecipeInstruction {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface RecipeTip {
  title: string;
  description: string;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutrition: RecipeNutrition;
  tips: RecipeTip[];
  tags: string[];
  alternativeIngredients?: { original: string; alternatives: string[] }[];
}

export interface Recipe extends GeneratedRecipe {
  id: string;
  userId: string;
  imageUrl?: string;
  sourceType: "image" | "voice" | "text";
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedRecipe {
  id: string;
  userId: string;
  recipeId: string;
  recipe: Recipe;
  createdAt: Date;
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
  imageUrl?: string;
  credits: number;
  createdAt: Date;
}

export type RefineMode =
  | "healthier"
  | "spicy"
  | "vegetarian"
  | "high-protein"
  | "budget"
  | "pakistani"
  | "indian"
  | "keto";

export interface GenerateRecipeRequest {
  imageBase64?: string;
  imageMimeType?: string;
  prompt?: string;
  sourceType: "image" | "voice" | "text";
  refineMode?: RefineMode;
  existingRecipe?: GeneratedRecipe;
}
