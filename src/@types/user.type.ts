export type PaginatedResponse<T> = {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    totalPage: number;
    data: T[];
};
