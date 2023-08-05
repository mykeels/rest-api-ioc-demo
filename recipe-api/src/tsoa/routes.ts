/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
  fetchMiddlewares,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IngredientController } from "../domains/ingredient/ingredient.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MealController } from "../domains/meal/meal.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NutrientController } from "../domains/nutrient/nutrient.controller";
import { iocContainer } from "../common/ioc";
import type { IocContainer, IocContainerFactory } from "@tsoa/runtime";
import type { RequestHandler, Router } from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  "Ingredient__name-string__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        nutrients: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: { name: { dataType: "string", required: true } },
          },
        },
        calories: { dataType: "double", required: true },
        name: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TIngredient: {
    dataType: "refAlias",
    type: { ref: "Ingredient__name-string__", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_TIngredient.Exclude_keyofTIngredient.nutrients__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        name: { dataType: "string", required: true },
        calories: { dataType: "double", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_TIngredient.nutrients_": {
    dataType: "refAlias",
    type: {
      ref: "Pick_TIngredient.Exclude_keyofTIngredient.nutrients__",
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Partial_Omit_TIngredient.nutrients__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        name: { dataType: "string" },
        calories: { dataType: "double" },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Meal__name-string__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        ingredients: {
          dataType: "array",
          array: {
            dataType: "nestedObjectLiteral",
            nestedProperties: { name: { dataType: "string", required: true } },
          },
          required: true,
        },
        name: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TMeal: {
    dataType: "refAlias",
    type: { ref: "Meal__name-string__", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_TMeal.Exclude_keyofTMeal.ingredients__": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: { name: { dataType: "string", required: true } },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Omit_TMeal.ingredients_": {
    dataType: "refAlias",
    type: {
      ref: "Pick_TMeal.Exclude_keyofTMeal.ingredients__",
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Nutrients: {
    dataType: "refAlias",
    type: {
      dataType: "union",
      subSchemas: [
        { dataType: "enum", enums: ["Carbohydrates"] },
        { dataType: "enum", enums: ["Protein"] },
        { dataType: "enum", enums: ["Fat"] },
        { dataType: "enum", enums: ["Vitamins"] },
        { dataType: "enum", enums: ["Minerals"] },
        { dataType: "enum", enums: ["Water"] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Nutrient: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: { name: { ref: "Nutrients", required: true } },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TNutrient: {
    dataType: "refAlias",
    type: { ref: "Nutrient", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    "/ingredients",
    ...fetchMiddlewares<RequestHandler>(IngredientController),
    ...fetchMiddlewares<RequestHandler>(
      IngredientController.prototype.getIngredients
    ),

    async function IngredientController_getIngredients(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<IngredientController>(
          IngredientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.getIngredients.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/ingredients/:ingredientId",
    ...fetchMiddlewares<RequestHandler>(IngredientController),
    ...fetchMiddlewares<RequestHandler>(
      IngredientController.prototype.getIngredientById
    ),

    async function IngredientController_getIngredientById(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        ingredientId: {
          in: "path",
          name: "ingredientId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<IngredientController>(
          IngredientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.getIngredientById.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/ingredients",
    ...fetchMiddlewares<RequestHandler>(IngredientController),
    ...fetchMiddlewares<RequestHandler>(
      IngredientController.prototype.createIngredient
    ),

    async function IngredientController_createIngredient(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "Omit_TIngredient.nutrients_",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<IngredientController>(
          IngredientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.createIngredient.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 201, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    "/ingredients/:ingredientId",
    ...fetchMiddlewares<RequestHandler>(IngredientController),
    ...fetchMiddlewares<RequestHandler>(
      IngredientController.prototype.updateIngredient
    ),

    async function IngredientController_updateIngredient(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        ingredientId: {
          in: "path",
          name: "ingredientId",
          required: true,
          dataType: "string",
        },
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "Partial_Omit_TIngredient.nutrients__",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<IngredientController>(
          IngredientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.updateIngredient.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/ingredients/:ingredientId",
    ...fetchMiddlewares<RequestHandler>(IngredientController),
    ...fetchMiddlewares<RequestHandler>(
      IngredientController.prototype.deleteIngredient
    ),

    async function IngredientController_deleteIngredient(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        ingredientId: {
          in: "path",
          name: "ingredientId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<IngredientController>(
          IngredientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.deleteIngredient.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 204, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/meals",
    ...fetchMiddlewares<RequestHandler>(MealController),
    ...fetchMiddlewares<RequestHandler>(MealController.prototype.getMeals),

    async function MealController_getMeals(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<MealController>(
          MealController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.getMeals.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/meals",
    ...fetchMiddlewares<RequestHandler>(MealController),
    ...fetchMiddlewares<RequestHandler>(MealController.prototype.createMeal),

    async function MealController_createMeal(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "Omit_TMeal.ingredients_",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<MealController>(
          MealController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.createMeal.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 201, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/nutrients",
    ...fetchMiddlewares<RequestHandler>(NutrientController),
    ...fetchMiddlewares<RequestHandler>(
      NutrientController.prototype.getNutrients
    ),

    async function NutrientController_getNutrients(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<NutrientController>(
          NutrientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.getNutrients.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/nutrients",
    ...fetchMiddlewares<RequestHandler>(NutrientController),
    ...fetchMiddlewares<RequestHandler>(
      NutrientController.prototype.createNutrient
    ),

    async function NutrientController_createNutrient(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "TNutrient",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer =
          typeof iocContainer === "function"
            ? (iocContainer as IocContainerFactory)(request)
            : iocContainer;

        const controller: any = await container.get<NutrientController>(
          NutrientController
        );
        if (typeof controller["setStatus"] === "function") {
          controller.setStatus(undefined);
        }

        const promise = controller.createNutrient.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, 201, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      "getHeaders" in object && "getStatus" in object && "setStatus" in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === "function" &&
      data.readable &&
      typeof data._read === "function"
    ) {
      response.status(statusCode || 200);
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case "request":
          return request;
        case "query":
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "queries":
          return validationService.ValidateParam(
            args[key],
            request.query,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "path":
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "header":
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "body":
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "body-prop":
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            "body.",
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "formData":
          if (args[key].dataType === "file") {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          } else if (
            args[key].dataType === "array" &&
            args[key].array.dataType === "file"
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          }
        case "res":
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, "");
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
