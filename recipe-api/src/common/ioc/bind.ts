import { ioc } from "./ioc";

export const bind = <TKey extends string, TService>(
  key: TKey,
  service: TService
) => {
  ioc.bind<TService>(key).toConstantValue(service);
  return [key, () => ioc.get<TService>(key)] as const;
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
