/**
 * context/AuthContext.tsx
 * Context cung cấp trạng thái đăng nhập (user, token) và hàm login/signup/logout/setUser.
 * Hỗ trợ đăng nhập local với tài khoản admin demo (không gọi API). Các component dùng useAuth() để lấy/sử dụng auth.
 */
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import AUTH_API from "@/api/auth";
import { APP_CONFIG } from "@/config";
import type { User } from "@/types/user.type";
import { STORAGE_KEYS, AUTH_USER_KEY } from "@/constants";

const AUTH_TOKEN_KEY = "auth_token"; // AuthContext key
const ACCESS_TOKEN_KEY = STORAGE_KEYS.ACCESS_TOKEN; // Redux key

interface AuthState {
    user: User | null;
    token: string | null;
    isReady: boolean;
}

interface AuthContextValue extends AuthState {
    login: (taiKhoan: string, matKhau: string) => Promise<void>;
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
        // Try to read from either Redux key (access_token) or AuthContext key (auth_token)
        const token =
            localStorage.getItem(ACCESS_TOKEN_KEY) ||
            localStorage.getItem(AUTH_TOKEN_KEY);
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr) as User;
                setState({ user, token, isReady: true });
            } catch {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(AUTH_TOKEN_KEY);
                localStorage.removeItem(AUTH_USER_KEY);
                setState({ user: null, token: null, isReady: true });
            }
        } else {
            setState((s) => ({ ...s, isReady: true }));
        }
    }, []);

    const login = useCallback(async (taiKhoan: string, matKhau: string) => {
        // Nếu trùng với tài khoản admin mặc định thì cho đăng nhập local, không gọi API
        if (
            taiKhoan === APP_CONFIG.DEFAULT_ADMIN_ACCOUNT.taiKhoan &&
            matKhau === APP_CONFIG.DEFAULT_ADMIN_ACCOUNT.matKhau
        ) {
            const adminUser: User = {
                id: -1,
                name: APP_CONFIG.DEFAULT_ADMIN_ACCOUNT.name,
                email: APP_CONFIG.DEFAULT_ADMIN_ACCOUNT.email,
                phone: undefined,
                avatar: undefined,
                gender: true,
                role: "ADMIN",
            };
            const fakeToken = "ADMIN_DEMO_TOKEN";
            // Save to both keys for compatibility
            localStorage.setItem(ACCESS_TOKEN_KEY, fakeToken);
            localStorage.setItem(AUTH_TOKEN_KEY, fakeToken);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
            setState({ user: adminUser, token: fakeToken, isReady: true });
            return;
        }

        const res = await AUTH_API.signin({ taiKhoan, matKhau });
        const data = res.data?.content ?? res.data;
        const token =
            (data as { accessToken?: string; token?: string }).accessToken ??
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
        if (token) {
            // Save to both keys for compatibility
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
            setState({ user, token, isReady: true });
        } else {
            throw new Error("Đăng nhập thất bại");
        }
    }, []);

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
                // Save to both keys for compatibility
                localStorage.setItem(ACCESS_TOKEN_KEY, token);
                localStorage.setItem(AUTH_TOKEN_KEY, token);
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
                setState({ user, token, isReady: true });
            } else {
                throw new Error("Đăng ký thành công, vui lòng đăng nhập");
            }
        },
        [],
    );

    const logout = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
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
