import { injectable } from "inversify";
import { iocResolver } from "../../common";
import { makeError, mapServiceErrors } from "../../common/error";
import { Ingredient } from "./ingredient.model";

export const Errors = {
  ValidationError: makeError("ValidationError", "Validation error"),
  IngredientConflictError: makeError(
    "IngredientConflictError",
    "Ingredient already exists"
  ),
  IngredientDoesNotTasteGoodError: makeError(
    "IngredientDoesNotTasteGoodError",
    "Ingredient does not taste good"
  ),
};

@injectable()
export class IngredientService {
  private errors = mapServiceErrors({
    DBError: Errors.IngredientDoesNotTasteGoodError,
    ValidationError: Errors.ValidationError,
    MongoError: Errors.IngredientConflictError,
  });

  constructor(public repo = iocResolver.resolve("repo:ingredients")?.()) {}

  public async getIngredients(): Promise<Ingredient<{ name: string }>[]> {
    try {
      return await this.repo.all({});
    } catch (err: unknown) {
      throw this.errors.handle(err);
    }
  }
}
