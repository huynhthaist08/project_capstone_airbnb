import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

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

// AppLayout: Layout gốc chứa Header và Footer cho cả App
