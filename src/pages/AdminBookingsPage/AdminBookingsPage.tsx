/**
 * AdminBookingsPage: trang admin quản lý đặt phòng — bảng danh sách đặt phòng (phân trang client), xóa đặt phòng; gọi API dat-phong.
 */
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    BookingsTable,
    BookingsPagination,
    BookingDialog,
} from "./components";
import {
    useGetAdminBookings,
    useCreateAdminBooking,
    useUpdateAdminBooking,
    useDeleteAdminBooking,
    useGetBookingsByRoom,
} from "./hook";
import { Button } from "@/core/ui/button";
import type { Booking, BookingFormData } from "./server";

const getDefaultFormState = (): BookingFormData => ({
    maPhong: 0,
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: 1,
    maNguoiDung: 0,
});

const AdminBookingsPage = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [form, setForm] = useState<BookingFormData>(getDefaultFormState());

    const pageSize = 10;
    const queryClient = useQueryClient();

    // Hooks
    const { bookingList, totalPage } = useGetAdminBookings(pageIndex, pageSize);
    const { roomBookings } = useGetBookingsByRoom(form.maPhong || null);
    const createBooking = useCreateAdminBooking();
    const updateBooking = useUpdateAdminBooking();
    const deleteBooking = useDeleteAdminBooking();

    // Handlers
    const handleAddNew = () => {
        setEditingBooking(null);
        setForm(getDefaultFormState());
        setIsDialogOpen(true);
    };

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
        setForm({
            maPhong: booking.maPhong,
            ngayDen: booking.ngayDen,
            ngayDi: booking.ngayDi,
            soLuongKhach: booking.soLuongKhach,
            maNguoiDung: booking.maNguoiDung,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        deleteBooking.mutate(id);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingBooking(null);
        setForm(getDefaultFormState());
    };

    const handleSubmit = () => {
        if (editingBooking) {
            updateBooking.mutate(
                {
                    id: editingBooking.id,
                    data: form,
                },
                {
                    onSuccess: () => {
                        handleDialogClose();
                    },
                },
            );
        } else {
            createBooking.mutate(form, {
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        }
    };

    const isLoading = createBooking.isPending || updateBooking.isPending;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý đặt phòng</h1>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleAddNew}>
                    Thêm đặt phòng
                </Button>
            </div>

            {/* Table */}
            <BookingsTable
                bookings={bookingList}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Pagination */}
            <BookingsPagination
                pageIndex={pageIndex}
                totalPage={totalPage}
                onPageChange={setPageIndex}
            />

            {/* Dialog */}
            <BookingDialog
                isOpen={isDialogOpen}
                editingBooking={editingBooking}
                form={form}
                onFormChange={setForm}
                onClose={handleDialogClose}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                roomBookings={roomBookings}
            />
        </div>
    );
};

export default AdminBookingsPage;
