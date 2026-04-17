// SignInPage: trang đăng nhập — form email + mật khẩu (react-hook-form + zod), gọi useSignInForm (API signin + Redux setCredentials), link sang đăng ký.

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
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInForm } from "../hooks";
import { signInSchema, type SignInFormType } from "../schema";

const SignInPage = () => {
    const { mutate, isPending } = useSignInForm();
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
                            <form
                                className="space-y-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
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
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Mật khẩu"
                                            className="pr-10"
                                            {...register("password")}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
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
                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={isPending}
                                    >
                                        {isPending
                                            ? "Đang đăng nhập..."
                                            : "Đăng nhập"}
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

export default SignInPage;
