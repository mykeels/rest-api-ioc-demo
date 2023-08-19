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
import { Nutrient } from "./nutrient.model";
import { IRepository, Model, iocResolver } from "../../common";

type TNutrient = Nutrient;
type TService = {
  repo: IRepository<Model<TNutrient>>;
};

@Route("nutrients")
export class NutrientController extends Controller {
  constructor(
    private readonly service: TService = iocResolver.resolve(
      "service:nutrients"
    )?.()
  ) {
    super();
  }

  @Get()
  public async getNutrients(): Promise<TNutrient[]> {
    return this.service.repo.all({});
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createNutrient(
    @Body() requestBody: TNutrient
  ): Promise<TNutrient> {
    this.setStatus(201); // set return status 201
    return this.service.repo.create(requestBody);
  }

  @Get("{nutrientId}")
  public async getNutrientById(@Path() nutrientId: string): Promise<TNutrient> {
    return this.service.repo.byQuery({ _id: nutrientId });
  }

  @Patch("{nutrientId}")
  public async updateNutrient(
    @Path() nutrientId: string,
    @Body() requestBody: Partial<TNutrient>
  ): Promise<TNutrient> {
    return this.service.repo.update({ _id: nutrientId }, requestBody);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{nutrientId}")
  public async deleteNutrient(@Path() nutrientId: string): Promise<void> {
    await this.service.repo.delete({ _id: nutrientId });
  }
}
