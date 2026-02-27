import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/core/ui/dialog";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import type { User } from "../server/user.type";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

type UserDialogProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    editingUser: User | null;
    setEditingUser: Dispatch<SetStateAction<User | null>>;
    form: {
        name: string;
        email: string;
        password: string;
        phone: string;
    };
    setForm: Dispatch<
        SetStateAction<{
            name: string;
            email: string;
            password: string;
            phone: string;
        }>
    >;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    createUser: UseMutationResult<
        any,
        Error,
        {
            name: string;
            email: string;
            password: string;
            phone?: string;
            role?: string;
        },
        unknown
    >;
    updateUser: UseMutationResult<
        any,
        Error,
        { id: number; data: Partial<User> },
        unknown
    >;
    onCreateSuccess?: () => void;
    onUpdateSuccess?: () => void;
};

export const UserDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    editingUser,
    setEditingUser,
    form,
    setForm,
    showPassword,
    setShowPassword,
    createUser,
    updateUser,
    onCreateSuccess,
    onUpdateSuccess,
}: UserDialogProps) => {
    return (
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
                        console.log("[DIALOG] Form submitted");
                        if (editingUser) {
                            console.log("[DIALOG] Updating user:", editingUser.id);
                            updateUser.mutate(
                                {
                                    id: editingUser.id,
                                    data: {
                                        name: form.name.trim(),
                                        email: form.email.trim(),
                                        phone:
                                            form.phone.trim() || undefined,
                                        ...(form.password
                                            ? { password: form.password }
                                            : {}),
                                    },
                                },
                                {
                                    onSuccess: () => {
                                        console.log("[DIALOG] Update mutation success");
                                        onUpdateSuccess?.();
                                    },
                                },
                            );
                        } else {
                            console.log("[DIALOG] Creating new user");
                            createUser.mutate(
                                {
                                    name: form.name.trim(),
                                    email: form.email.trim(),
                                    password: form.password,
                                    phone: form.phone.trim() || undefined,
                                    role: "ADMIN",
                                },
                                {
                                    onSuccess: () => {
                                        console.log("[DIALOG] Create mutation success");
                                        onCreateSuccess?.();
                                    },
                                },
                            );
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

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsDialogOpen(false);
                                setEditingUser(null);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                createUser.isPending ||
                                updateUser.isPending
                            }
                        >
                            {editingUser ? "Lưu thay đổi" : "Thêm"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
