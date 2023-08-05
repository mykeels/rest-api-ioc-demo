import { Container, decorate, injectable, interfaces } from "inversify";
import {
  buildProviderModule,
  fluentProvide,
} from "inversify-binding-decorators";
import { Controller } from "tsoa";

export const ioc = new Container({
  autoBindInjectable: true,
});

export const iocContainer = ioc;

decorate(injectable(), Controller);

iocContainer.load(buildProviderModule());

export const singleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inSingletonScope().done();
};
