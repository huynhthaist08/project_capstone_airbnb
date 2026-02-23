export interface SignUpPayload {
    taiKhoan: string;
    matKhau: string;
    hoTen: string;
    email: string;
    soDt: string;
}

export interface SignInPayload {
    taiKhoan: string;
    matKhau: string;
}

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

// xem lai
