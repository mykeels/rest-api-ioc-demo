import {
    Body,
    Controller,
    Get,
    Post,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Ingredient } from "./ingredient.model";
  import { deps as IngredientServiceDeps } from "./ingredient.service";
import { inject } from "inversify";
import { IRepository, Model } from "../../common";

  type TIngredient = Ingredient<{ name: string }>;
  type TService = {
    repo: IRepository<Model<TIngredient>>;
  }
  
  @Route("ingredients")
  export class IngredientController extends Controller {
    constructor(
        @inject(IngredientServiceDeps.repo) private readonly service: TService
    ) {
        super();
    }

    @Get()
    public async getIngredients(): Promise<TIngredient[]> {
      return this.service.repo.all({});
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createIngredient(
      @Body() requestBody: Omit<TIngredient, "nutrients">
    ): Promise<TIngredient> {
      this.setStatus(201); // set return status 201
      return this.service.repo.create(requestBody);
    }
  }