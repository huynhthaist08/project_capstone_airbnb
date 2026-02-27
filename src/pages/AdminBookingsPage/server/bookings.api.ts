import DAT_PHONG from "@/api/dat-phong";
import type { Booking, BookingFormData } from "./booking.type";

export const bookingsApi = {
    // Get all bookings
    getAll: () => DAT_PHONG.getAll(),

    // Create booking
    create: (data: BookingFormData) =>
        DAT_PHONG.create({
            maPhong: Number(data.maPhong),
            ngayDen: data.ngayDen,
            ngayDi: data.ngayDi,
            soLuongKhach: Number(data.soLuongKhach),
            maNguoiDung: Number(data.maNguoiDung),
        }),

    // Update booking
    update: (id: number, data: Partial<BookingFormData>) =>
        DAT_PHONG.update(id, data),

    // Delete booking
    delete: (id: number) => DAT_PHONG.delete(id),
};
