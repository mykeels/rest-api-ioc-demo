import httpStatus from "http-status";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
} from "tsoa";
import { Ingredient } from "./ingredient.model";
import { IRepository, Model, iocResolver } from "../../common";
import { ControllerError, mapControllerErrors } from "../../common/error";
import { Errors } from "./ingredient.service";

type TIngredient = Ingredient<{ name: string }>;
type TService = {
  repo: IRepository<Model<TIngredient>>;
  getIngredients: () => Promise<Ingredient<{ name: string }>[]>;
};

@Route("ingredients")
export class IngredientController extends Controller {
  private errors = mapControllerErrors(
    {
      [Errors.ValidationError.name]: httpStatus.BAD_REQUEST,
      [Errors.IngredientConflictError.name]: httpStatus.CONFLICT,
      [Errors.IngredientDoesNotTasteGoodError.name]: httpStatus.FORBIDDEN,
    },
    {
      setStatus: this.setStatus.bind(this),
    }
  );

  constructor(
    private service: TService = iocResolver.resolve("service:ingredients")?.(),
    private logger = iocResolver.resolve("logger")
  ) {
    super();
  }

  @Get()
  @Response<ControllerError>(400, "Bad Request e.g.")
  @Response<ControllerError>(
    403,
    `Forbidden e.g. ${[Errors.IngredientDoesNotTasteGoodError.name].join(", ")}`
  )
  public async getIngredients(): Promise<TIngredient[] | ControllerError> {
    try {
      this.logger.debug("controller:getIngredients");
      return await this.service.getIngredients();
    } catch (err) {
      return this.errors.handle(err);
    }
  }

  @Get("{ingredientId}")
  public async getIngredientById(
    @Path() ingredientId: string
  ): Promise<TIngredient | ControllerError> {
    try {
      return await this.service.repo.byQuery({ _id: ingredientId });
    } catch (err) {
      return this.errors.handle(err);
    }
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createIngredient(
    @Body() requestBody: Omit<TIngredient, "nutrients">
  ): Promise<TIngredient | ControllerError> {
    try {
      this.setStatus(201); // set return status 201
      return await this.service.repo.create(requestBody);
    } catch (err) {
      return this.errors.handle(err);
    }
  }

  @Patch("{ingredientId}")
  public async updateIngredient(
    @Path() ingredientId: string,
    @Body() requestBody: Partial<Omit<TIngredient, "nutrients">>
  ): Promise<TIngredient | ControllerError> {
    try {
      return await this.service.repo.update({ _id: ingredientId }, requestBody);
    } catch (err) {
      return this.errors.handle(err);
    }
  }

  @SuccessResponse("204", "No Content")
  @Delete("{ingredientId}")
  public async deleteIngredient(
    @Path() ingredientId: string
  ): Promise<void | ControllerError> {
    try {
      await this.service.repo.delete({ _id: ingredientId });
    } catch (err) {
      return this.errors.handle(err);
    }
  }
}
