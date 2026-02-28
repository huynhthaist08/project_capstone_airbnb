import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/core/ui/dialog";
import { Label } from "@/core/ui/label";
import type { Booking, BookingFormData } from "../server";
import {
    hasDateRangeConflict,
    getBookedDates,
    isDateBooked,
} from "../utils/dateValidation";

interface BookingDialogProps {
    isOpen: boolean;
    editingBooking: Booking | null;
    form: BookingFormData;
    onFormChange: (form: BookingFormData) => void;
    onClose: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    roomBookings?: Array<{ ngayDen: string; ngayDi: string; id?: number }>;
}

export const BookingDialog = ({
    isOpen,
    editingBooking,
    form,
    onFormChange,
    onClose,
    onSubmit,
    isLoading,
    roomBookings = [],
}: BookingDialogProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra ngày xung đột (nếu có phòng được chọn)
        if (form.maPhong && form.ngayDen && form.ngayDi) {
            const filterBookings = roomBookings.filter(
                (b) => !editingBooking || b.id !== editingBooking.id,
            );

            if (
                hasDateRangeConflict(
                    form.ngayDen,
                    form.ngayDi,
                    filterBookings,
                )
            ) {
                alert(
                    "Ngày này đã bị book! Vui lòng chọn ngày khác.",
                );
                return;
            }
        }

        onSubmit();
    };

    const bookedDates = roomBookings
        .filter((b) => !editingBooking || b.id !== editingBooking.id)
        .map((b) => ({ ngayDen: b.ngayDen, ngayDi: b.ngayDi }));

    const bookedDatesList = getBookedDates(bookedDates);

    const ngayDenBooked = form.ngayDen && isDateBooked(form.ngayDen, bookedDatesList);
    const ngayDiBooked = form.ngayDi && isDateBooked(form.ngayDi, bookedDatesList);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {editingBooking
                            ? "Sửa đặt phòng"
                            : "Thêm đặt phòng"}
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <Label>Mã phòng</Label>
                        <Input
                            type="number"
                            value={form.maPhong}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    maPhong: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Ngày đến</Label>
                        <Input
                            type="date"
                            value={form.ngayDen}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    ngayDen: e.target.value,
                                })
                            }
                        />
                        {ngayDenBooked && (
                            <p className="text-xs text-red-500">
                                 Ngày này đã bị book
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Ngày đi</Label>
                        <Input
                            type="date"
                            value={form.ngayDi}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    ngayDi: e.target.value,
                                })
                            }
                        />
                        {ngayDiBooked && (
                            <p className="text-xs text-red-500">
                                 Ngày này đã bị book
                            </p>
                        )}
                    </div>

                    {/* Hiển thị danh sách ngày đã book */}
                    {form.maPhong && bookedDatesList.length > 0 && (
                        <div className="border-t pt-2">
                            <p className="text-xs font-semibold mb-1">
                                     Ngày đã book của phòng này:
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs max-h-24 overflow-y-auto">
                                {bookedDatesList.join(", ")}
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <Label>Số khách</Label>
                        <Input
                            type="number"
                            min={1}
                            value={form.soLuongKhach}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    soLuongKhach: Number(e.target.value) || 1,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Mã người dùng</Label>
                        <Input
                            type="number"
                            value={form.maNguoiDung}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    maNguoiDung: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {editingBooking ? "Lưu thay đổi" : "Thêm"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
