import ShortUniqueId from "short-unique-id";
import type { NextFunction, Request, Response } from "express";
import { iocResolver } from "..";

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  { logger = iocResolver.resolve("logger") } = {}
) => {
  const uid = new ShortUniqueId({ length: 10 });
  const id = uid();
  req.id = id;
  req.headers["x-request-id"] = id;
  logger.scope({
    request: {
      id,
    },
  });
  logger.debug("Request", {
    request: {
      id,
      method: req.method,
      url: req.url,
    },
  });
  next();
};
