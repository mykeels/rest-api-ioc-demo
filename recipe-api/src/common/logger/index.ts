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
  warn: <TLoggable extends Loggable>(...args: TLoggable[]) => void;
  error: <TLoggable extends Loggable>(...args: TLoggable[]) => void;

  scope: <TLoggable extends Loggable>(...args: TLoggable[]) => ILogger;
}

export class Logger implements ILogger {
  private scopeRecord: Record<string, any> = {};

  constructor(
    private logger: Pick<
      winston.Logger,
      "info" | "debug" | "warn" | "error"
    > = winston.createLogger({
      transports: [new winston.transports.Console()],
      level: "debug",
    })
  ) {}

  private merge<TLoggable extends Loggable>(...args: TLoggable[]) {
    return args.reduce(
      (dict, arg) => ({
        ...dict,
        ...(typeof arg === "object"
          ? arg
          : { extras: dict.extras.concat(arg) }),
      }),
      { extras: [], ...this.scopeRecord } as { extras: Loggable[] }
    );
  }

  debug<TLoggable extends Loggable>(message: string, ...args: TLoggable[]) {
    this.logger.debug(this.merge({ message } as any, ...args));
  }

  info<TLoggable extends Loggable>(message: string, ...args: TLoggable[]) {
    this.logger.info(this.merge({ message } as any, ...args));
  }

  warn<TLoggable extends Loggable>(...args: TLoggable[]) {
    this.logger.warn(this.merge(...args));
  }

  error<TLoggable extends Loggable>(...args: TLoggable[]) {
    this.logger.error(this.merge(...args));
  }

  scope<TLoggable extends Loggable>(...args: TLoggable[]) {
    Object.assign(this.scopeRecord, this.merge(...args));
    return this;
  }
}
