module.exports = {
    preset: 'ts-jest',
    testEnvironment: "node",
    verbose: false,
    testMatch: ["**/?(*.)+(e2e).ts"],
    setupFilesAfterEnv: ["<rootDir>/src/setupE2EJest.ts"],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    }
}