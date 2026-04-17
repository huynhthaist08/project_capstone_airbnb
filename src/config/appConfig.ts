// Cấu hình app: chiều cao header, BASE_URL và TOKEN_CYBERSOFT từ .env, tài khoản admin demo (đăng nhập local không gọi API).

export const APP_CONFIG = {
    headerHeight: 80,

    TOKEN_CYBERSOFT: import.meta.env.VITE_TOKEN_CYBERSOFT,
    BASE_URL: import.meta.env.VITE_BASE_URL,

    DEFAULT_ADMIN_ACCOUNT: {
        taiKhoan: "admin_demo",
        matKhau: "Admin@123",
        name: "Admin Demo",
        email: "admin-demo@airbnb-clone.local",
    },
};
