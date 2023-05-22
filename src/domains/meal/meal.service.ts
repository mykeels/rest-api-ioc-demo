import { injectable } from "inversify";
import { Meal } from "./meal.model";

import { ioc } from "../../common";
import type { IRepository, Model } from "../../common";

/**
 * Dependencies of the MealService
 */
export const deps = {
    repo: "repo:meals"
} as const;

@injectable()
export class MealService<TIngredient extends { name: string }> {
    constructor(public repo = ioc().get<IRepository<Model<Meal<TIngredient>>>>(deps.repo)) {}
}