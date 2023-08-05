import {
  deps as IngredientDependencies,
  IngredientService,
  Ingredient,
} from "./ingredient";
import { deps as MealDependencies, MealService, Meal } from "./meal";
import {
  deps as NutrientDependencies,
  NutrientService,
  Nutrient,
} from "./nutrient";

export {
  IngredientService,
  MealService,
  NutrientService,
  Ingredient,
  Meal,
  Nutrient,
};

export const deps = {
  ingredient: IngredientDependencies,
  meal: MealDependencies,
  nutrient: NutrientDependencies,
} as const;
