import type { Comment, CreateCommentPayload } from "@/types/comment.type";
import apiInstance from "@/shared/services/api";

const BINH_LUAN = {
    getAll: () => apiInstance.get<{ content: Comment[] }>("/binh-luan"),
    getByRoom: (maPhong: number) =>
        apiInstance.get<{ content: Comment[] }>(
            `/binh-luan/lay-binh-luan-theo-phong/${maPhong}`,
        ),
    create: (data: CreateCommentPayload) => {
        const payload: Record<string, unknown> = {
            ...data,
            maNguoiBinhLuan:
                (data as unknown as { maNguoiBinhLuan?: number })
                    .maNguoiBinhLuan ?? data.maNguoiDung,
        };
        delete (payload as { maNguoiDung?: number }).maNguoiDung;
        return apiInstance.post("/binh-luan", payload);
    },
    update: (id: number, data: Partial<CreateCommentPayload>) => {
        const payload: Record<string, unknown> = {
            ...data,
        };
        if ((data as { maNguoiDung?: number }).maNguoiDung != null) {
            (payload as { maNguoiBinhLuan?: number }).maNguoiBinhLuan = (
                data as { maNguoiDung?: number }
            ).maNguoiDung;
            delete (payload as { maNguoiDung?: number }).maNguoiDung;
        }
        return apiInstance.put(`/binh-luan/${id}`, payload);
    },
    delete: (id: number) => apiInstance.delete(`/binh-luan/${id}`),
};

export default BINH_LUAN;
