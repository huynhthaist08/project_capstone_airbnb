import AppLayout from "@/pages/AppLayout/AppLayout";
import { createBrowserRouter } from "react-router-dom";
import { PUBLIC_PATH } from "./path";
import HomePage from "@/pages/HomePage/HomePage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";

const element = createBrowserRouter([
    // Mỗi object tương ứng với một route <Route />
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
        ],
    },
]);

export default element;
