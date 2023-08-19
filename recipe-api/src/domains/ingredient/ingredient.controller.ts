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
import { Ingredient } from "./ingredient.model";
import { IRepository, Model, iocResolver } from "../../common";

type TIngredient = Ingredient<{ name: string }>;
type TService = {
  repo: IRepository<Model<TIngredient>>;
};

@Route("ingredients")
export class IngredientController extends Controller {
  constructor(
    private service: TService = iocResolver.resolve("service:ingredients")?.()
  ) {
    super();
  }

  @Get()
  public async getIngredients(): Promise<TIngredient[]> {
    return this.service.repo.all({});
  }

  @Get("{ingredientId}")
  public async getIngredientById(
    @Path() ingredientId: string
  ): Promise<TIngredient> {
    return this.service.repo.byQuery({ _id: ingredientId });
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createIngredient(
    @Body() requestBody: Omit<TIngredient, "nutrients">
  ): Promise<TIngredient> {
    this.setStatus(201); // set return status 201
    return this.service.repo.create(requestBody);
  }

  @Patch("{ingredientId}")
  public async updateIngredient(
    @Path() ingredientId: string,
    @Body() requestBody: Partial<Omit<TIngredient, "nutrients">>
  ): Promise<TIngredient> {
    return this.service.repo.update({ _id: ingredientId }, requestBody);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{ingredientId}")
  public async deleteIngredient(@Path() ingredientId: string): Promise<void> {
    await this.service.repo.delete({ _id: ingredientId });
  }
}
