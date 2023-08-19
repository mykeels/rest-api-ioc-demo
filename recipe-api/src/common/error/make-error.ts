export const makeError = <TErrorName extends string>(
  name: TErrorName,
  message?: string
) => ({
  name,
  message,
  isHumanReadable: true,
});
