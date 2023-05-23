import "reflect-metadata";
import "./controllers";
import "./bind-dependencies";
import { config } from "dotenv";

import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./tsoa/routes";
import { connect } from "./common/db";

config();

export function createExpressApp(): express.Express {
  const app = express();

  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());

  RegisterRoutes(app);

  app.use(function (req, res, next) {
    console.log("Request:", req.method, req.path);
    next();
  });

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
