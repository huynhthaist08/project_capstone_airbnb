import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import type { Dispatch, SetStateAction } from "react";

type UsersSearchBarProps = {
    keyword: string;
    setKeyword: Dispatch<SetStateAction<string>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const UsersSearchBar = ({
    keyword,
    setKeyword,
    setIsDialogOpen,
}: UsersSearchBarProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            <Input
                placeholder="Nhập tài khoản hoặc họ tên..."
                className="max-w-xs"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                Thêm quản trị viên
            </Button>
        </div>
    );
};
