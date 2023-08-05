import dotenv from "dotenv";

dotenv.config();

import { connect } from "..";
import { seed as seedNutrients } from "./01-nutrients.seed";
import { seed as seedIngredients } from "./02-ingredients.seed";
import { seed as seedMeals } from "./03-meal.seed";

export async function seed(): Promise<void> {
  await seedNutrients();
  await seedIngredients();
  await seedMeals();
}

if (require.main === module) {
  (async () => {
    await connect();
    await seed();
    process.exit(0);
  })();
}
