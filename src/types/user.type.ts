export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthday?: string;
    avatar?: string;
    gender?: boolean;
    role?: string;
};

export type UserPaginatedParams = {
    pageIndex?: number;
    pageSize?: number;
    keyword?: string;
};

export type PaginatedResponse<T> = {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    totalPage: number;
    data: T[];
};

// xem lai
