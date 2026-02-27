import { Button } from "@/core/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";
import type { User } from "../server/user.type";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

type UsersTableProps = {
    userList: User[];
    setEditingUser: Dispatch<SetStateAction<User | null>>;
    setForm: Dispatch<
        SetStateAction<{
            name: string;
            email: string;
            password: string;
            phone: string;
        }>
    >;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    deleteUser: UseMutationResult<any, Error, number, unknown>;
};

export const UsersTable = ({
    userList,
    setEditingUser,
    setForm,
    setIsDialogOpen,
    deleteUser,
}: UsersTableProps) => {
    return (
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
    );
};
