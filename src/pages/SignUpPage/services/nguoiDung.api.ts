// API đăng ký: gọi POST /auth/signup với payload user (bỏ confirmPassword).
import api from "@/shared/services/api";
import type { SignUpFormType } from "../schema";

export const nguoiDungApi = {
    register: (payload: Omit<SignUpFormType, "confirmPassword">) =>
        api.post("/auth/signup", payload),
};
