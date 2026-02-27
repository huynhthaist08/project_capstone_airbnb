import PHONG_THUE from "@/api/phong-thue";
import LOCATION from "@/api/vi-tri";
import type { Room, RoomFormData } from "./room.type";

export const roomsApi = {
    // Get paginated rooms
    getPaginated: (pageIndex: number, pageSize: number, keyword?: string) =>
        PHONG_THUE.getPaginated({
            pageIndex,
            pageSize,
            keyword: keyword || "",
        }),

    // Get all locations
    getAllLocations: () => LOCATION.getAll(),

    // Create room
    create: (data: RoomFormData) =>
        PHONG_THUE.create({
            tenPhong: data.tenPhong.trim(),
            khach: Number(data.khach) || 1,
            phongNgu: Number(data.phongNgu) || 0,
            giuong: Number(data.giuong) || 0,
            phongTam: Number(data.phongTam) || 0,
            moTa: data.moTa.trim(),
            giaTien: Number(data.giaTien) || 0,
            mayGiat: Boolean(data.mayGiat),
            banLa: Boolean(data.banLa),
            tivi: Boolean(data.tivi),
            dieuHoa: Boolean(data.dieuHoa),
            wifi: Boolean(data.wifi),
            bep: Boolean(data.bep),
            doXe: Boolean(data.doXe),
            hoBoi: Boolean(data.hoBoi),
            banUi: Boolean(data.banUi),
            maViTri: Number(data.maViTri) || 0,
            hinhAnh: data.hinhAnh.trim() || undefined,
        }),

    // Update room
    update: (id: number, data: Partial<Room>) =>
        PHONG_THUE.update(id, data),

    // Delete room
    delete: (id: number) => PHONG_THUE.delete(id),

    // Upload room image
    uploadImage: (id: number, file: File) =>
        PHONG_THUE.uploadImage(id, file),
};
