import mongoose, { Schema } from "mongoose";
import { IRepository, Model } from "../../common";
import { Ingredient } from ".";

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const createIngredientRepository = (
  factory: (name: string, schema: Schema) => IRepository<Model<Ingredient<any>>>
) => factory("ingredients", ingredientSchema);
