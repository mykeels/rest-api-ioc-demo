import {
    Body,
    Controller,
    Get,
    Post,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Meal } from "./meal.model";
  import { deps as MealServiceDeps } from "./meal.service";
import { inject } from "inversify";
import { IRepository, Model } from "../../common";

  type TMeal = Meal<{ name: string }>;
  type TService = {
    repo: IRepository<Model<TMeal>>;
  }
  
  @Route("meals")
  export class MealController extends Controller {
    constructor(
        @inject(MealServiceDeps.repo) private readonly service: TService
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
  }