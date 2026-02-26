/**
 * AdminLayout: layout cho khu vực admin — header (logo, nút Đăng xuất), sidebar nav (Quản lý người dùng, vị trí, phòng, đặt phòng), Outlet cho nội dung từng trang admin.
 */
import logoImg from "@/assets/images/logo.png";
import { Button } from "@/core/ui/button";
import { PRIVATE_PATH, PUBLIC_PATH } from "@/routes/path";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
    const { logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-(--color-bg-header)">
            {/* Header */}
            <header className="border-b px-4 py-3 flex items-center justify-between gap-3">
                <Link to={PUBLIC_PATH.HOME} className="flex items-center gap-2">
                    <img
                        className="w-24 h-10 object-contain"
                        src={logoImg}
                        alt="Logo Air Bnb"
                    />
                    <span className="text-muted-foreground font-medium">
                        Dashboard
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="hidden text-sm text-muted-foreground sm:inline">
                        Admin
                    </span>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => {
                            logout();
                            navigate(PUBLIC_PATH.HOME);
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </header>

            {/* Body: mobile/tablet xếp dọc (sidebar trên, bảng full width); desktop xếp ngang (sidebar trái) */}
            <div className="flex flex-1 flex-col lg:flex-row">
                <aside className="border-b bg-background p-3 flex flex-wrap gap-2 lg:h-auto lg:w-60 lg:flex-col lg:border-b-0 lg:border-r lg:p-4">
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
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
