declare module globalThis {
    var api: import("supertest").SuperTest<import("supertest").Test>;
}