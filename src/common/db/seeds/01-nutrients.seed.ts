import { MongoDBRepository } from "../..";
import { createNutrientRepository } from "../../../domains/nutrient/nutrient.repo";

export async function seed(): Promise<void> {
  const repo = createNutrientRepository(
    (name, schema) => new MongoDBRepository(name, schema)
  );
  await repo.deleteMany({});
  const nutrients = [
    "Carbohydrates",
    "Protein",
    "Fat",
    "Vitamins",
    "Minerals",
    "Water",
  ];
  await Promise.all(
    nutrients.map((nutrient) => repo.create({ name: nutrient as any }))
  );
  console.log("Seeded nutrients");
}
