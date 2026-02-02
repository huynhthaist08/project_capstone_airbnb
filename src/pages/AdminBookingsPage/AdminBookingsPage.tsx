import { Button } from "@/core/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";

const AdminBookingsPage = () => {
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
                        {/* Row mẫu */}
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>101</TableCell>
                            <TableCell>2024-01-10</TableCell>
                            <TableCell>2024-01-12</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm">
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminBookingsPage;
