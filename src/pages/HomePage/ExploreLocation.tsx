import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "@/core/ui/card";
import { Button } from "@/core/ui/button";
import { roomsByLocationPath } from "@/routes/path";
import LOCATION from "@/api/locations";
import { getPaginatedData } from "@/utils/apiResponse";

type LocationItem = {
    id: number;
    tenViTri?: string;
    hinhAnh?: string;
    tinhThanh?: string;
    tenQuocGia?: string;
};

const ExploreLocation = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["vi-tri-phan-trang", page],
        queryFn: () =>
            LOCATION.getPaginated({
                pageIndex: page,
                pageSize: 8,
            }),
    });

    const { data: list, totalPage } = getPaginatedData<LocationItem>(data);

    return (
        <section className="py-10">
            <h2 className="text-xl font-semibold mb-4">
                Khám phá những điểm đến gần đây
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Skeleton UI khi loading */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-20 rounded-xl bg-muted animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {list.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() =>
                                    navigate(roomsByLocationPath(item.id))
                                }
                                className="cursor-pointer overflow-hidden rounded-xl hover:shadow-md transition-shadow py-0"
                            >
                                <div className="flex h-20">
                                    <div className="w-20 shrink-0 bg-muted overflow-hidden">
                                        {item.hinhAnh ? (
                                            <img
                                                src={item.hinhAnh}
                                                alt={item.tenViTri ?? ""}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                                {item.hinhAnh}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center px-3 min-w-0">
                                        <h3 className="text-sm font-medium leading-tight line-clamp-1">
                                            {item.tenViTri ?? "Điểm đến"}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                            {item.tenQuocGia ??
                                                item.tinhThanh ??
                                                ""}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Phân trang */}
                    {totalPage > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page <= 1}
                                onClick={() =>
                                    setPage((p) => Math.max(1, p - 1))
                                }
                            >
                                〈
                            </Button>

                            {Array.from(
                                { length: totalPage },
                                (_, i) => i + 1,
                            ).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded-full text-sm font-medium ${
                                        p === page
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}

                            <Button
                                variant="outline"
                                size="icon"
                                disabled={page >= totalPage}
                                onClick={() =>
                                    setPage((p) => Math.min(totalPage, p + 1))
                                }
                            >
                                〉
                            </Button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default ExploreLocation;

//  - Component ExploreLocation dùng để hiển thị danh sách vị trí (location) theo dạng lưới, có phân trang.
//  - Dữ liệu được fetch bằng React Query (useQuery) với queryKey phụ thuộc vào `page`, giúp tự động refetch và cache dữ liệu theo từng trang.
//  - Khi đang loading, component hiển thị Skeleton UI để cải thiện trải nghiệm người dùng.
//  - Mỗi location được render dưới dạng Card, có thể click để điều hướng sang trang danh sách phòng theo vị trí tương ứng.
//  - Toán tử `? :` được dùng để rẽ nhánh render ảnh hoặc placeholder khi không có hình ảnh.
//  - Toán tử `??` được dùng để fallback giá trị an toàn khi dữ liệu từ API bị null/undefined.
//  - Phân trang được xử lý phía client bằng state `page`, kết hợp với API phân trang từ backend.
