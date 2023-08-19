import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
} from "tsoa";
import { Meal } from "./meal.model";
import { IRepository, Model, iocResolver } from "../../common";

type TMeal = Meal<{ name: string }>;
type TService = {
  repo: IRepository<Model<TMeal>>;
};

@Route("meals")
export class MealController extends Controller {
  constructor(
    private readonly service: TService = iocResolver.resolve(
      "service:meals"
    )?.()
  ) {
    super();
  }

  @Get()
  public async getMeals(): Promise<TMeal[]> {
    return this.service.repo.all({});
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createMeal(
    @Body() requestBody: Omit<TMeal, "ingredients">
  ): Promise<TMeal> {
    this.setStatus(201); // set return status 201
    return this.service.repo.create(requestBody);
  }

  @Get("{mealId}")
  public async getMealById(@Path() mealId: string): Promise<TMeal> {
    return this.service.repo.byQuery({ _id: mealId });
  }

  @Patch("{mealId}")
  public async updateMeal(
    @Path() mealId: string,
    @Body() requestBody: Partial<Omit<TMeal, "ingredients">>
  ): Promise<TMeal> {
    return this.service.repo.update({ _id: mealId }, requestBody);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{mealId}")
  public async deleteMeal(@Path() mealId: string): Promise<void> {
    await this.service.repo.delete({ _id: mealId });
  }
}
