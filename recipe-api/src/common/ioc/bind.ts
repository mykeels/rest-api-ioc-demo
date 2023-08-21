import httpContext from "express-http-context";
import { ioc } from "./ioc";

export function bind<TKey extends string, TService>(
  key: TKey,
  service: TService,
  scope?: "singleton"
): readonly [TKey, () => TService];
export function bind<TKey extends string, TService>(
  key: TKey,
  service: () => TService,
  scope?: "request"
): readonly [TKey, () => TService];
export function bind<TKey extends string, TService>(
  key: TKey,
  service: TService | (() => TService),
  scope: "singleton" | "request" = "singleton"
) {
  if (scope === "singleton") {
    return bindToSingletonScope(key, service as TService);
  } else {
    return bindToRequestScope(key, service as () => TService);
  }
}

const bindToSingletonScope = <TKey extends string, TService>(
  key: TKey,
  service: TService
) => {
  ioc.bind<TService>(key).toConstantValue(service as TService);
  return [key, () => ioc.get<TService>(key)] as const;
};

const bindToRequestScope = <TKey extends string, TService>(
  key: TKey,
  service: () => TService
) => {
  ioc.bind<TService>(key).toDynamicValue(service).inRequestScope();
  return [
    key,
    () => {
      const scopedKey = `ioc:scoped:${key}`;
      const scopedService = httpContext.get(scopedKey);
      if (scopedService) {
        return scopedService as TService;
      }
      const service = ioc.get<TService>(key);
      httpContext.set(scopedKey, service);
      return service;
    },
  ] as const;
};

export const register = <TMapping extends readonly [string, () => any]>(
  services: readonly TMapping[]
) => {
  type TKey = TMapping[0];
  const mapping = Object.fromEntries(services) as {
    [K in TKey]: Extract<TMapping, readonly [K, any]>[1];
  };

  return <TOtherKey extends TMapping[0]>(
    key: TOtherKey
  ): (typeof mapping)[TOtherKey] extends () => infer TService
    ? TService
    : never => {
    const fn = mapping[key];
    return fn();
  };
};

export const iocResolver = new Proxy(
  {
    resolve: {} as ServiceResolver,
  },
  {
    get: () => ioc.get("resolve"),
  }
);
