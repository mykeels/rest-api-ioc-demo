export type Meal<TIngredient extends { name: string }> = {
    name: string;
    ingredients: TIngredient[];
}