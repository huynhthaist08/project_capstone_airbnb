// PRIVATE_PATH: Các route yêu cầu người dùng đã đăng nhập (protected routes).
export const PRIVATE_PATH = {
    PROFILE: "/profile",
    ADMIN: "/admin",
    ADMIN_USERS: "/admin/QuanLyNguoiDung",
    ADMIN_LOCATIONS: "/admin/QuanLyViTri",
    ADMIN_ROOMS: "/admin/QuanLyPhong",
    ADMIN_BOOKINGS: "/admin/QuanLyDatPhong",
};

// PUBLIC_PATH: Các route công khai, người dùng không cần đăng nhập vẫn truy cập được.
export const PUBLIC_PATH = {
    HOME: "/",
    SIGN_UP: "/dang-ky",
    SIGN_IN: "/dang-nhap",
    ROOMS_BY_LOCATION: "/phong-thue/lay-phong-theo-vi-tri",
    ROOM_DETAIL: "/phong-thue",
    NOT_FOUND: "*",

    EXPERIENCE: "/trai-nghiem",
    SERVICE: "/dich-vu",
};

// roomDetailPath: Helper build URL chi tiết phòng theo `id` phòng.
export function roomDetailPath(id: number) {
    return `${PUBLIC_PATH.ROOM_DETAIL}/${id}`;
}

// roomsByLocationPath: Helper build URL danh sách phòng theo `maViTri` (id vị trí).
export function roomsByLocationPath(maViTri: number) {
    return `${PUBLIC_PATH.ROOMS_BY_LOCATION}/${maViTri}`;
}
