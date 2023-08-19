import { buildProviderModule } from "inversify-binding-decorators";

import { ioc } from "./ioc";

export const iocContainer = ioc;

iocContainer.load(buildProviderModule());

export * from "./bind";
export * from "./ioc";
