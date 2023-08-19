import { makeError } from "./make-error";

export type ServiceError = { name: string; message?: string };

interface ServiceErrorHandler {
  handle: (error: unknown) => ServiceError;
}

export const mapServiceErrors = (
  mapping: Record<string, ReturnType<typeof makeError>>,
  { logError }: { logError?: (error: unknown) => void } = {}
): ServiceErrorHandler => {
  logError = logError || console.error;
  mapping = {
    ...mapping,
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
      return (
        mapping[name] || {
          name,
          ...(isHumanReadable ? { message } : {}),
        }
      );
    },
  };
};
