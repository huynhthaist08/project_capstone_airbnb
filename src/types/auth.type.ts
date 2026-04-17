// Định nghĩa payload auth (đăng ký/đăng nhập) và response trả về từ server.
export interface SignUpPayload {
    taiKhoan: string;
    matKhau: string;
    hoTen: string;
    email: string;
    soDt: string;
}

export interface SignInPayload {
    email: string;
    password: string;
}

// AuthResponse: cấu trúc dữ liệu cho response đăng nhập, gồm accessToken và thông tin user.
export interface AuthResponse {
    accessToken: string;
    user: {
        id: number;
        name: string;
        email: string;
        password?: string;
        phone?: string;
        birthday?: string;
        avatar?: string;
        gender?: boolean;
        role?: string;
    };
}
