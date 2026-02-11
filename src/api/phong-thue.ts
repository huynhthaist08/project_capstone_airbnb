import apiInstance from "@/shared/services/api";

import type { PaginatedResponse } from "@/@types/user.type";
import { createQueryString } from "@/utils/createQueryString";
import type {
    Room,
    RoomByLocationParams,
    RoomPaginatedParams,
} from "@/@types/room.type";

const PHONG_THUE = {
    getAll: () => apiInstance.get<{ content: Room[] }>("/phong-thue"),
    getByLocation: (params: RoomByLocationParams) => {
        const q: Record<string, unknown> = { maViTri: params.maViTri };
        return apiInstance.get<{ content: Room[] }>(
            `/phong-thue/lay-phong-theo-vi-tri${createQueryString(q)}`,
        );
    },
    getPaginated: (params: RoomPaginatedParams) => {
        const q: Record<string, unknown> = { ...params };
        if (params.pageIndex != null) q.soTrang = params.pageIndex;
        if (params.pageSize != null) q.soPhanTu = params.pageSize;
        if (params.keyword != null) q.tuKhoa = params.keyword;
        return apiInstance.get<{ content: PaginatedResponse<Room> }>(
            `/phong-thue/phan-trang-tim-kiem${createQueryString(q)}`,
        );
    },
    getById: (id: number) =>
        apiInstance.get<{ content: Room }>(`/phong-thue/${id}`),
    create: (data: Partial<Room>) => apiInstance.post("/phong-thue", data),
    update: (id: number, data: Partial<Room>) =>
        apiInstance.put(`/phong-thue/${id}`, data),
    delete: (id: number) => apiInstance.delete(`/phong-thue/${id}`),
    uploadImage: (formData: FormData) =>
        apiInstance.post("/phong-thue/upload-hinh-phong", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
};

export default PHONG_THUE;
