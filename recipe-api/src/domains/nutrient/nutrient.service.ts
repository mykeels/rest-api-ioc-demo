import { injectable } from "inversify";

import { iocResolver } from "../../common";

@injectable()
export class NutrientService {
  constructor(public repo = iocResolver.resolve("repo:nutrients")?.()) {}
}
