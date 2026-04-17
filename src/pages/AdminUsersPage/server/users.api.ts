// api/users.ts
// Module gọi API quản lý người dùng: phân trang + tìm kiếm, tạo/sửa/xóa user, upload avatar.
// Dùng chung cho khu vực Admin (quản lý người dùng).

import apiInstance from "@/shared/services/api";
import type { PaginatedResponse, User, UserPaginatedParams } from "./user.type";

const USERS = {
    // [ADMIN] Lấy danh sách user phân trang + tìm kiếm
    getPaginated: (params: UserPaginatedParams) =>
        apiInstance.get<{ content: PaginatedResponse<User> }>(
            "/users/phan-trang-tim-kiem",
            {
                params,
            },
        ),

    // [ADMIN] Tạo user mới (mặc định dùng cho tạo ADMIN)
    create: (payload: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role?: string;
    }) => apiInstance.post("/users", payload),

    // [ADMIN] Cập nhật thông tin user
    update: (id: number, data: Partial<User>) =>
        apiInstance.put(`/users/${id}`, data),

    // [ADMIN] Xóa user theo id
    delete: (id: number) => apiInstance.delete(`/users`, { params: { id } }),

    // [ADMIN] Upload avatar cho user
    uploadAvatar: (id: number, file: File) => {
        const formData = new FormData();
        formData.append("formFile", file);
        return apiInstance.post("/users/upload-avatar", formData, {
            params: { id },
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};

export default USERS;
