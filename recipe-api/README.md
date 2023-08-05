# Rest API IoC Demo

Written to demonstrate how API projects built with NodeJS can be structured for a much better developer experience than is usually seen in the wild.

This API will demonstrate:

- [x] Proper Dependency Inversion
  - Every service is independent of other services
  - No service imports another.
- [x] Proper folder structure
  - Code is grouped according to business domains. 
  - Only common logic lives outside this heirarchy, in a common folder.
- [x] Inversion of Control (IoC)
  - Instead of depending directly on another service, all dependencies are on abstractions, serviced by an IoC container.
- [x] OpenAPI schema is accurately auto-generated
- [x] Use gherkin specifications for End-to-end (E2E) tests

## Setup Locally

Run:

```sh
docker-compose up -d # to start the mongodb server
pnpm i
pnpm generate:routes # to generate the API routes and OpenAPI spec in dist/swagger.json
pnpm db:seed # to seed the DB
pnpm dev # to run the server
```

## Development

Everytime you make a change, you need to run `pnpm generate:routes` to ensure the new tsoa routes are updated.

## Testing

This project relies on End-to-end (E2E) tests, which can be run with:

```sh
pnpm e2e
```
