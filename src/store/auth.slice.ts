import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "@/constants";

type UserInfo = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    birthday?: string;
    avatar?: string;
    gender?: boolean;
    role?: string;
};

type AuthState = {
    accessToken: string | null;
    isAuthenticated?: boolean;
    user?: UserInfo | null;
};

const initialState: AuthState = {
    // kiểm tea xem có token trong localstorage để xác định trạng thái đăng nhập
    isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    //lấy token từ localstorage khi khởi tạ state
    accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user?: UserInfo }>,
        ) => {
            state.accessToken = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user || null;
            localStorage.setItem(
                STORAGE_KEYS.ACCESS_TOKEN,
                action.payload.token,
            );
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
