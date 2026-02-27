/**
 * AdminUsersPage: trang admin quản lý người dùng — bảng phân trang + tìm kiếm, thêm user (dialog), xóa user; gọi API users/phan-trang-tim-kiem, users (POST/DELETE).
 */
import { useState } from "react";
import type { User } from "./server/user.type";
import { getPaginatedData } from "@/utils/apiResponse";
import {
    useGetAdminUsers,
    useCreateAdminUser,
    useUpdateAdminUser,
    useDeleteAdminUser,
} from "./hook";
import {
    UsersSearchBar,
    UsersTable,
    UsersPagination,
    UserDialog,
} from "./components";

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

    // Custom hooks for user management
    const { data } = useGetAdminUsers({
        pageIndex,
        pageSize,
        keyword,
    });

    const { data: userList, totalPage } = getPaginatedData<User>(data);

    console.log("[PAGE] User list loaded:", { count: userList?.length || 0, totalPage, keyword, pageIndex });

    const createUser = useCreateAdminUser();
    const updateUser = useUpdateAdminUser();
    const deleteUser = useDeleteAdminUser();


    const handleCreateSuccess = () => {
        console.log("Create operation completed, closing dialog");
        setIsDialogOpen(false);
        setForm({
            name: "",
            email: "",
            password: "",
            phone: "",
        });
    };

    const handleUpdateSuccess = () => {
        console.log("Update operation completed, closing dialog");
        setIsDialogOpen(false);
        setEditingUser(null);
        setForm({
            name: "",
            email: "",
            password: "",
            phone: "",
        });
    };

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
            <UsersSearchBar
                keyword={keyword}
                setKeyword={setKeyword}
                setIsDialogOpen={setIsDialogOpen}
            />

            {/* Table */}
            <UsersTable
                userList={userList}
                setEditingUser={setEditingUser}
                setForm={setForm}
                setIsDialogOpen={setIsDialogOpen}
                deleteUser={deleteUser}
            />

            {/* Pagination */}
            <UsersPagination
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                totalPage={totalPage}
            />

            {/* Dialog Add/Edit User */}
            <UserDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
                form={form}
                setForm={setForm}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                createUser={createUser}
                updateUser={updateUser}
                onCreateSuccess={handleCreateSuccess}
                onUpdateSuccess={handleUpdateSuccess}
            />
        </div>
    );
};

export default AdminUsersPage;
