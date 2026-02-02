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

const AdminLocationsPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý thông tin vị trí</h1>
            </div>

            {/* Search */}
            <div className="flex flex-wrap gap-2">
                <Input placeholder="Tìm kiếm vị trí..." className="max-w-xs" />
                <Button>Tìm</Button>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên vị trí</TableHead>
                            <TableHead>Tỉnh thành</TableHead>
                            <TableHead>Quốc gia</TableHead>
                            <TableHead className="w-25">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* Row mẫu */}
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Hồ Chí Minh</TableCell>
                            <TableCell>TP.HCM</TableCell>
                            <TableCell>Việt Nam</TableCell>
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

export default AdminLocationsPage;
