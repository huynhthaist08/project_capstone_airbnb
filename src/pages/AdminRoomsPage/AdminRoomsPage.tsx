/**
 * AdminRoomsPage: trang admin quản lý phòng — bảng phân trang + tìm kiếm, thêm/sửa/xóa phòng (form có chọn vị trí); gọi API phong-thue và vi-tri.
 */
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    RoomsSearchBar,
    RoomsTable,
    RoomsPagination,
    RoomDialog,
} from "./components";
import {
    useGetAdminRooms,
    useCreateAdminRoom,
    useUpdateAdminRoom,
    useDeleteAdminRoom,
    useUploadRoomImage,
    useGetLocations,
} from "./hook";
import type { Room, RoomFormData } from "./server";

const getDefaultFormState = (): RoomFormData => ({
    tenPhong: "",
    khach: 1,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: "",
});

const AdminRoomsPage = () => {
    const [keyword, setKeyword] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [form, setForm] = useState<RoomFormData>(getDefaultFormState());

    const pageSize = 10;
    const queryClient = useQueryClient();

    // Hooks
    const { roomList, totalPage } = useGetAdminRooms(
        pageIndex,
        pageSize,
        keyword,
    );
    const { locationOptions } = useGetLocations();
    const createRoom = useCreateAdminRoom();
    const updateRoom = useUpdateAdminRoom();
    const deleteRoom = useDeleteAdminRoom();
    const uploadRoomImage = useUploadRoomImage();

    // Handlers
    const handleSearch = () => {
        queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
    };

    const handleAddNew = () => {
        setEditingRoom(null);
        setForm(getDefaultFormState());
        setEditImageFile(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (room: Room) => {
        setEditingRoom(room);
        setForm({
            tenPhong: room.tenPhong,
            khach: room.khach,
            phongNgu: room.phongNgu,
            giuong: room.giuong,
            phongTam: room.phongTam,
            moTa: room.moTa,
            giaTien: room.giaTien,
            mayGiat: room.mayGiat,
            banLa: room.banLa,
            tivi: room.tivi,
            dieuHoa: room.dieuHoa,
            wifi: room.wifi,
            bep: room.bep,
            doXe: room.doXe,
            hoBoi: room.hoBoi,
            banUi: room.banUi,
            maViTri: room.maViTri,
            hinhAnh: room.hinhAnh ?? "",
        });
        setEditImageFile(null);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        deleteRoom.mutate(id);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingRoom(null);
        setEditImageFile(null);
        setForm(getDefaultFormState());
    };

    const handleSubmit = () => {
        if (editingRoom) {
            updateRoom.mutate(
                { id: editingRoom.id, data: form },
                {
                    onSuccess: () => {
                        if (editImageFile) {
                            uploadRoomImage.mutate({
                                id: editingRoom.id,
                                file: editImageFile,
                            });
                            setEditImageFile(null);
                        }
                        handleDialogClose();
                    },
                },
            );
        } else {
            createRoom.mutate(form, {
                onSuccess: () => {
                    handleDialogClose();
                },
            });
        }
    };

    const isLoading =
        createRoom.isPending ||
        updateRoom.isPending ||
        uploadRoomImage.isPending;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý thông tin phòng</h1>
            </div>

            {/* Search */}
            <RoomsSearchBar
                keyword={keyword}
                onKeywordChange={setKeyword}
                onSearch={handleSearch}
                onAddNew={handleAddNew}
            />

            {/* Table */}
            <RoomsTable
                rooms={roomList}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Pagination */}
            <RoomsPagination
                pageIndex={pageIndex}
                totalPage={totalPage}
                onPageChange={setPageIndex}
            />

            {/* Dialog */}
            <RoomDialog
                isOpen={isDialogOpen}
                editingRoom={editingRoom}
                form={form}
                onFormChange={setForm}
                onClose={handleDialogClose}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                locationOptions={locationOptions}
                editImageFile={editImageFile}
                onImageFileChange={setEditImageFile}
            />
        </div>
    );
};

export default AdminRoomsPage;
