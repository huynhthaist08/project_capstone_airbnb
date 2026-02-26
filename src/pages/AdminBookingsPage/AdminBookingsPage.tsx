/**
 * AdminBookingsPage: trang admin quản lý đặt phòng — bảng danh sách đặt phòng (phân trang client), xóa đặt phòng; gọi API dat-phong.
 */
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/core/ui/dialog";
import { Label } from "@/core/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import DAT_PHONG from "@/api/dat-phong";
import type { Booking, CreateBookingPayload } from "@/types/booking.type";
import { getContentArray } from "@/utils/apiResponse";

const AdminBookingsPage = () => {
    const queryClient = useQueryClient();
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [form, setForm] = useState<CreateBookingPayload>({
        maPhong: 0,
        ngayDen: "",
        ngayDi: "",
        soLuongKhach: 1,
        maNguoiDung: 0,
    });

    const { data } = useQuery({
        queryKey: ["admin-bookings"],
        queryFn: () => DAT_PHONG.getAll(),
    });

    const bookingList = getContentArray<Booking>(data);

    const { currentPageItems, totalPage } = useMemo(() => {
        const totalPage = Math.ceil(bookingList.length / pageSize) || 1;
        const safePage = Math.min(Math.max(1, pageIndex), totalPage);
        const start = (safePage - 1) * pageSize;
        const items = bookingList.slice(start, start + pageSize);
        return { currentPageItems: items, totalPage };
    }, [bookingList, pageIndex]);

    const deleteBooking = useMutation({
        mutationFn: (id: number) => DAT_PHONG.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        },
    });

    const createBooking = useMutation({
        mutationFn: () =>
            DAT_PHONG.create({
                maPhong: Number(form.maPhong),
                ngayDen: form.ngayDen,
                ngayDi: form.ngayDi,
                soLuongKhach: Number(form.soLuongKhach),
                maNguoiDung: Number(form.maNguoiDung),
            }),
        onSuccess: () => {
            setIsDialogOpen(false);
            setForm({
                maPhong: 0,
                ngayDen: "",
                ngayDi: "",
                soLuongKhach: 1,
                maNguoiDung: 0,
            });
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        },
    });

    const updateBooking = useMutation({
        mutationFn: (payload: {
            id: number;
            data: Partial<CreateBookingPayload>;
        }) => DAT_PHONG.update(payload.id, payload.data),
        onSuccess: () => {
            setIsDialogOpen(false);
            setEditingBooking(null);
            setForm({
                maPhong: 0,
                ngayDen: "",
                ngayDi: "",
                soLuongKhach: 1,
                maNguoiDung: 0,
            });
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý đặt phòng</h1>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    onClick={() => {
                        setEditingBooking(null);
                        setForm({
                            maPhong: 0,
                            ngayDen: "",
                            ngayDi: "",
                            soLuongKhach: 1,
                            maNguoiDung: 0,
                        });
                        setIsDialogOpen(true);
                    }}
                >
                    Thêm đặt phòng
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-background overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Mã phòng</TableHead>
                            <TableHead>Ngày đến</TableHead>
                            <TableHead>Ngày đi</TableHead>
                            <TableHead>Số khách</TableHead>
                            <TableHead>Mã người dùng</TableHead>
                            <TableHead className="w-25">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentPageItems.map((b) => (
                            <TableRow key={b.id}>
                                <TableCell>{b.id}</TableCell>
                                <TableCell>{b.maPhong}</TableCell>
                                <TableCell>{b.ngayDen}</TableCell>
                                <TableCell>{b.ngayDi}</TableCell>
                                <TableCell>{b.soLuongKhach}</TableCell>
                                <TableCell>{b.maNguoiDung}</TableCell>
                                <TableCell className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setEditingBooking(b);
                                            setForm({
                                                maPhong: b.maPhong,
                                                ngayDen: b.ngayDen,
                                                ngayDi: b.ngayDi,
                                                soLuongKhach: b.soLuongKhach,
                                                maNguoiDung: b.maNguoiDung,
                                            });
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            deleteBooking.mutate(b.id)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination (client-side) */}
            {totalPage > 1 && (
                <div className="flex justify-center pt-2">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
                        <button
                            type="button"
                            className="px-2 py-1 text-muted-foreground disabled:opacity-40"
                            disabled={pageIndex === 1}
                            onClick={() =>
                                setPageIndex((p) => Math.max(1, p - 1))
                            }
                        >
                            &lt; Trước
                        </button>
                        {Array.from(
                            { length: Math.min(10, totalPage) },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setPageIndex(page)}
                                className={`px-3 py-1 rounded border ${
                                    pageIndex === page
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:border-muted-foreground"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        {totalPage > 10 && <span className="px-1">...</span>}
                        <button
                            type="button"
                            className="px-2 py-1 text-muted-foreground disabled:opacity-40"
                            disabled={pageIndex === totalPage}
                            onClick={() =>
                                setPageIndex((p) => Math.min(totalPage, p + 1))
                            }
                        >
                            Sau &gt;
                        </button>
                    </div>
                </div>
            )}

            {/* Dialog thêm/sửa đặt phòng */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingBooking
                                ? "Sửa đặt phòng"
                                : "Thêm đặt phòng"}
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        className="space-y-3 text-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editingBooking) {
                                updateBooking.mutate({
                                    id: editingBooking.id,
                                    data: {
                                        maPhong: Number(form.maPhong),
                                        ngayDen: form.ngayDen,
                                        ngayDi: form.ngayDi,
                                        soLuongKhach:
                                            Number(form.soLuongKhach),
                                        maNguoiDung:
                                            Number(form.maNguoiDung),
                                    },
                                });
                            } else {
                                createBooking.mutate();
                            }
                        }}
                    >
                        <div className="space-y-1">
                            <Label>Mã phòng</Label>
                            <Input
                                type="number"
                                value={form.maPhong}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        maPhong:
                                            Number(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Ngày đến</Label>
                            <Input
                                type="date"
                                value={form.ngayDen}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        ngayDen: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Ngày đi</Label>
                            <Input
                                type="date"
                                value={form.ngayDi}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        ngayDi: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Số khách</Label>
                            <Input
                                type="number"
                                min={1}
                                value={form.soLuongKhach}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        soLuongKhach:
                                            Number(e.target.value) || 1,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Mã người dùng</Label>
                            <Input
                                type="number"
                                value={form.maNguoiDung}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        maNguoiDung:
                                            Number(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    setEditingBooking(null);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    createBooking.isPending ||
                                    updateBooking.isPending
                                }
                            >
                                {editingBooking ? "Lưu thay đổi" : "Thêm"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminBookingsPage;
