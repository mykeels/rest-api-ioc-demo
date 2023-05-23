process.env.DB_TYPE = "mongodb";

import supertest from "supertest";

import { createExpressApp } from "./index";
import { connect } from "./common/db";
import { seed } from "./common/db/seeds";

const app = createExpressApp();

let disconnect: () => Promise<void> = async () => {};

beforeAll(async () => {
  global.api = supertest(app);
  disconnect = await connect();
  await seed();
});

afterAll(async () => {
  await disconnect();
});
