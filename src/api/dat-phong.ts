import type { Booking, CreateBookingPayload } from "@/types/booking.type";
import apiInstance from "@/shared/services/api";

const DAT_PHONG = {
    getAll: () => apiInstance.get<{ content: Booking[] }>("/dat-phong"),
    getById: (id: number) =>
        apiInstance.get<{ content: Booking }>(`/dat-phong/${id}`),
    getByUser: (maNguoiDung: number) =>
        apiInstance.get<{ content: Booking[] }>(
            `/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`,
        ),
    create: (data: CreateBookingPayload) =>
        apiInstance.post("/dat-phong", data),
    update: (id: number, data: Partial<CreateBookingPayload>) =>
        apiInstance.put(`/dat-phong/${id}`, data),
    delete: (id: number) => apiInstance.delete(`/dat-phong/${id}`),
};

export default DAT_PHONG;
