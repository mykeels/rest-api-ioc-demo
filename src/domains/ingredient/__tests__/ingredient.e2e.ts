import { SuperTest, Test, Request, Response } from "supertest";
import { loadFeature, defineFeature } from "jest-cucumber";

let api: SuperTest<Test>;
beforeEach(async () => {
    api = global.api;
})

const feature = loadFeature("../user.feature", {
    loadRelativePath: true
});

defineFeature(feature, scenario => {
    scenario("User can sign up", ({ given, when, then }) => {
        let request: Promise<Response>
        let response: Promise<Request>

        given("I am a new user", () => { })

        when("I sign up", async () => { })

        then("I should be able to sign in", async () => { })
    })
})