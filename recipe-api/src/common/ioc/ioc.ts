import { Container, decorate, injectable, interfaces } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Controller } from "tsoa";

export const ioc = new Container({
  autoBindInjectable: true,
});

decorate(injectable(), Controller);

export const singleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inSingletonScope().done();
};
