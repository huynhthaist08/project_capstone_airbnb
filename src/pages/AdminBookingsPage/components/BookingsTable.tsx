import { Button } from "@/core/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";
import type { Booking } from "../server";

interface BookingsTableProps {
    bookings: Booking[];
    onEdit: (booking: Booking) => void;
    onDelete: (id: number) => void;
}

export const BookingsTable = ({
    bookings,
    onEdit,
    onDelete,
}: BookingsTableProps) => {
    return (
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
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>{booking.id}</TableCell>
                            <TableCell>{booking.maPhong}</TableCell>
                            <TableCell>{booking.ngayDen}</TableCell>
                            <TableCell>{booking.ngayDi}</TableCell>
                            <TableCell>{booking.soLuongKhach}</TableCell>
                            <TableCell>{booking.maNguoiDung}</TableCell>
                            <TableCell className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(booking)}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onDelete(booking.id)}
                                >
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
