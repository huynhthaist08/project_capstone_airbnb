// Định nghĩa kiểu dữ liệu người dùng (User) và các kiểu hỗ trợ phân trang dùng chung.
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

// PaginatedResponse: kiểu response chuẩn cho các API có phân trang.
export type PaginatedResponse<T> = {
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    totalPage: number;
    data: T[];
};
