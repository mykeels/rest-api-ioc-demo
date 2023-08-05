import { MongoDBRepository } from "../..";
import { createMealRepository } from "../../../domains/meal/meal.repo";

export async function seed(): Promise<void> {
  const repo = createMealRepository(
    (name, schema) => new MongoDBRepository(name, schema)
  );
  await repo.deleteMany({});
  // list of meals and their ingredients
  const meals = [
    {
      name: "Fried Rice",
      ingredients: ["Rice", "Carrot", "Egg", "Chicken", "Water", "Oil"],
    },
  ] as const;
  await Promise.all(
    meals.map((meal) =>
      repo.create({
        name: meal.name,
        ingredients: meal.ingredients as any,
      })
    )
  );
  console.log("Seeded meals");
}
