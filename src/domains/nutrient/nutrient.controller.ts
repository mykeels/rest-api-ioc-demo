import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";
import { Nutrient } from "./nutrient.model";
import { deps as NutrientServiceDeps } from "./nutrient.service";
import { inject } from "inversify";
import { IRepository, Model } from "../../common";

type TNutrient = Nutrient;
type TService = {
  repo: IRepository<Model<TNutrient>>;
};

@Route("nutrients")
export class NutrientController extends Controller {
  constructor(
    @inject(NutrientServiceDeps.service) private readonly service: TService
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
}
