import AppLayout from "@/pages/AppLayout/AppLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PRIVATE_PATH, PUBLIC_PATH } from "./path";
import HomePage from "@/pages/HomePage/HomePage";
import { SignUpPage } from "@/pages/SignUpPage";
import {LogInPage} from "@/pages/LogInPage";
import AdminLayout from "@/pages/AdminLayout/AdminLayout";
import AdminUsersPage from "@/pages/AdminUsersPage/AdminUsersPage";
import AdminLocationsPage from "@/pages/AdminLocationsPage/AdminLocationsPage";
import AdminBookingsPage from "@/pages/AdminBookingsPage/AdminBookingsPage";
import AdminRoomsPage from "@/pages/AdminRoomsPage/AdminRoomsPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

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
