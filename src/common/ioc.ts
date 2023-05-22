import { Container } from "inversify";

let _ioc: Container | null = null;

export const ioc = (container = new Container()) => {
    if (!_ioc) {
        _ioc = container
    }

    return _ioc;
};

ioc.set = (container: Container) => {
    _ioc = container;
}
