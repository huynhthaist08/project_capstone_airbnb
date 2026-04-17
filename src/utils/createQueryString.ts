// Chuyển object thành chuỗi query (?key=value&...) để gắn vào URL khi gọi API phân trang/tìm kiếm.
// Loại bỏ giá trị rỗng và null, dùng thư viện qs.

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
