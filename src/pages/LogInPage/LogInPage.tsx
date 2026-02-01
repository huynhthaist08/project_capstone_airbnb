import { Button } from "@/core/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/core/ui/card";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import { PUBLIC_PATH } from "@/routes/path";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LogInPage = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl uppercase tracking-tight">
                                Đăng nhập
                            </CardTitle>
                            <CardDescription>
                                Nhập tài khoản và mật khẩu để đăng nhập
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-4">
                                {/* Tài khoản */}
                                <div className="space-y-2">
                                    <Label htmlFor="taiKhoan">Tài khoản</Label>
                                    <Input
                                        id="taiKhoan"
                                        type="text"
                                        placeholder="Tài khoản"
                                        autoComplete="username"
                                    ></Input>
                                </div>

                                {/* Mật khẩu */}
                                <div className="space-y-2">
                                    <Label htmlFor="matKhau">Mật khẩu</Label>
                                    <Input
                                        id="matKhau"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        autoComplete="current-password"
                                    ></Input>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                    <Button type="submit" className="flex-1">
                                        Đăng nhập
                                    </Button>

                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        asChild
                                        className="flex-1"
                                    >
                                        <Link to={PUBLIC_PATH.SIGN_UP}>
                                            Đăng ký <FaArrowRightLong />
                                        </Link>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
