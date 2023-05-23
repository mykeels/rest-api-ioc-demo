process.env.DB_TYPE = "mongodb"

import supertest from "supertest";

import { createExpressApp } from "./index";
import { connect } from "./common/db"

const app = createExpressApp();

let disconnect: () => Promise<void> = async () => {};

beforeAll(async () => {
    global.api = supertest(app);
    disconnect = await connect();
});

afterAll(async () => {
    await disconnect();
})