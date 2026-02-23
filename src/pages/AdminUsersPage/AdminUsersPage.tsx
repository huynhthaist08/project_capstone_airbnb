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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { User } from "@/types/user.type";
import apiInstance from "@/shared/services/api";
import { getPaginatedData } from "@/utils/apiResponse";

const AdminUsersPage = () => {
    const [keyword, setKeyword] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["admin-users", keyword, pageIndex],
        queryFn: () =>
            apiInstance.get("/users/phan-trang-tim-kiem", {
                params: {
                    pageIndex,
                    pageSize,
                    keyword: keyword || undefined,
                },
            }),
    });

    const { data: userList, totalPage } = getPaginatedData<User>(data);

    const createUser = useMutation({
        mutationFn: () =>
            apiInstance.post("/users", {
                ...form,
                id: 0,
                role: "ADMIN",
            }),
        onSuccess: () => {
            setIsDialogOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },
    });

    const deleteUser = useMutation({
        mutationFn: (id: number) => apiInstance.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },
    });

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
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                    onClick={() =>
                        queryClient.invalidateQueries({
                            queryKey: ["admin-users"],
                        })
                    }
                >
                    Tìm
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                    Thêm quản trị viên
                </Button>
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
                        {userList.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell>{u.id}</TableCell>
                                <TableCell>{u.name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.role ?? "USER"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteUser.mutate(u.id)}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
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

            {/* Dialog Add User */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm quản trị viên</DialogTitle>
                    </DialogHeader>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createUser.mutate();
                        }}
                    >
                        <div className="space-y-2">
                            <Label>Tên</Label>
                            <Input
                                placeholder="Họ tên"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Số điện thoại</Label>
                            <Input
                                placeholder="Số điện thoại"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Mật khẩu</Label>
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={createUser.isPending}
                            >
                                Thêm
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminUsersPage;
