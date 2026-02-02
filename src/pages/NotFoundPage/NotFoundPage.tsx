import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/core/ui/button";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            <h1 className="text-8xl font-extrabold text-primary">404</h1>

            <h2 className="mt-4 text-2xl font-semibold">Trang không tồn tại</h2>

            <p className="mt-2 max-w-md text-muted-foreground">
                Trang bạn đang tìm có thể đã bị xóa, đổi đường dẫn hoặc hiện
                không khả dụng.
            </p>

            <div className="mt-8 flex gap-4">
                <Button onClick={() => navigate(-1)} variant="outline">
                    Quay lại
                </Button>

                <Button asChild>
                    <Link to="/">Về trang chủ</Link>
                </Button>
            </div>
        </div>
    );
}
