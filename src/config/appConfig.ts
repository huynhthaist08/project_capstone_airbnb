export const APP_CONFIG = {
    headerHeight: 80, // set chiều cao Header

    TOKEN_CYBERSOFT: import.meta.env.VITE_TOKEN_CYBERSOFT,
    BASE_URL: import.meta.env.VITE_BASE_URL,

    // Tài khoản admin mặc định dùng cho FE demo (không phụ thuộc Swagger)
    DEFAULT_ADMIN_ACCOUNT: {
        taiKhoan: "admin_demo",
        matKhau: "Admin@123",
        name: "Admin Demo",
        email: "admin-demo@airbnb-clone.local",
    },
};
