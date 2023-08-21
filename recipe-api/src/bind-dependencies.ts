import { Schema } from "mongoose";

import {
  bind,
  register,
  IRepository,
  MongoDBRepository,
  scope,
} from "./common";
import { NutrientService, MealService, IngredientService } from "./domains";
import { createIngredientRepository } from "./domains/ingredient/ingredient.repo";
import { createNutrientRepository } from "./domains/nutrient/nutrient.repo";
import { createMealRepository } from "./domains/meal/meal.repo";
import { Logger } from "./common/logger";

const RepositoryFactory = (name: string, schema: Schema) =>
  new MongoDBRepository(name, schema) as IRepository<any>;

export const resolve = register([
  bind("repo:factory", RepositoryFactory),
  bind("repo:ingredients", () => createIngredientRepository(RepositoryFactory)),
  bind(
    "service:ingredients",
    () => new IngredientService(resolve("repo:ingredients")?.())
  ),
  bind("repo:nutrients", () => createNutrientRepository(RepositoryFactory)),
  bind(
    "service:nutrients",
    () => new NutrientService(resolve("repo:nutrients")?.())
  ),
  bind("repo:meals", () => createMealRepository(RepositoryFactory)),
  bind("service:meals", () => new MealService(resolve("repo:meals")?.())),
  scope("logger", () => new Logger()),
]);

bind("resolve", resolve);

export type ServiceResolver = typeof resolve;
