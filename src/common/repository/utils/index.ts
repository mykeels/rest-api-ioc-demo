export const makeError = (
    message: string,
    name?: string,
    cause?: any
): Error => {
    const error = new Error(message);
    if (name) {
        error.name = name;
    }
    if (cause) {
        error.cause = cause;
    }
    return error;
};
