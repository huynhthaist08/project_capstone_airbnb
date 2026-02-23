import PHONG_THUE from "@/api/phong-thue";
import DAT_PHONG from "@/api/dat-phong";
import BINH_LUAN from "@/api/binh-luan";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getAny, getContent, getContentArray } from "@/utils/apiResponse";

const RoomDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const roomId = Number(id);
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const [ngayDen, setNgayDen] = useState("");
    const [ngayDi, setNgayDi] = useState("");
    const [soLuongKhach, setSoLuongKhach] = useState(1);
    const [commentText, setCommentText] = useState("");
    const [bookingError, setBookingError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const COMMENTS_PER_PAGE = 10;

    const { data: roomRes, isLoading } = useQuery({
        queryKey: ["phong-thue", roomId],
        queryFn: () => PHONG_THUE.getById(roomId),
        enabled: !!id && !Number.isNaN(roomId),
    });

    const { data: commentsRes, refetch: refetchComments } = useQuery({
        queryKey: ["binh-luan", roomId],
        queryFn: () => BINH_LUAN.getByRoom(roomId),
        enabled: !!id && !Number.isNaN(roomId),
    });

    const createBooking = useMutation({
        mutationFn: (payload: {
            maPhong: number;
            ngayDen: string;
            ngayDi: string;
            soLuongKhach: number;
            maNguoiDung: number;
        }) => DAT_PHONG.create(payload),
        onSuccess: () => {
            setBookingError("");
            queryClient.invalidateQueries({ queryKey: ["dat-phong"] });
        },
        onError: (err: unknown) => {
            const msg =
                (err as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ?? "Đặt phòng thất bại.";
            setBookingError(msg);
        },
    });

    const createComment = useMutation({
        mutationFn: (payload: {
            maPhong: number;
            maNguoiDung: number;
            ngayBinhLuan: string;
            noiDung: string;
            saoBinhLuan: number;
        }) => BINH_LUAN.create(payload),
        onSuccess: () => {
            setCommentText("");
            refetchComments();
        },
    });

    const room = getContent<Record<string, unknown>>(roomRes);
    const commentList = getContentArray<{
        id: number;
        noiDung?: string;
        ngayBinhLuan?: string;
    }>(commentsRes);

    // Tổng số page
    const totalPages = Math.ceil(commentList.length / COMMENTS_PER_PAGE);

    // Comment của trang hiện tại
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const currentComments = commentList.slice(
        startIndex,
        startIndex + COMMENTS_PER_PAGE,
    );

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setBookingError("Vui lòng đăng nhập để đặt phòng.");
            return;
        }
        if (!ngayDen || !ngayDi) {
            setBookingError("Vui lòng chọn ngày đến và ngày đi.");
            return;
        }
        setBookingError("");
        createBooking.mutate({
            maPhong: roomId,
            ngayDen,
            ngayDi,
            soLuongKhach,
            maNguoiDung: user.id,
        });
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!commentText.trim()) return;
        createComment.mutate({
            maPhong: roomId,
            maNguoiDung: user.id,
            ngayBinhLuan: new Date().toISOString().slice(0, 10),
            noiDung: commentText.trim(),
            saoBinhLuan: 5,
        });
    };

    if (isLoading || !room) {
        return (
            <div className="py-6">
                <div className="h-80 bg-muted rounded-xl animate-pulse mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-8 bg-muted rounded w-1/2 animate-pulse" />
                        <div className="h-4 bg-muted rounded w-full animate-pulse" />
                    </div>
                    <div className="h-64 bg-muted rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    const tenPhong = getAny(room ?? {}, "tenPhong", "ten_phong") as
        | string
        | undefined;
    const moTa = getAny(room ?? {}, "moTa", "mo_ta") as string | undefined;
    const giaTien =
        (getAny(room ?? {}, "giaTien", "gia_tien") as number | undefined) ?? 0;
    const hinhAnh = getAny(room ?? {}, "hinhAnh", "hinh_anh") as
        | string
        | undefined;
    const khach = (getAny(room ?? {}, "khach") as number | undefined) ?? 0;
    const phongNgu =
        (getAny(room ?? {}, "phongNgu", "phong_ngu") as number | undefined) ??
        0;
    const giuong = (getAny(room ?? {}, "giuong") as number | undefined) ?? 0;
    const phongTam =
        (getAny(room ?? {}, "phongTam", "phong_tam") as number | undefined) ??
        0;

    return (
        <div className="py-6 max-w-6xl mx-auto">
            <div className="aspect-video md:aspect-2/1 rounded-xl overflow-hidden bg-muted mb-6">
                {hinhAnh ? (
                    <img
                        src={hinhAnh}
                        alt={tenPhong ?? ""}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Ảnh phòng
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {tenPhong ?? "Chỗ ở"}
                        </h1>
                        <p className="text-muted-foreground">
                            {khach} khách · {phongNgu} phòng ngủ · {giuong}{" "}
                            giường · {phongTam} phòng tắm
                        </p>
                    </div>
                    {moTa && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Mô tả</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {moTa}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>Bình luận</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {user && (
                                <form
                                    onSubmit={handleAddComment}
                                    className="flex gap-2"
                                >
                                    <Input
                                        placeholder="Viết bình luận..."
                                        value={commentText}
                                        onChange={(e) =>
                                            setCommentText(e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={
                                            createComment.isPending ||
                                            !commentText.trim()
                                        }
                                    >
                                        Gửi
                                    </Button>
                                </form>
                            )}
                            <ul className="space-y-3">
                                {currentComments.map((c) => (
                                    <li
                                        key={c.id}
                                        className="border-b pb-2 last:border-0"
                                    >
                                        <p className="text-sm">
                                            {c.noiDung ?? ""}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {c.ngayBinhLuan ?? ""}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 pt-4">
                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <Button
                                            key={page}
                                            size="sm"
                                            variant={
                                                currentPage === page
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                ${giaTien} / đêm
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleBook} className="space-y-4">
                                {bookingError && (
                                    <p className="text-sm text-destructive">
                                        {bookingError}
                                    </p>
                                )}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label>Nhận phòng</Label>
                                        <Input
                                            type="date"
                                            value={ngayDen}
                                            onChange={(e) =>
                                                setNgayDen(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Trả phòng</Label>
                                        <Input
                                            type="date"
                                            value={ngayDi}
                                            onChange={(e) =>
                                                setNgayDi(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Khách</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={soLuongKhach}
                                        onChange={(e) =>
                                            setSoLuongKhach(
                                                Number(e.target.value) || 1,
                                            )
                                        }
                                    />
                                </div>
                                <div className="border rounded-md p-3 text-sm space-y-2 bg-muted/40">
                                    <p className="flex justify-between">
                                        <span>
                                            ${giaTien} x{" "}
                                            {ngayDen && ngayDi
                                                ? Math.max(
                                                      1,
                                                      (new Date(
                                                          ngayDi,
                                                      ).getTime() -
                                                          new Date(
                                                              ngayDen,
                                                          ).getTime()) /
                                                          (1000 * 60 * 60 * 24),
                                                  )
                                                : 1}{" "}
                                            đêm
                                        </span>
                                    </p>
                                    <p className="flex justify-between font-semibold">
                                        <span>Tổng (tượng trưng)</span>
                                        <span>
                                            $
                                            {giaTien *
                                                (ngayDen && ngayDi
                                                    ? Math.max(
                                                          1,
                                                          (new Date(
                                                              ngayDi,
                                                          ).getTime() -
                                                              new Date(
                                                                  ngayDen,
                                                              ).getTime()) /
                                                              (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24),
                                                      )
                                                    : 1)}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Thanh toán chỉ mang tính chất minh họa
                                        cho đồ án, hệ thống không kết nối ví
                                        điện tử thực tế.
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={createBooking.isPending || !user}
                                >
                                    {createBooking.isPending
                                        ? "Đang xử lý..."
                                        : "Thanh toán & đặt phòng"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailPage;
