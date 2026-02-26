/**
 * Header: thanh điều hướng trên cùng — logo, nav (Nơi lưu trú, Trải nghiệm, Dịch vụ), link "Trở thành chủ nhà", dropdown đăng nhập/đăng ký.
 */
import { PUBLIC_PATH } from "@/routes/path";
import { Link, NavLink } from "react-router-dom";
import { FaHouse, FaParachuteBox, FaPersonRays, FaBars } from "react-icons/fa6";
import logoImg from "@/assets/images/logo.png";
import DropDownMenu from "./DropDownMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

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
    const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false);

    return (
        <div className="shadow bg-(--color-bg-header) text-black">
            <header
                className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
                <div className="flex items-center justify-between gap-3">
                    <Link
                        className="text-2xl font-bold text-[#ff385c]"
                        to={PUBLIC_PATH.HOME}
                    >
                        <img
                            className="w-30 h-15 object-contain mr-2"
                            src={logoImg}
                            alt="Logo Air Bnb"
                        />
                    </Link>

                    {/* Mobile actions toggle (ẩn trong sidebar) */}
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border bg-white text-black shadow-sm sm:hidden"
                        onClick={() =>
                            setIsMobileActionsOpen((open) => !open)
                        }
                        aria-label="Mở menu tài khoản"
                    >
                        <FaBars className="h-4 w-4" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 [&>a]:px-2 [&>a]:py-1 sm:[&>a]:text-md">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-[#ff385c] font-semibold border-b border-[#ff385c]"
                                    : "hover:text-[#ff385c]"
                            }
                            to={item.path}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions desktop */}
                <div className="hidden items-center justify-end gap-2 sm:flex sm:gap-3">
                    <a
                        href="https://www.airbnb.com.vn/host/homes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-[#ff385c] px-3 py-2 rounded-full transition"
                    >
                        Trở thành chủ nhà
                    </a>

                    {/* Theme toggle + Dropdown menu */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <DropDownMenu />
                    </div>
                </div>
            </header>

            
            {isMobileActionsOpen && (
                <div className="fixed inset-0 z-40 flex sm:hidden">
                    <div className="w-64 bg-white shadow-xl p-4 flex flex-col gap-4">
                        <a
                            href="https://www.airbnb.com.vn/host/homes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-[#ff385c] px-3 py-2 rounded-full transition text-left"
                            onClick={() => setIsMobileActionsOpen(false)}
                        >
                            Trở thành chủ nhà
                        </a>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <DropDownMenu />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex-1 bg-black/40"
                        onClick={() => setIsMobileActionsOpen(false)}
                        aria-label="Đóng menu"
                    />
                </div>
            )}
        </div>
    );
};

export default Header;
