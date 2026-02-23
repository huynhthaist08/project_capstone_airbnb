import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

// AppLayout: Layout khung chính của ứng dụng, cố định Header/Footer
// và render nội dung trang con thông qua `<Outlet />` của React Router.
const AppLayout = () => {
    return (
        <div className="min-h-dvh flex flex-col">
            <Header />
            <div className="flex flex-1 flex-col overflow-auto">
                <main className="flex-1">
                    <div className="container mx-auto px-4 py-4">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default AppLayout;
