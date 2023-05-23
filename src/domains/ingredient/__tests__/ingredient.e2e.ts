import { SuperTest, Test, Request, Response } from "supertest";
import { loadFeature, defineFeature } from "jest-cucumber";

let api: SuperTest<Test>;
beforeEach(async () => {
  api = global.api;
});

const feature = loadFeature("../ingredient.feature", {
  loadRelativePath: true,
});

defineFeature(feature, (scenario) => {
  scenario("Create an ingredient", ({ given, when, then }) => {
    let request: Request;
    let response: Response;

    given("I have an ingredient with the following attributes", () => {
      request = api.post("/ingredients").send({
        name: "Yam",
        nutrients: ["Carbohydrates"],
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

    given("I have an existing ingredient", () => {
      request = api.patch("/ingredients/1");
    });

    when("I update the ingredient with the following attributes", async () => {
      response = await request;
    });

    then("I should get a response with status code 200", async () => {
      expect(response.status).toBe(200);
    });

    and("the response should contain the updated ingredient", async () => {
      expect(response.status).toBe(200);
    });
  });

  scenario("Delete an existing ingredient", ({ given, when, then }) => {
    let request: Request;
    let response: Response;

    given("I have an existing ingredient", () => {
      request = api.delete("/ingredients/1");
    });

    when("I delete the ingredient", async () => {
      response = await request;
    });

    then("I should get a response with status code 204", async () => {
      expect(response.status).toBe(204);
    });
  });
});
