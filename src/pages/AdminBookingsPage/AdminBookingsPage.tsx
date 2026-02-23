/**
 * AdminBookingsPage: trang admin quản lý đặt phòng — bảng danh sách đặt phòng (phân trang client), xóa đặt phòng; gọi API dat-phong.
 */
import { Button } from "@/core/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import DAT_PHONG from "@/api/dat-phong";
import type { Booking } from "@/types/booking.type";
import { getContentArray } from "@/utils/apiResponse";

const AdminBookingsPage = () => {
    const queryClient = useQueryClient();
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 10;

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý đặt phòng</h1>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-background">
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
                                <TableCell>
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
        </div>
    );
};

export default AdminBookingsPage;
