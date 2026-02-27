import { Button } from "@/core/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";
import type { Room } from "../server";

interface RoomsTableProps {
    rooms: Room[];
    onEdit: (room: Room) => void;
    onDelete: (id: number) => void;
}

export const RoomsTable = ({ rooms, onEdit, onDelete }: RoomsTableProps) => {
    return (
        <div className="rounded-md border bg-background overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên phòng</TableHead>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Khách</TableHead>
                        <TableHead className="w-25">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {rooms.map((room) => (
                        <TableRow key={room.id}>
                            <TableCell>{room.id}</TableCell>
                            <TableCell>{room.tenPhong}</TableCell>
                            <TableCell>
                                {room.hinhAnh && (
                                    <img
                                        src={room.hinhAnh}
                                        alt={room.tenPhong}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                )}
                            </TableCell>
                            <TableCell>${room.giaTien}</TableCell>
                            <TableCell>{room.khach}</TableCell>
                            <TableCell className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(room)}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onDelete(room.id)}
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
