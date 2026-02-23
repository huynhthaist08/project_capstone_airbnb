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
