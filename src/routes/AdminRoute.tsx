/**
 * routes/AdminRoute.tsx
 * Component bảo vệ khu vực admin: chỉ cho phép user có role === "ADMIN" truy cập.
 * Nếu không đủ quyền sẽ hiện toast và redirect về trang chủ client.
 */
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { PRIVATE_PATH } from "./path";

type AdminRouteProps = {
    children: ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user, isReady } = useAuth();
    const location = useLocation();

    // Khi user không phải ADMIN hoặc chưa đăng nhập, hiển thị thông báo (chạy trong effect để tránh lặp lại nhiều lần).
    useEffect(() => {
        if (!isReady) return;
        if (!user) {
            // Chưa đăng nhập - sẽ được redirect đến trang login
            return;
        }
        if (user.role !== "ADMIN") {
            toast.error("Tài khoản này không có quyền truy cập admin");
        }
    }, [isReady, user]);

    // Trong lúc AuthContext chưa hydrate xong (ví dụ mới reload), tạm thời chưa render gì.
    if (!isReady) {
        return null;
    }

    if (!user || user.role !== "ADMIN") {
        return (
            <Navigate
                to={PRIVATE_PATH.ADMIN_SIGN_IN}
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // Đã đăng nhập và có role ADMIN => render layout/page admin bình thường.
    return <>{children}</>;
};

export default AdminRoute;

