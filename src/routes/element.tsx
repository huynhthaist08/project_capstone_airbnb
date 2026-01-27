import HomeLayout from "@/pages/AppLayout/AppLayout";
import { createBrowserRouter } from "react-router-dom";

const element = createBrowserRouter([
    // Mỗi object tương ứng với một route <Route />
    {
        path: "/",
        element: <HomeLayout />,

        // nested route render trong <Outlet />

    },
]);

export default element;
