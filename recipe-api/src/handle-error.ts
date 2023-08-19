import { Request, Response, NextFunction, Express } from "express";
import { ValidateError } from "tsoa";

export function handleError(app: Express) {
  app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    console.error(err);
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    next();
  });
}
