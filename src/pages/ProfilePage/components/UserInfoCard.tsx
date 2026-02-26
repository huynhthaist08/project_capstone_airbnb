import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../schema";
import type { UpdateProfileFormType } from "../schema";
import type { UserProfile } from "../servers/profile.type";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";

interface Props {
  profile: UserProfile;
  onUpdate: (data: UpdateProfileFormType) => Promise<any>;
}

export const UserInfoCard = ({ profile, onUpdate }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        Loading user information...
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? null,
      birthday: profile.birthday ?? "",
      gender: profile.gender,
    },
  });

  const onSubmit = async (data: UpdateProfileFormType) => {
    await onUpdate(data);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      {/* Avatar Section */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
          {profile.avatar ? (
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-4xl font-bold text-white">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center border-b pb-6 mb-6">
        <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{profile.email}</p>
        
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full rounded-lg"
        >
          Chỉnh sửa hồ sơ
        </Button>
      </div>

      

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Chỉnh sửa hồ sơ</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Họ tên</Label>
                  <Input {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input {...register("phone")} />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Ngày sinh</Label>
                  <Input 
                    type="date" 
                    {...register("birthday")} 
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    {...register("gender", {
                      setValueAs: (v: string) => v === "true",
                    })}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Hủy
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
