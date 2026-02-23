export type Comment = {
    id: number;
    maPhong: number;
    maNguoiBinhLuan: number;
    ngayBinhLuan?: string;
    noiDung?: string;
    saoBinhLuan?: number;
};

export type CreateCommentPayload = {
    maPhong: number;
    maNguoiDung: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
};

// juan
