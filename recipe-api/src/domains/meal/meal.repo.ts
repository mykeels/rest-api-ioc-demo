import { Schema } from "mongoose";
import { Meal } from ".";
import { IRepository, Model } from "../../common";

export const mealSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const createMealRepository = (
  factory: (name: string, schema: Schema) => IRepository<Model<Meal<any>>>
) => factory("meals", mealSchema);