import { MongoDBRepository } from "../..";
import { createIngredientRepository } from "../../../domains/ingredient/ingredient.repo";

export async function seed(): Promise<void> {
  const repo = createIngredientRepository(
    (name, schema) => new MongoDBRepository(name, schema)
  );
  await repo.deleteMany({});
  const ingredients = [
    {
      name: "Carrot",
      calories: 41,
      nutrients: ["Vitamins", "Minerals"],
    },
    {
      name: "Yam",
      calories: 41,
      nutrients: ["Carbohydrates"],
    },
    {
      name: "Egg",
      calories: 41,
      nutrients: ["Protein"],
    },
    {
      name: "Chicken",
      calories: 41,
      nutrients: ["Protein"],
    },
  ] as const;
  await Promise.all(
    ingredients.map((ingredient) => repo.create(ingredient as any))
  );
  console.log("Seeded ingredients");
}
