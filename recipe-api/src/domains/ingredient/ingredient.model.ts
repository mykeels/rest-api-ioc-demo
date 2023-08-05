export type Ingredient<TNutrient extends { name: string }> = {
    name: string;
    calories: number;
    nutrients?: TNutrient[];
};