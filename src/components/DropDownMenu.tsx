import { Button } from "@/core/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/core/ui/dropdown-menu";
import { PUBLIC_PATH } from "@/routes/path";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth.slice";
import type { RootState } from "@/store";

const DropDownMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate(PUBLIC_PATH.HOME);
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                        <FaBars />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {isAuthenticated && user ? (
                        <>
                            {/* User info */}
                            <div className="px-2 py-1.5 text-sm font-semibold">
                                Hi, {user.name}
                            </div>
                            <DropdownMenuSeparator />
                            {/* Menu items */}
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <a
                                        href="https://www.airbnb.com.vn/help"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Trung tâm hỗ trợ
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            {/* Logout */}
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={handleLogout}>
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </>
                    ) : (
                        <>
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <a
                                        href="https://www.airbnb.com.vn/help"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Trung tâm hỗ trợ
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to={PUBLIC_PATH.SIGN_UP}>
                                        Đăng nhập hoặc Đăng ký
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropDownMenu;
