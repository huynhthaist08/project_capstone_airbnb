// Kiểu User và payload gửi API đăng ký (taiKhoan, matKhau, hoTen, email, soDt).
export type SignUp = {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role: string;
};

export type SignUpPayload = {
    taiKhoan: string;
    matKhau: string;
    hoTen: string;
    email: string;
    soDt: string;
};
