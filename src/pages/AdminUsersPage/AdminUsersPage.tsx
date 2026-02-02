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
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/core/ui/dialog";
import { Label } from "@/core/ui/label";

const AdminUsersPage = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
                <p className="text-muted-foreground">
                    Thêm quản trị viên và quản lý danh sách user
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                <Input
                    placeholder="Nhập tài khoản hoặc họ tên..."
                    className="max-w-xs"
                />
                <Button>Tìm</Button>
                <Button variant="outline">Thêm quản trị viên</Button>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="w-30">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Row mẫu */}
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Nguyễn Văn A</TableCell>
                            <TableCell>a@gmail.com</TableCell>
                            <TableCell>Admin</TableCell>
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

            {/* Dialog Add User */}
            <Dialog>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm quản trị viên</DialogTitle>
                    </DialogHeader>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label>Tên</Label>
                            <Input placeholder="Họ tên" />
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="Email" />
                        </div>

                        <div className="space-y-2">
                            <Label>Tài khoản</Label>
                            <Input placeholder="Tài khoản" />
                        </div>

                        <div className="space-y-2">
                            <Label>Số điện thoại</Label>
                            <Input placeholder="Số điện thoại" />
                        </div>

                        <div className="space-y-2">
                            <Label>Mật khẩu</Label>
                            <Input type="password" placeholder="Mật khẩu" />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline">
                                Hủy
                            </Button>
                            <Button type="submit">Thêm</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminUsersPage;
