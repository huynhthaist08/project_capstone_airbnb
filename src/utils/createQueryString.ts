import { stringify } from "qs";

export const createQueryString = (obj: Record<string, unknown>) => {
    const _obj = structuredClone(obj);

    for (const key in _obj) {
        if (_obj[key] === "") {
            delete _obj[key];
        }
    }

    return stringify(_obj, {
        addQueryPrefix: true,
        skipNulls: true,
        encode: true,
    });
};
