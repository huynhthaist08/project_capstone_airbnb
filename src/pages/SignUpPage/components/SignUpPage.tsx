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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutaRegister } from "../hooks";
import { signUpSchema } from "../schema";
import type { SignUpFormType } from "../schema";
import { useState } from "react";

const SignUpPage = () => {
    const { mutate, isPending } = useMutaRegister();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            birthday: "",
            gender: undefined,
            confirmPassword: "",
        },
    });

    const onSubmit = (data: SignUpFormType) => {
        const { confirmPassword, ...payload } = data;
        mutate(payload, {
            onSuccess: () => {
                setShowSuccessModal(true);
            }
        });
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 relative">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl uppercase tracking-tight">
                            Đăng ký
                        </CardTitle>
                        <CardDescription>Tạo tài khoản mới</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Họ tên</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Họ tên"
                                    {...register('name')}
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    {...register('email')}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    {...register('password')}
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Nhập lại mật khẩu
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    {...register('confirmPassword')}
                                />
                                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    {...register('phone')}
                                />
                                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                            </div>

                            {/* Birthday */}
                            <div className="space-y-2">
                                <Label htmlFor="birthday">Ngày sinh</Label>
                                <Input
                                    id="birthday"
                                    type="date"
                                    {...register('birthday')}
                                />
                                {errors.birthday && <span className="text-red-500 text-sm">{errors.birthday.message}</span>}
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <Label htmlFor="gender">Giới tính</Label>
                                <select
                                    id="gender"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register('gender', {
                                        setValueAs: (v) => v === 'true'
                                    })}
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                                {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <Button type="submit" className="flex-1" disabled={isPending}>
                                    {isPending ? 'Đang xử lý...' : 'Đăng ký'}
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

                {/* Success Modal - Small popup on form */}
                {showSuccessModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <div className="bg-white rounded-lg shadow-2xl p-8 w-80 text-center pointer-events-auto">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-2xl text-green-600">✓</span>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Tài khoản của bạn đã được tạo.
                            </p>
                            <Link to="/dang-nhap">
                                <Button className="w-full bg-red-500 hover:bg-red-600 text-sm">
                                    Đăng nhập ngay
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;
