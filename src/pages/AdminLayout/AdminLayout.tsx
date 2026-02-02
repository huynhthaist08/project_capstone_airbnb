import logoImg from "@/assets/images/logo.png";
import { Button } from "@/core/ui/button";
import { PRIVATE_PATH, PUBLIC_PATH } from "@/routes/path";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const adminNav = [
    {
        to: PRIVATE_PATH.ADMIN_USERS,
        label: "Quản lý người dùng",
    },
    {
        to: PRIVATE_PATH.ADMIN_LOCATIONS,
        label: "Quản lý thông tin vị trí",
    },
    {
        to: PRIVATE_PATH.ADMIN_ROOMS,
        label: "Quản lý thông tin phòng",
    },
    {
        to: PRIVATE_PATH.ADMIN_BOOKINGS,
        label: "Quản lý đặt phòng",
    },
];

const AdminLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-(--color-bg-header) ml-6 mr-6">
            {/* Header */}
            <header className="border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to={PUBLIC_PATH.HOME}>
                        <img
                            className="w-30 h-15 object-contain"
                            src={logoImg}
                            alt="Logo Air Bnb"
                        />
                    </Link>
                    <span className="text-muted-foreground font-medium">
                        Dashboard
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Admin</span>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => navigate(PUBLIC_PATH.HOME)}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </header>

            {/* Body */}
            <div className="flex flex-1">
                <aside className="w-56 border-r bg-background p-4 flex flex-col gap-1">
                    {adminNav.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

// Admin layout gốc, chứa các layout admin khác
