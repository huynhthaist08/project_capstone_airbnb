// Module gọi API xác thực: đăng ký và đăng nhập
// Dùng chung apiInstance nên mọi request đều có baseURL, TokenCybersoft và Bearer token (nếu đã login).

import type {
    AuthResponse,
    SignInPayload,
    SignUpPayload,
} from "@/types/auth.type";
import apiInstance from "@/shared/services/api";

const AUTH = {
    signup: (payload: SignUpPayload) =>
        apiInstance.post<{ content: AuthResponse }>("/auth/signup", payload),
    signin: (payload: SignInPayload) =>
        apiInstance.post<{ content: AuthResponse }>("/auth/signin", payload),
};

export default AUTH;
