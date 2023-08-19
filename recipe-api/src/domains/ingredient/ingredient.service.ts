import { injectable } from "inversify";
import { ioc } from "../../common";

const resolve = (): ServiceResolver => ioc.get("resolve");

@injectable()
export class IngredientService {
  constructor(public repo = resolve()("repo:ingredients")?.()) {}
}
