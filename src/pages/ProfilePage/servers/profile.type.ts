// base
export interface ApiResponse<T> {
    statusCode: number;
    content: T;
    dateTime?: string;
}

// user
export type UserRole = "ADMIN" | "USER";

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    birthday: string;
    avatar: string | null;
    gender: boolean;
    role: UserRole;
}

export type GetUserProfileResponse = ApiResponse<UserProfile>;

export type UpdateUserProfileBody = Omit<UserProfile, "id" | "avatar" | "role">;

export type UpdateUserProfileResponse = ApiResponse<UserProfile>;

// booking
export interface Booking {
    id: number;
    maPhong: number;
    ngayDen: string;
    ngayDi: string;
    soLuongKhach: number;
    maNguoiDung: number;
}

export type GetUserBookingResponse = ApiResponse<Booking[]>;
