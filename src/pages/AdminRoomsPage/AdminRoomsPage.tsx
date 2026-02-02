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

import imageRoom from "../../assets/images/anywhere-home.avif";

const AdminRoomsPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý thông tin phòng</h1>
            </div>

            {/* Search */}
            <div className="flex flex-wrap gap-2">
                <Input placeholder="Nhập tên phòng..." className="max-w-xs" />
                <Button>Tìm</Button>
            </div>

            {/* Table */}
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
                        {/* Row mẫu */}
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Phòng Deluxe</TableCell>
                            <TableCell>
                                <img
                                    src={imageRoom}
                                    alt="room"
                                    className="w-12 h-12 object-cover rounded"
                                />
                            </TableCell>
                            <TableCell>$120</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm">
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {/* Pagination UI */}
            <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm">
                    Trước
                </Button>
                <span className="flex items-center px-2 text-sm">1 / 1</span>
                <Button variant="outline" size="sm">
                    Sau
                </Button>
            </div>
        </div>
    );
};

export default AdminRoomsPage;
