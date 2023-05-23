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
- [x] OpenAPI schema is auto-generated
- [x] Use gherkin specifications for E2E tests
