import AppLayout from "@/pages/AppLayout/AppLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PRIVATE_PATH, PUBLIC_PATH } from "./path";
import HomePage from "@/pages/HomePage/HomePage";
import { SignUpPage } from "@/pages/SignUpPage";
import { LogInPage } from "@/pages/LogInPage";
import AdminLayout from "@/pages/AdminLayout/AdminLayout";
import AdminUsersPage from "@/pages/AdminUsersPage/AdminUsersPage";
import AdminLocationsPage from "@/pages/AdminLocationsPage/AdminLocationsPage";
import AdminBookingsPage from "@/pages/AdminBookingsPage/AdminBookingsPage";
import AdminRoomsPage from "@/pages/AdminRoomsPage/AdminRoomsPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import ExperiencePage from "@/pages/ExperiencePage/ExperiencePage";
import ServicePage from "@/pages/ServicePage/ServicePage";
import RoomsByLocationPage from "@/pages/RoomsByLocationPage/RoomsByLocationPage";

const element = createBrowserRouter([
    // Mỗi object tương ứng với một route <Route />
    // Public path
    {
        path: "/",
        element: <AppLayout />,

        // Nested route render trong <Outlet />
        children: [
            // Home page
            {
                path: PUBLIC_PATH.HOME,
                element: <HomePage />,
            },

            // Sign up page
            {
                path: PUBLIC_PATH.SIGN_UP,
                element: <SignUpPage />,
            },

            // Log in page
            {
                path: PUBLIC_PATH.LOG_IN,
                element: <LogInPage />,
            },

            // Trải nghiệm
            {
                path: PUBLIC_PATH.EXPERIENCE,
                element: <ExperiencePage />,
            },

            // Dịch vụ
            {
                path: PUBLIC_PATH.SERVICE,
                element: <ServicePage />,
            },

            // Phòng thuê theo vị trí
            {
                path: `${PUBLIC_PATH.ROOMS_BY_LOCATION}/:maViTri`,
                element: <RoomsByLocationPage />,
            },

            // Trang chi tiết phòng
            {
                path: `${PUBLIC_PATH.ROOM_DETAIL}/:id`,
            },
        ],
    },

    // Private path
    {
        path: PRIVATE_PATH.ADMIN,
        element: <AdminLayout />,

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
