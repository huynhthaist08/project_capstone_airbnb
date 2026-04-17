// Module gọi API đặt phòng: lấy danh sách, theo user, tạo/cập nhật/xóa đặt phòng.
// Dùng khi user đặt phòng (RoomDetailPage) và trang admin quản lý đặt phòng.

import type { Booking, CreateBookingPayload } from "@/types/booking.type";
import apiInstance from "@/shared/services/api";

const DAT_PHONG = {
    getAll: () =>
        apiInstance.get<{ statusCode: number; content: Booking[] }>(
            "/dat-phong",
        ),
    getById: (id: number) =>
        apiInstance.get<{ statusCode: number; content: Booking }>(
            `/dat-phong/${id}`,
        ),
    getByUser: (maNguoiDung: number) =>
        apiInstance.get<{ statusCode: number; content: Booking[] }>(
            `/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`,
        ),

    create: (data: CreateBookingPayload) =>
        apiInstance.post<{ statusCode: number; content: Booking }>(
            "/dat-phong",
            data,
        ),
    update: (id: number, data: Partial<CreateBookingPayload>) =>
        apiInstance.put<{ statusCode: number; content: Booking }>(
            `/dat-phong/${id}`,
            data,
        ),
    delete: (id: number) =>
        apiInstance.delete<{ statusCode: number }>(`/dat-phong/${id}`),
};

export default DAT_PHONG;
