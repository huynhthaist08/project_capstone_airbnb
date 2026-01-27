import { APP_CONFIG } from "@/config";
import { Button } from "@/core/ui/button";
import { PUBLIC_PATH } from "@/routes/path";
import { Link, NavLink } from "react-router-dom";

const navItems = [
    {
        title: "Trang chủ",
        path: PUBLIC_PATH.HOME,
    },
    {
        title: "Nơi lưu trú",
        path: "/noi-luu-tru",
    },
    {
        title: "Trải nghiệm",
        path: "/trai-nghiem",
    },
    {
        title: "Dịch vụ",
        path: "/dich-vu",
    },
];

const Header = () => {
    return (
        <div>
            <header
                className="container mx-auto flex items-center justify-between"
                style={{ height: APP_CONFIG.headerHeight }}
            >
                <Link
                    className="text-2xl font-bold text-primary"
                    to={PUBLIC_PATH.HOME}
                >
                    <img
                        className="w-20 h-10 object-contain mr-2"
                        src="/src/assets/images/logo.png"
                        alt="Logo Air BnB"
                    />
                </Link>
                <nav className="flex items-center gap-15 [&>a]:text-lg [&>a]:p-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primary font-semibold border-b border-primary"
                                    : "hover:text-primary"
                            }
                            to={item.path}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </nav>
                <div>
                    <Button>Đăng ký</Button>
                </div>
            </header>
        </div>
    );
};

export default Header;
