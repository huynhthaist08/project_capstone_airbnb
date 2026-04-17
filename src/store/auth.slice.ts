// Redux slice quản lý trạng thái đăng nhập: token + user. Khởi tạo từ localStorage (access_token, auth_user).
// Actions: setCredentials (sau login), updateUser, logout. Dùng cho Header/DropDown và các màn cần biết user đã login chưa.

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS, AUTH_USER_KEY } from "@/constants";

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

const persistedToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

let persistedUser: UserInfo | null = null;
try {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (userStr) {
        persistedUser = JSON.parse(userStr) as UserInfo;
    }
} catch {
    // Nếu parse lỗi thì clear để tránh crash
    localStorage.removeItem(AUTH_USER_KEY);
    persistedUser = null;
}

const initialState: AuthState = {
    isAuthenticated: !!persistedToken,
    accessToken: persistedToken,
    user: persistedUser,
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
            if (action.payload.user) {
                localStorage.setItem(
                    AUTH_USER_KEY,
                    JSON.stringify(action.payload.user),
                );
            }
        },
        updateUser: (state, action: PayloadAction<UserInfo>) => {
            state.user = action.payload;
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(AUTH_USER_KEY);
        },
    },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
