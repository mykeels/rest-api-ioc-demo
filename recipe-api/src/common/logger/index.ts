import winston from "winston";

type Loggable = object | string | number | boolean | symbol;

export interface ILogger {
  debug: <TLoggable extends Loggable>(
    message: string,
    ...args: TLoggable[]
  ) => void;
  info: <TLoggable extends Loggable>(
    message: string,
    ...args: TLoggable[]
  ) => void;
  warn: <TLoggable extends Loggable | Error>(...args: TLoggable[]) => void;
  error: <TLoggable extends Loggable | Error>(...args: TLoggable[]) => void;

  scope: <TLoggable extends Loggable>(...args: TLoggable[]) => ILogger;
}

export class Logger implements ILogger {
  private scopeRecord: Record<string, any> = {};

  constructor(
    private logger: Pick<winston.Logger, "log"> = winston.createLogger({
      transports: [new winston.transports.Console()],
      level: "debug",
    })
  ) {}

  private merge<TLoggable extends Loggable>(...args: TLoggable[]) {
    return args.reduce(
      (dict, arg) => ({
        ...dict,
        ...(Array.isArray(arg)
          ? {
              extras: ("extras" in dict && Array.isArray(dict.extras)
                ? dict.extras
                : []
              ).concat(arg),
            }
          : arg instanceof Error
          ? {
              errors: ("errors" in dict && Array.isArray(dict.errors)
                ? dict.errors
                : []
              ).concat(arg.stack),
            }
          : typeof arg === "object"
          ? arg
          : {
              extras: ("extras" in dict && Array.isArray(dict.extras)
                ? dict.extras
                : []
              ).concat(arg),
            }),
      }),
      this.scopeRecord
    );
  }

  debug<TLoggable extends Loggable>(message: string, ...args: TLoggable[]) {
    this.logger.log("debug", this.merge({ message } as any, ...args));
  }

  info<TLoggable extends Loggable>(message: string, ...args: TLoggable[]) {
    this.logger.log("info", this.merge({ message } as any, ...args));
  }

  warn<TLoggable extends Loggable | Error>(...args: TLoggable[]) {
    this.logger.log("warn", this.merge(...args));
  }

  error<TLoggable extends Loggable | Error>(...args: TLoggable[]) {
    this.logger.log("error", this.merge(...args));
  }

  scope<TLoggable extends Loggable>(...args: TLoggable[]) {
    Object.assign(this.scopeRecord, this.merge(...args));
    return this;
  }
}
