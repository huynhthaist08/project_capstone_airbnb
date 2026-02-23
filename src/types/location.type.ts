// Định nghĩa kiểu dữ liệu vị trí (Location) và tham số phân trang khi lấy danh sách vị trí.
export type Location = {
    id: number;
    tenViTri?: string;
    tinhThanh?: string;
    quocGia?: string;
    hinhAnh?: string;
};

// Tham số query dùng cho API lấy danh sách vị trí có phân trang.
export type LocationPaginatedParams = {
    pageIndex?: number;
    pageSize?: number;
    keyword?: string;
};
