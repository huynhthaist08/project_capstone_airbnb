// Định nghĩa kiểu dữ liệu bình luận (Comment) và payload tạo bình luận mới.
export type Comment = {
    id: number;
    maPhong: number;
    maNguoiBinhLuan: number;
    ngayBinhLuan?: string;
    noiDung?: string;
    saoBinhLuan?: number;
};

// Payload gửi lên API khi người dùng thêm bình luận cho phòng.
export type CreateCommentPayload = {
    maPhong: number;
    maNguoiDung: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
};
