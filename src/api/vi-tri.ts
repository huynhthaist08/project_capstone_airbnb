// Module gọi API quản lý vị trí (location): CRUD, phân trang tìm kiếm, upload ảnh.
// Dùng cho trang admin vị trí và khi cần danh sách vị trí (ví dụ dropdown, filter).

import type { Location, LocationPaginatedParams } from "@/types/location.type";
// import type { PaginatedResponse } from "@/types/user.type";
import type { PaginatedResponse } from "@/pages/AdminUsersPage/server";
import apiInstance from "@/shared/services/api";
import { createQueryString } from "@/utils/createQueryString";

const VI_TRI = {
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
    
    // [Admin] Upload hình vị trí theo đúng endpoint /vi-tri/upload-hinh-vitri?maViTri={id}
    uploadImage: (id: number, file: File) => {
        const formData = new FormData();
        formData.append("formFile", file);
        return apiInstance.post(`/vi-tri/upload-hinh-vitri`, formData, {
            params: { maViTri: id },
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};

export default VI_TRI;
