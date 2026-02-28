/**
 * RoomDetailPage: trang chi tiết phòng — hiển thị ảnh, tên, mô tả, tiện nghi; form đặt phòng (ngày đến/đi, số khách) và danh sách bình luận; dùng useAuth (AuthContext) để lấy user đặt phòng/bình luận.
 */
import PHONG_THUE from "@/api/phong-thue";
import DAT_PHONG from "@/api/dat-phong";
import BINH_LUAN from "@/api/binh-luan";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getAny, getContent, getContentArray } from "@/utils/apiResponse";
import type { Booking } from "@/types/booking.type";
import { toast } from 'sonner'
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

    // Lấy danh sách booking của tất cả phòng để check conflict
    const { data: allBookingsRes } = useQuery({
        queryKey: ["dat-phong-all"],
        queryFn: () => DAT_PHONG.getAll(),
    });

    const createBooking = useMutation({
        mutationFn: (payload: {
            maPhong: number;
            ngayDen: string;
            ngayDi: string;
            soLuongKhach: number;
            maNguoiDung: number;
        }) => {
            console.log("📡 Calling DAT_PHONG.create with:", payload);
            return DAT_PHONG.create(payload);
        },
        onSuccess: (data) => {
            console.log("  Booking created successfully:", data);
            setBookingError("");
            queryClient.invalidateQueries({ queryKey: ["dat-phong"] });
            alert("Đặt phòng thành công!");
        },
        onError: (err: unknown) => {
            console.error("    Booking error:", err);
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

    // Lấy danh sách booking của phòng này
    const allBookings = getContentArray<Booking>(allBookingsRes);
    const roomBookings = allBookings.filter((b: Booking) => b.maPhong === roomId);

    // Hàm kiểm tra xem ngày có bị trùng với booking nào không
    const checkDateConflict = (checkIn: string, checkOut: string): boolean => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        for (const booking of roomBookings) {
            const bookedCheckIn = new Date(booking.ngayDen);
            const bookedCheckOut = new Date(booking.ngayDi);

            // Kiểm tra overlap: 
            // Trùng nếu: (checkIn < bookedCheckOut) && (checkOut > bookedCheckIn)
            if (checkInDate < bookedCheckOut && checkOutDate > bookedCheckIn) {
                return true; // Có conflict
            }
        }
        return false; // Không conflict
    };

    // Kiểm tra conflict khi thay đổi ngày
    useEffect(() => {
        if (!ngayDen || !ngayDi) {
            setBookingError("");
            return;
        }

        // Kiểm tra ngày đi phải sau ngày đến
        if (new Date(ngayDi) <= new Date(ngayDen)) {
            setBookingError("Ngày trả phòng phải sau ngày nhận phòng.");
            return;
        }

        // Kiểm tra xem có trùng lịch với booking nào không
        if (checkDateConflict(ngayDen, ngayDi)) {
            setBookingError("Phòng đã được đặt trong khoảng thời gian này. Vui lòng chọn ngày khác.");
        } else {
            setBookingError("");
        }
    }, [ngayDen, ngayDi, roomBookings]);

    // Tổng số page
    const totalPages = Math.ceil(commentList.length / COMMENTS_PER_PAGE);

    // Comment của trang hiện tại
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const currentComments = commentList.slice(
        startIndex,
        startIndex + COMMENTS_PER_PAGE,
    );

    // Các trang hiển thị trong pagination (tối đa 5 trang một lúc)
    const MAX_VISIBLE_PAGES = 5;
    const visiblePages = (() => {
        if (totalPages <= MAX_VISIBLE_PAGES) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const half = Math.floor(MAX_VISIBLE_PAGES / 2);
        let start = currentPage - half;
        let end = currentPage + half;

        if (start < 1) {
            start = 1;
            end = MAX_VISIBLE_PAGES;
        } else if (end > totalPages) {
            end = totalPages;
            start = totalPages - MAX_VISIBLE_PAGES + 1;
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    })();

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🔍 handleBook called", { user, ngayDen, ngayDi, soLuongKhach });
        
        if (!user) {
            setBookingError("Vui lòng đăng nhập để đặt phòng.");
            console.log(" User not logged in");
            return;
        }

        //  Kiểm tra role: chỉ USER được đặt phòng, không phải ADMIN
        if (user.role !== "USER") {
            setBookingError("Tài khoản admin không thể đặt phòng.");
            console.log(" Admin cannot book rooms");
            toast.error('Người dùng chưa đăng nhập tài khoản. Vui lòng đăng nhập bằng tài khoản người dùng để đặt phòng.')
            return;
        }
       

        if (!ngayDen || !ngayDi) {
            setBookingError("Vui lòng chọn ngày đến và ngày đi.");
            console.log("    Missing dates");
            return;
        }

        // Kiểm tra ngày đi phải sau ngày đến
        if (new Date(ngayDi) <= new Date(ngayDen)) {
            setBookingError("Ngày trả phòng phải sau ngày nhận phòng.");
            console.log("    Invalid date range");
            return;
        }

        // Kiểm tra xem có trùng lịch với booking nào không
        if (checkDateConflict(ngayDen, ngayDi)) {
            setBookingError("Phòng đã được đặt trong khoảng thời gian này. Vui lòng chọn ngày khác.");
            console.log("    Date conflict with existing booking");
            return;
        }

        setBookingError("");
        console.log("  Creating booking...", {
            maPhong: roomId,
            ngayDen,
            ngayDi,
            soLuongKhach,
            maNguoiDung: user.id,
        });
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
                                <div className="flex justify-center gap-2 pt-4 flex-wrap items-center text-sm">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(1, prev - 1),
                                            )
                                        }
                                    >
                                        {"< Trước"}
                                    </Button>
                                    {visiblePages.map((page) => (
                                        <Button
                                            key={page}
                                            size="sm"
                                            variant={
                                                currentPage === page
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                setCurrentPage(page)
                                            }
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    {visiblePages[visiblePages.length - 1] <
                                        totalPages && (
                                        <span className="px-1 text-muted-foreground select-none">
                                            ...
                                        </span>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(
                                                    totalPages,
                                                    prev + 1,
                                                ),
                                            )
                                        }
                                    >
                                        {"Sau >"}
                                    </Button>
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
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={soLuongKhach === 1}
                                            onClick={() =>
                                                setSoLuongKhach(
                                                    Math.max(1, soLuongKhach - 1),
                                                )
                                            }
                                            className="w-10 h-10 p-0"
                                        >
                                            −
                                        </Button>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={soLuongKhach}
                                            readOnly
                                            className="text-center flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={soLuongKhach >= khach}
                                            onClick={() =>
                                                setSoLuongKhach(
                                                    Math.min(khach, soLuongKhach + 1),
                                                )
                                            }
                                            className="w-10 h-10 p-0"
                                        >
                                            +
                                        </Button>
                                    </div>
                                    {soLuongKhach >= khach && (
                                        <p className="text-sm text-destructive">
                                            Số lượng khách tối đa của phòng là {khach} khách, không thể đặt nhiều hơn.
                                        </p>
                                    )}
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
                                    disabled={createBooking.isPending || !user || !!bookingError}
                                    onClick={() => {
                                        console.log("🔘 Button clicked", {
                                            user: user ? `${user.name} (ID: ${user.id})` : "NOT LOGGED IN",
                                            ngayDen,
                                            ngayDi,
                                            soLuongKhach,
                                            isPending: createBooking.isPending,
                                            disabled: createBooking.isPending || !user,
                                        });
                                    }}
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
