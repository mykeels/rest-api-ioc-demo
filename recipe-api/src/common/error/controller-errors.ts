import httpStatus from "http-status";

interface ControllerErrorHandler {
  handle: (error: unknown) => ControllerError;
}

export interface ControllerError {
  error: { name: string; message?: string };
}

export const mapControllerErrors = (
  mapping: Record<string, number>,
  {
    setStatus,
    logError,
  }: { setStatus: (code: number) => void; logError?: (error: unknown) => void }
): ControllerErrorHandler => {
  logError = logError || console.error;
  mapping = {
    ...mapping,
    ZodError: httpStatus.BAD_REQUEST,
  };

  return {
    handle: (error: unknown) => {
      logError?.(error);
      const name =
        error &&
        typeof error === "object" &&
        "name" in error &&
        typeof error.name === "string" &&
        error.name in mapping
          ? error.name
          : "InternalServerError";
      const message =
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : "Internal Server Error";
      const isHumanReadable =
        error &&
        typeof error === "object" &&
        "isHumanReadable" in error &&
        typeof error.isHumanReadable === "boolean"
          ? error.isHumanReadable
          : false;
      const code =
        (!error ? httpStatus.INTERNAL_SERVER_ERROR : mapping[name]) ||
        httpStatus.INTERNAL_SERVER_ERROR;
      setStatus(code);

      return {
        error: {
          name,
          ...(isHumanReadable ? { message } : {}),
        },
      };
    },
  };
};
