// Hiển thị UI form login
// AdminSignInPage: trang đăng nhập riêng cho admin — reuse UI pattern từ SignInPage
// UI: Dark theme (darker, more professional)

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
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminSignInForm } from "../hooks";
import { signInSchema, type SignInFormType } from "@/pages/SignInPage/schema";

const AdminSignInPage = () => {
    const { mutate, isPending } = useAdminSignInForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormType>({
        resolver: zodResolver(signInSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: SignInFormType) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-950 to-slate-900">
            <div className="w-full max-w-md">
                <Card className="border-slate-700 bg-slate-900">
                    <CardHeader>
                        <CardTitle className="text-2xl uppercase tracking-tight text-white">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Đăng nhập tài khoản quản trị viên
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* Email */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-slate-300"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">
                                        {errors.email?.message}
                                    </span>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-slate-300"
                                >
                                    Mật khẩu
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Nhập mật khẩu"
                                        className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                                        {...register("password")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-200"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="w-4 h-4" />
                                        ) : (
                                            <FaEye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password?.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    "Đang xử lý..."
                                ) : (
                                    <>
                                        Đăng nhập Admin
                                        <FaArrowRightLong className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center mt-6 text-slate-500 text-sm">
                    <p>Chỉ dành cho quản trị viên</p>
                    <p className="mt-2 text-xs text-slate-600">
                        Nếu bạn không phải admin, vui lòng{" "}
                        <strong>không tiếp tục</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignInPage;
