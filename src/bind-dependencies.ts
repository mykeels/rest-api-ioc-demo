import { Schema } from "mongoose";

import { ioc, IRepository, Model, MongoDBRepository } from "./common";
import { deps, Ingredient, Nutrient, Meal } from "./domains";
import { createIngredientRepository } from "./domains/ingredient/ingredient.repo";
import { createNutrientRepository } from "./domains/nutrient/nutrient.repo";
import { createMealRepository } from "./domains/meal/meal.repo";

const RepositoryFactory = (name: string, schema: Schema) =>
  new MongoDBRepository(name, schema) as IRepository<any>;

ioc()
  .bind<typeof RepositoryFactory>("repo:factory")
  .toConstantValue(RepositoryFactory);
ioc()
  .bind<IRepository<Model<Ingredient<any>>>>(deps.ingredient.repo)
  .toDynamicValue(() => createIngredientRepository(RepositoryFactory));
ioc()
  .bind<IRepository<Model<Nutrient>>>(deps.nutrient.repo)
  .toDynamicValue(() => createNutrientRepository(RepositoryFactory));
ioc()
  .bind<IRepository<Model<Meal<any>>>>(deps.meal.repo)
  .toDynamicValue(() => createMealRepository(RepositoryFactory));
