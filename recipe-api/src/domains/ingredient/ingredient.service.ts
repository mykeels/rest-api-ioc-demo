import { injectable } from "inversify";
import { Ingredient } from "./ingredient.model";

import { ioc } from "../../common";
import type { IRepository, Model } from "../../common";

/**
 * Dependencies of the IngredientService
 */
export const deps = {
  repo: "repo:ingredients",
  service: "service:ingredients",
} as const;

@injectable()
export class IngredientService<TNutrient extends { name: string }> {
  constructor(
    public repo = ioc.get<IRepository<Model<Ingredient<TNutrient>>>>(deps.repo)
  ) {}
}
