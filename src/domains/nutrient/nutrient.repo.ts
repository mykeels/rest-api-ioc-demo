import { Schema } from "mongoose";
import { Nutrient } from ".";
import { IRepository, Model } from "../../common";

export const nutrientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const createNutrientRepository = (
  factory: (name: string, schema: Schema) => IRepository<Model<Nutrient>>
) => factory("nutrients", nutrientSchema);