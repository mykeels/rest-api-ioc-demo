import { injectable } from "inversify";

import { iocResolver } from "../../common";

@injectable()
export class MealService {
  constructor(public repo = iocResolver.resolve("repo:meals")?.()) {}
}
