/**
 * AdminUsersPage: trang admin quản lý người dùng — bảng phân trang + tìm kiếm, thêm user (dialog), xóa user; gọi API users/phan-trang-tim-kiem, users (POST/DELETE).
 */
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
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import type { User } from "@/types/user.type";
import { getPaginatedData } from "@/utils/apiResponse";
import USERS from "@/api/users";

const AdminUsersPage = () => {
    const [keyword, setKeyword] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    // [ADMIN] File avatar khi sửa (upload chung trong form Sửa)
    const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null);
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["admin-users", keyword, pageIndex],
        queryFn: () =>
            USERS.getPaginated({
                pageIndex,
                pageSize,
                keyword: keyword || undefined,
            }),
    });

    const { data: userList, totalPage } = getPaginatedData<User>(data);

    const createUser = useMutation({
        mutationFn: () =>
            USERS.create({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
                phone: form.phone.trim() || undefined,
                role: "ADMIN",
            }),
        onSuccess: () => {
            setIsDialogOpen(false);
            setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
            });
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },
    });

    const updateUser = useMutation({
        mutationFn: (payload: { id: number; data: Partial<User> }) =>
            USERS.update(payload.id, payload.data),
        onSuccess: () => {
            setIsDialogOpen(false);
            setEditingUser(null);
            setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
            });
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },
    });

    const deleteUser = useMutation({
        mutationFn: (id: number) => USERS.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },
    });

    const uploadAvatar = useMutation({
        mutationFn: (payload: { id: number; file: File }) =>
            USERS.uploadAvatar(payload.id, payload.file),
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
            <div className="rounded-md border bg-background overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Avatar</TableHead>
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
                                <TableCell>
                                    {u.avatar && (
                                        <img
                                            src={u.avatar}
                                            alt={u.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{u.role ?? "USER"}</TableCell>
                                <TableCell className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setEditingUser(u);
                                            setForm({
                                                name: u.name,
                                                email: u.email,
                                                password: "",
                                                phone: u.phone ?? "",
                                            });
                                            setEditAvatarFile(null);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        Sửa
                                    </Button>
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

            {/* Dialog Add/Edit User */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingUser
                                ? "Sửa thông tin quản trị viên"
                                : "Thêm quản trị viên"}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editingUser) {
                                updateUser.mutate(
                                    {
                                        id: editingUser.id,
                                        data: {
                                            name: form.name.trim(),
                                            email: form.email.trim(),
                                            phone:
                                                form.phone.trim() || undefined,
                                            // Không bắt buộc đổi password khi sửa
                                            ...(form.password
                                                ? { password: form.password }
                                                : {}),
                                        },
                                    },
                                    {
                                        onSuccess: () => {
                                            if (editAvatarFile) {
                                                uploadAvatar.mutate({
                                                    id: editingUser.id,
                                                    file: editAvatarFile,
                                                });
                                                setEditAvatarFile(null);
                                            }
                                        },
                                    },
                                );
                            } else {
                                createUser.mutate();
                            }
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
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mật khẩu"
                                    className="pr-10"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="w-4 h-4" />
                                    ) : (
                                        <FaEye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {editingUser && (
                            <div className="space-y-2">
                                <Label>Avatar (upload mới)</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] ?? null;
                                        setEditAvatarFile(file);
                                    }}
                                />
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    setEditingUser(null);
                                    setEditAvatarFile(null);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    createUser.isPending ||
                                    updateUser.isPending ||
                                    uploadAvatar.isPending
                                }
                            >
                                {editingUser ? "Lưu thay đổi" : "Thêm"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminUsersPage;
