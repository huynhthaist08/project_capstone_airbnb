import { APP_CONFIG } from "@/config";
import { PUBLIC_PATH } from "@/routes/path";
import { Link, NavLink } from "react-router-dom";
import { FaHouse, FaParachuteBox, FaPersonRays } from "react-icons/fa6";
import logoImg from "@/assets/images/logo.png";
import DropDownMenu from "./DropDownMenu";

const navItems = [
    {
        title: (
            <div className="flex items-center gap-2">
                <FaHouse />
                Nơi lưu trú
            </div>
        ),
        path: PUBLIC_PATH.HOME,
    },
    {
        title: (
            <div className="flex items-center gap-2">
                <FaParachuteBox />
                Trải nghiệm
            </div>
        ),
        path: "/trai-nghiem",
    },
    {
        title: (
            <div className="flex items-center gap-2">
                <FaPersonRays />
                Dịch vụ
            </div>
        ),
        path: "/dich-vu",
    },
];

const Header = () => {
    return (
        <div className="shadow bg-(--color-bg-header)">
            <header
                className="container mx-auto flex items-center justify-between"
                style={{ height: APP_CONFIG.headerHeight }}
            >
                <Link
                    className="text-2xl font-bold text-primary"
                    to={PUBLIC_PATH.HOME}
                >
                    <img
                        className="w-30 h-15 object-contain mr-2"
                        src={logoImg}
                        alt="Logo Air Bnb"
                    />
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-4 [&>a]:text-md [&>a]:p-2">
                    <a
                        href="https://www.airbnb.com.vn/host/homes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary"
                    >
                        Trở thành chủ nhà
                    </a>

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

                {/* Dropdown menu */}
                <DropDownMenu />
            </header>
        </div>
    );
};

export default Header;
