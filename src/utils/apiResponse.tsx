import type { AxiosResponse } from "axios";

//Chuẩn hóa response từ Cybersoft API.
//API trả về: { data: { content: T } } hoặc { data: T } hoặc { content: { data: T[] } } cho phân trang.

export function getContent<T>(
    res: AxiosResponse<{ content?: T }> | undefined,
): T | undefined {
    if (!res?.data) return undefined;
    const d = res.data as { content?: T; data?: T };
    return d.content ?? d.data;
}

// Lấy mảng từ response (content có thể là mảng hoặc object có .data).

export function getContentArray<T>(
    res: AxiosResponse<unknown> | undefined,
): T[] {
    const content =
        (res?.data as { content?: T[] | { data?: T[] } })?.content ??
        (res?.data as { data?: T[] })?.data;
    if (Array.isArray(content)) return content;
    if (content && typeof content === "object" && "data" in content) {
        const arr = (content as { data?: T[] }).data;
        return Array.isArray(arr) ? arr : [];
    }
    return [];
}

// Lấy dữ liệu phân trang: { pageIndex, pageSize, totalPage, totalRow, data: T[] }.
// API Cybersoft: content có thể là { data: T[], pageIndex, pageSize, totalPage, totalRow } hoặc trực tiếp mảng T[].
export function getPaginatedData<T>(res: AxiosResponse<unknown> | undefined): {
    data: T[];
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalRow: number;
} {
    const raw = res?.data as
        | {
              content?:
                  | T[]
                  | {
                        data?: T[];
                        pageIndex?: number;
                        pageSize?: number;
                        totalPage?: number;
                        totalRow?: number;
                    };
          }
        | undefined;
    const content = raw?.content;
    const defaultResult = {
        data: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0,
    };
    if (content === undefined || content === null) return defaultResult;
    if (Array.isArray(content)) {
        return { ...defaultResult, data: content };
    }
    const paginated = content as {
        data?: T[];
        pageIndex?: number;
        pageSize?: number;
        totalPage?: number;
        totalRow?: number;
    };
    const data = Array.isArray(paginated.data) ? paginated.data : [];
    return {
        data,
        pageIndex: paginated.pageIndex ?? 1,
        pageSize: paginated.pageSize ?? 10,
        totalPage: paginated.totalPage ?? 0,
        totalRow: paginated.totalRow ?? 0,
    };
}

// Lấy giá trị từ object với nhiều key có thể (API có thể trả về tenPhong hoặc ten_phong).
export function getAny(
    obj: Record<string, unknown> | null | undefined,
    ...keys: string[]
): unknown {
    if (!obj) return undefined;
    for (const k of keys) {
        const v = obj[k];
        if (v !== undefined && v !== null) return v;
    }
    return undefined;
}
