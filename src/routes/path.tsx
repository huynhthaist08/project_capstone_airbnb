// Private path: Những path cần người dùng đăng nhập thì mới có thể truy cập được
export const PRIVATE_PATH = {
    PROFILE: "/profile",
    ADMIN: "/admin",
    ADMIN_USERS: "/admin/QuanLyNguoiDung",
    ADMIN_LOCATIONS: "/admin/QuanLyViTri",
    ADMIN_ROOMS: "/admin/QuanLyPhong",
    ADMIN_BOOKINGS: "/admin/QuanLyDatPhong",
};

// Public path: Những path không cần đăng nhập vẫn có thể truy cập được
export const PUBLIC_PATH = {
    HOME: "/",
    SIGN_UP: "/dang-ky",
    LOG_IN: "/dang-nhap",
    ROOMS_BY_LOCATION: "/phong-theo-vi-tri",
    ROOM_DETAIL: "/phong",
    NOT_FOUND: "*",

    EXPERIENCE: "/trai-nghiem",
    SERVICE: "/dich-vu",
};

export function roomsByLocationPath(maViTri: number) {
    return `${PUBLIC_PATH.ROOMS_BY_LOCATION}/${maViTri}`;
}
