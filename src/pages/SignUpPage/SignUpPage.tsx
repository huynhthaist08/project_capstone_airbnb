import { Link } from "react-router-dom";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/core/ui/card";
import { PUBLIC_PATH } from "@/routes/path";
import { FaArrowRightLong } from "react-icons/fa6";

const SignUpPage = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl uppercase tracking-tight">
                            Đăng ký
                        </CardTitle>
                        <CardDescription>Tạo tài khoản mới</CardDescription>
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
                                />
                            </div>

                            {/* Mật khẩu */}
                            <div className="space-y-2">
                                <Label htmlFor="matKhau">Mật khẩu</Label>
                                <Input
                                    id="matKhau"
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </div>

                            {/* Nhập lại mật khẩu */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Nhập lại mật khẩu
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                />
                            </div>

                            {/* Họ tên */}
                            <div className="space-y-2">
                                <Label htmlFor="hoTen">Họ tên</Label>
                                <Input
                                    id="hoTen"
                                    type="text"
                                    placeholder="Họ tên"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>

                            {/* Số điện thoại */}
                            <div className="space-y-2">
                                <Label htmlFor="soDt">Số điện thoại</Label>
                                <Input
                                    id="soDt"
                                    type="tel"
                                    placeholder="Số điện thoại"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <Button type="submit" className="flex-1">
                                    Đăng ký
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    className="flex-1"
                                >
                                    <Link to={PUBLIC_PATH.LOG_IN}>
                                        Đăng nhập <FaArrowRightLong />
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignUpPage;
