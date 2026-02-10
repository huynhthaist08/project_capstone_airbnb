import type { Location } from "@/@types/location.type";
import type { PaginatedResponse } from "@/@types/user.type";
import apiInstance from "@/shared/api";
import { createQueryString } from "@/utils/createQueryString";

export type LocationPaginatedParams = {
    pageIndex?: number;
    pageSize?: number;
    keyword?: string;
};

const LOCATION = {
    getAll: () => apiInstance.get<{ content: Location[] }>("/vi-tri"),
    getPaginated: (params: LocationPaginatedParams) => {
        const q: Record<string, unknown> = { ...params };
        if (params.pageIndex != null) q.soTrang = params.pageIndex;
        if (params.pageSize != null) q.soPhanTu = params.pageSize;
        if (params.keyword != null) q.tuKhoa = params.keyword;
        return apiInstance.get<{ content: PaginatedResponse<Location> }>(
            `/vi-tri/phan-trang-tim-kiem${createQueryString(q)}`,
        );
    },
    getById: (id: number) =>
        apiInstance.get<{ content: Location }>(`/vi-tri/${id}`),
    create: (data: Partial<Location>) => apiInstance.post("/vi-tri", data),
    update: (id: number, data: Partial<Location>) =>
        apiInstance.put(`/vi-tri/${id}`, data),
    delete: (id: number) => apiInstance.delete(`/vi-tri/${id}`),
    uploadImage: (formData: FormData) =>
        apiInstance.post("/vi-tri/upload-hinh-vitri", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
};

export default LOCATION;

//  - File này định nghĩa layer gọi API cho module Location (vị trí).
//  - LOCATION là object gom toàn bộ các API liên quan đến Location như: lấy danh sách, phân trang, tìm kiếm, CRUD và upload hình ảnh.
//  - Frontend sử dụng các tên params (pageIndex, pageSize, keyword) và map lại sang naming backend (soTrang, soPhanTu, tuKhoa) trước khi gọi API.
//  - createQueryString được dùng để build query string một cách linh hoạt và an toàn.
//  - Các response API đều được gắn type TypeScript để đảm bảo an toàn dữ liệu.
//  - uploadImage sử dụng FormData và multipart/form-data để upload hình ảnh location.
//  - Cách tổ chức này giúp code dễ bảo trì, dễ mở rộng và tách biệt rõ UI với backend.
