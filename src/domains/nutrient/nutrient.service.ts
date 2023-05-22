import { injectable } from "inversify";
import { Nutrient } from "./nutrient.model";

import { ioc } from "../../common";
import type { IRepository, Model } from "../../common";

/**
 * Dependencies of the NutrientService
 */
export const deps = {
    repo: "repo:nutrients"
} as const;

@injectable()
export class NutrientService {
    constructor(public repo = ioc().get<IRepository<Model<Nutrient>>>(deps.repo)) {}
}