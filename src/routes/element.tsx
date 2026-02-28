/**
 * routes/element.tsx
 * Định nghĩa cấu hình router (createBrowserRouter): layout chính (AppLayout) với các route con công khai (home, đăng ký/đăng nhập, trải nghiệm, dịch vụ, phòng theo vị trí, chi tiết phòng); layout admin với các route quản lý; và 404.
 */
import AppLayout from "@/pages/AppLayout/AppLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PRIVATE_PATH, PUBLIC_PATH } from "./path";
import HomePage from "@/pages/HomePage/HomePage";
import { SignUpPage } from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage/components/SignInPage";
import AdminSignInPage from "@/pages/AdminSignInPage/components/AdminSignInPage";
import AdminLayout from "@/pages/AdminLayout/AdminLayout";
import AdminUsersPage from "@/pages/AdminUsersPage/AdminUsersPage";
import AdminLocationsPage from "@/pages/AdminLocationsPage/AdminLocationsPage";
import AdminBookingsPage from "@/pages/AdminBookingsPage/AdminBookingsPage";
import AdminRoomsPage from "@/pages/AdminRoomsPage/AdminRoomsPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import ExperiencePage from "@/pages/ExperiencePage/ExperiencePage";
import ServicePage from "@/pages/ServicePage/ServicePage";
import RoomsByLocationPage from "@/pages/RoomsByLocationPage/RoomsByLocationPage";
import RoomDetailPage from "@/pages/RoomDetailPage/RoomDetailPage";
import ProfilePage from "@/pages/ProfilePage/components/ProfilePage";
import AdminRoute from "./AdminRoute";
const element = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,

        // Nested route render trong <Outlet />
        children: [
            {
                path: PUBLIC_PATH.HOME,
                element: <HomePage />,
            },

            {
                path: PUBLIC_PATH.SIGN_UP,
                element: <SignUpPage />,
            },

            {
                path: PUBLIC_PATH.SIGN_IN,
                element: <SignInPage />,
            },

            {
                path: PUBLIC_PATH.EXPERIENCE,
                element: <ExperiencePage />,
            },

            {
                path: PUBLIC_PATH.SERVICE,
                element: <ServicePage />,
            },

            {
                path: `${PRIVATE_PATH.PROFILE}/:id`,
                element: <ProfilePage />,
            },

            {
                path: `${PUBLIC_PATH.ROOMS_BY_LOCATION}/:maViTri`,
                element: <RoomsByLocationPage />,
            },

            {
                path: `${PUBLIC_PATH.ROOM_DETAIL}/:id`,
                element: <RoomDetailPage />,
            },
        ],
    },

    // Admin login - công khai, không cần được bảo vệ
    {
        path: PRIVATE_PATH.ADMIN_SIGN_IN,
        element: <AdminSignInPage />,
    },

    {
        path: PRIVATE_PATH.ADMIN,
        // Bọc toàn bộ layout admin trong AdminRoute để kiểm soát quyền truy cập theo role.
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),

        children: [
            {
                index: true,
                element: <Navigate to={PRIVATE_PATH.ADMIN_USERS} replace />,
            },
            {
                path: "QuanLyNguoiDung",
                element: <AdminUsersPage />,
            },
            {
                path: "QuanLyViTri",
                element: <AdminLocationsPage />,
            },
            {
                path: "QuanLyPhong",
                element: <AdminRoomsPage />,
            },
            {
                path: "QuanLyDatPhong",
                element: <AdminBookingsPage />,
            },
        ],
    },

    {
        path: PUBLIC_PATH.NOT_FOUND,
        element: <NotFoundPage />,
    },
]);

export default element;
