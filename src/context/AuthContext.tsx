/**
 * context/AuthContext.tsx
 * Context cung cấp trạng thái đăng nhập (user, token) và hàm login/signup/logout/setUser.
 * Chỉ sử dụng token thật trả về từ backend và lưu dưới một key duy nhất "access_token".
 */
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import AUTH_API from "@/api/auth";
import type { User } from "@/types/user.type";
import { STORAGE_KEYS, AUTH_USER_KEY } from "@/constants";

// Sử dụng DUY NHẤT key "access_token" để lưu token trong localStorage
const ACCESS_TOKEN_KEY = STORAGE_KEYS.ACCESS_TOKEN;

interface AuthState {
    user: User | null;
    token: string | null;
    isReady: boolean;
}

interface AuthContextValue extends AuthState {
    // login: gọi API backend /auth/signin, lưu token + user và trả về để các tầng khác (Redux, UI) có thể dùng lại.
    login: (
        email: string,
        password: string,
    ) => Promise<{ token: string; user: User }>;
    signup: (payload: {
        taiKhoan: string;
        matKhau: string;
        hoTen: string;
        email: string;
        soDt: string;
    }) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isReady: false,
    });

    useEffect(() => {
        // Đọc lại token + user từ localStorage khi reload trang
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr) as User;
                setState({ user, token, isReady: true });
            } catch {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(AUTH_USER_KEY);
                setState({ user: null, token: null, isReady: true });
            }
        } else {
            setState((s) => ({ ...s, isReady: true }));
        }
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            // Luôn gọi API backend thật /auth/signin để lấy token JWT hợp lệ
            const res = await AUTH_API.signin({ email, password });
            const data = res.data?.content ?? res.data;
            const token =
                (data as { accessToken?: string; token?: string })
                    .accessToken ??
                (data as { accessToken?: string; token?: string }).token;
            const userRaw = (data as { user?: User }).user ?? data;
            const user: User = {
                id: (userRaw as { id: number }).id,
                name:
                    (userRaw as { name?: string }).name ??
                    (userRaw as { hoTen?: string }).hoTen ??
                    "",
                email: (userRaw as { email: string }).email ?? "",
                phone:
                    (userRaw as { soDt?: string }).soDt ??
                    (userRaw as { phone?: string }).phone,
                avatar: (userRaw as { avatar?: string }).avatar,
                role: (userRaw as { role?: string }).role,
            };
            if (!token) {
                throw new Error("Đăng nhập thất bại");
            }

            // Lưu token và user vào localStorage với key chuẩn hóa
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
            setState({ user, token, isReady: true });

            // Trả token + user để các hook khác (Redux, UI) sử dụng lại mà không cần gọi API lần 2.
            return { token, user };
        },
        [],
    );

    const signup = useCallback(
        async (payload: {
            taiKhoan: string;
            matKhau: string;
            hoTen: string;
            email: string;
            soDt: string;
        }) => {
            const res = await AUTH_API.signup(payload);
            const data = res.data?.content ?? res.data;
            const token =
                (data as { accessToken?: string; token?: string })
                    .accessToken ??
                (data as { accessToken?: string; token?: string }).token;
            const userRaw = (data as { user?: User }).user ?? data;
            const user: User = {
                id: (userRaw as { id: number }).id,
                name:
                    (userRaw as { name?: string }).name ??
                    (userRaw as { hoTen?: string }).hoTen ??
                    payload.hoTen,
                email: (userRaw as { email: string }).email ?? payload.email,
                phone: (userRaw as { soDt?: string }).soDt ?? payload.soDt,
                avatar: (userRaw as { avatar?: string }).avatar,
                role: (userRaw as { role?: string }).role,
            };
            if (token) {
                // Lưu token và user vào localStorage với key chuẩn hóa
                localStorage.setItem(ACCESS_TOKEN_KEY, token);
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
                setState({ user, token, isReady: true });
            } else {
                throw new Error("Đăng ký thành công, vui lòng đăng nhập");
            }
        },
        [],
    );

    const logout = useCallback(() => {
        // Xóa toàn bộ thông tin đăng nhập (token + user) khỏi localStorage
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setState({ user: null, token: null, isReady: true });
    }, []);

    const setUser = useCallback((user: User | null) => {
        setState((s) => {
            if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
            return { ...s, user };
        });
    }, []);

    const value: AuthContextValue = {
        ...state,
        login,
        signup,
        logout,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
