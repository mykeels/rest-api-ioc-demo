import { SuperTest, Test, Request, Response } from "supertest";
import { loadFeature, defineFeature } from "jest-cucumber";
import { Ingredient } from "..";
import { createIngredientRepository } from "../ingredient.repo";
import { Model, MongoDBRepository } from "../../../common";

let api: SuperTest<Test>;
beforeEach(async () => {
  api = global.api;
});

const feature = loadFeature("../ingredient.feature", {
  loadRelativePath: true,
});

const repo = createIngredientRepository(
  (name, schema) => new MongoDBRepository(name, schema)
);

defineFeature(feature, (scenario) => {
  scenario("Create an ingredient", ({ given, when, then }) => {
    let request: Request;
    let response: Response;

    given("I have an ingredient with the following attributes", () => {
      request = api.post("/ingredients").send({
        name: "Yam",
        calories: 118,
      });
    });

    when("I create the ingredient", async () => {
      response = await request;
    });

    then("I should get a response with status code 201", async () => {
      expect(response.status).toBe(201);
    });
  });

  scenario("Retrieve a list of ingredients", ({ given, when, then, and }) => {
    let request: Request;
    let response: Response;

    given("I have a list of ingredients", () => {
      request = api.get("/ingredients");
    });

    when("I retrieve the list of ingredients", async () => {
      response = await request;
    });

    then("I should get a response with status code 200", async () => {
      expect(response.status).toBe(200);
    });

    and("the response should contain a list of ingredients", async () => {
      expect(response.status).toBe(200);
    });
  });

  scenario("Update an existing ingredient", ({ given, when, then, and }) => {
    let request: Request;
    let response: Response;
    let existingIngredient: Model<Ingredient<any>> | null = null;

    given("I have an existing ingredient", async () => {
      existingIngredient = await repo.byQuery({});
      request = api.patch(`/ingredients/${existingIngredient._id}`).send({
        name: `Updated ${existingIngredient.name}`,
      });
    });

    when("I update the ingredient with the following attributes", async () => {
      response = await request;
    });

    then("I should get a response with status code 200", async () => {
      expect(response.status).toBe(200);
    });

    and("the response should contain the updated ingredient", async () => {
      expect(response.body.name).toEqual(`Updated ${existingIngredient?.name}`);
    });
  });

  scenario("Delete an existing ingredient", ({ given, when, then }) => {
    let request: Request;
    let response: Response;
    let existingIngredient: Model<Ingredient<any>> | null = null;

    given("I have an existing ingredient", async () => {
      existingIngredient = await repo.byQuery({});
      request = api.delete(`/ingredients/${existingIngredient._id}`);
    });

    when("I delete the ingredient", async () => {
      response = await request;
    });

    then("I should get a response with status code 204", async () => {
      expect(response.status).toBe(204);
    });
  });
});
