import { Logger } from "../index";

describe("Logger", () => {
  // Tests that the Logger class can be instantiated with default options
  it("should be able to instantiate Logger with default options", () => {
    const logger = new Logger();
    expect(logger).toBeInstanceOf(Logger);
  });

  // Tests that the debug method can be called with a message and optional extra arguments
  it("should call debug method with message and optional extra arguments", () => {
    const debugSpy = jest.fn();
    const logger = new Logger({
      log: debugSpy,
    } as any);
    logger.debug("Debug message", "extra1", "extra2");
    expect(debugSpy).toHaveBeenCalledWith("debug", {
      message: "Debug message",
      extras: ["extra1", "extra2"],
    });
  });

  // Tests that the info method can be called with a message and optional extra arguments
  it("should call info method with message and optional extra arguments", () => {
    const infoSpy = jest.fn();
    const logger = new Logger({
      log: infoSpy,
    } as any);
    logger.info("Info message", "extra1", "extra2");
    expect(infoSpy).toHaveBeenCalledWith("info", {
      message: "Info message",
      extras: ["extra1", "extra2"],
    });
  });

  // Tests that the warn method can be called with optional extra arguments
  it("should call warn method with optional extra arguments", () => {
    const warnSpy = jest.fn();
    const logger = new Logger({
      log: warnSpy,
    } as any);
    logger.warn("extra1", "extra2");
    expect(warnSpy).toHaveBeenCalledWith("warn", {
      extras: ["extra1", "extra2"],
    });
  });

  // Tests that the error method can be called with optional extra arguments
  it("should call error method with optional extra arguments", () => {
    const errorSpy = jest.fn();
    const logger = new Logger({
      log: errorSpy,
    } as any);
    logger.error("extra1", "extra2");
    expect(errorSpy).toHaveBeenCalledWith("error", {
      extras: ["extra1", "extra2"],
    });
  });

  // Tests that the scope method can be called with optional extra arguments and returns the Logger instance
  it("should call scope method with optional extra arguments and return Logger instance", () => {
    const debugSpy = jest.fn();
    const logger = new Logger({
      log: debugSpy,
    } as any);
    logger.scope("extra1", "extra2");
    logger.debug("Debug message", "extra3");
    expect(debugSpy).toHaveBeenCalledWith("debug", {
      message: "Debug message",
      extras: ["extra1", "extra2", "extra3"],
    });
  });
});
