import "reflect-metadata";
import "./controllers";
import "./bind-dependencies";
import { config } from "dotenv";

import express, { json, urlencoded } from "express";
import httpContext from "express-http-context";
import { RegisterRoutes } from "./tsoa/routes";
import { connect } from "./common/db";
import { handleError } from "./handle-error";
import { requestIdMiddleware } from "./common/middlewares";

config();

export function createExpressApp(): express.Express {
  const app = express();

  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());
  app.use(httpContext.middleware);
  app.use(requestIdMiddleware);

  RegisterRoutes(app);

  handleError(app);

  return app;
}

function serve(app: express.Express) {
  const port = process.env.PORT || 3000;

  connect();

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
}

if (require.main === module) {
  serve(createExpressApp());
}
