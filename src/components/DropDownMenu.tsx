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
import { Link } from "react-router-dom";

const DropDownMenu = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                        <FaBars />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropDownMenu;
