// Định nghĩa kiểu dữ liệu cho một lượt đặt phòng (Booking) và payload khi tạo mới.
export type Booking = {
    id: number;
    maPhong: number;
    ngayDen: string;
    ngayDi: string;
    soLuongKhach: number;
    maNguoiDung: number;
};

// Payload gửi lên API khi tạo mới một đặt phòng.
export type CreateBookingPayload = {
    maPhong: number;
    ngayDen: string;
    ngayDi: string;
    soLuongKhach: number;
    maNguoiDung: number;
};
