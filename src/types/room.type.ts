// Định nghĩa kiểu dữ liệu phòng (Room) và các tham số lọc/phân trang liên quan đến phòng.
export type Room = {
    id: number;
    tenPhong: string;
    khach: number;
    phongNgu: number;
    giuong: number;
    phongTam: number;
    moTa: string;
    giaTien: number;
    mayGiat: boolean;
    banLa: boolean;
    tivi: boolean;
    dieuHoa: boolean;
    wifi: boolean;
    bep: boolean;
    doXe: boolean;
    hoBoi: boolean;
    banUi: boolean;
    maViTri: number;
    hinhAnh: string;
};

// Tham số khi gọi API lấy phòng theo vị trí.
export type RoomByLocationParams = {
    maViTri: number;
};

// Tham số phân trang khi lấy danh sách phòng.
export type RoomPaginatedParams = {
    pageIndex: number;
    pageSize: number;
    keyword: string;
};
