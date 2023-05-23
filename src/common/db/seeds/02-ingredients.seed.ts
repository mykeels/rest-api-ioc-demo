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
      nutrients: ["Vitamins", "Minerals"],
    },
    {
      name: "Yam",
      nutrients: ["Carbohydrates"],
    },
    {
      name: "Egg",
      nutrients: ["Protein"],
    },
    {
      name: "Chicken",
      nutrients: ["Protein"],
    },
  ] as const;
  await Promise.all(
    ingredients.map((ingredient) =>
      repo.create({
        name: ingredient.name,
        nutrients: ingredient.nutrients as any,
      })
    )
  );
  console.log("Seeded ingredients");
}
