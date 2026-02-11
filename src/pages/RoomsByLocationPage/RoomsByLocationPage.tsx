import { useParams, Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PHONG_THUE from "@/api/phong-thue";
import LOCATION from "@/api/locations";
import { Card, CardContent } from "@/core/ui/card";
import { getAny, getContent, getContentArray } from "@/utils/apiResponse";
import { roomDetailPath } from "@/routes/path";
import type { Room } from "@/@types/room.type";

const RoomsByLocationPage = () => {
    const { maViTri } = useParams<{ maViTri: string }>();
    const [searchParams] = useSearchParams();
    const maViTriNum = Number(maViTri);

    const ngayDen = searchParams.get("ngayDen") ?? "";
    const ngayDi = searchParams.get("ngayDi") ?? "";
    const soKhach = searchParams.get("soKhach");

    const { data: locationRes } = useQuery({
        queryKey: ["vi-tri", maViTriNum],
        queryFn: () => LOCATION.getById(maViTriNum),
        enabled: !!maViTri && !Number.isNaN(maViTriNum),
    });

    const { data: roomsRes, isLoading } = useQuery({
        queryKey: ["phong-theo-vi-tri", maViTriNum],
        queryFn: () => PHONG_THUE.getByLocation({ maViTri: maViTriNum }),
        enabled: !!maViTri && !Number.isNaN(maViTriNum),
    });

    const location = getContent<{ tenViTri?: string }>(locationRes);
    const roomList = getContentArray<Room>(roomsRes);
    const locationName = location?.tenViTri ?? "Khu vực";

    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-2">
                Chỗ ở tại {locationName}
            </h1>

            <p className="text-muted-foreground mb-2">
                {roomList.length} chỗ ở
            </p>

            {(ngayDen || ngayDi || soKhach) && (
                <p className="text-xs text-muted-foreground mb-6">
                    {ngayDen && (
                        <>
                            Nhận phòng:{" "}
                            <span className="font-medium">{ngayDen}</span>{" "}
                            ·{" "}
                        </>
                    )}
                    {ngayDi && (
                        <>
                            Trả phòng:{" "}
                            <span className="font-medium">{ngayDi}</span> ·{" "}
                        </>
                    )}
                    {soKhach && (
                        <>
                            Số khách:{" "}
                            <span className="font-medium">{soKhach}</span>
                        </>
                    )}
                </p>
            )}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="overflow-hidden">
                            <div className="h-48 bg-muted animate-pulse" />
                            <CardContent className="p-4">
                                <div className="h-4 bg-muted rounded w-3/4 mb-2 animate-pulse" />
                                <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : roomList.length === 0 ? (
                <p className="text-muted-foreground">
                    Chưa có chỗ ở nào trong khu vực này.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roomList.map((room) => {
                        const r = room as Record<string, unknown>;

                        const tenPhong = getAny(r, "tenPhong", "ten_phong") as
                            | string
                            | undefined;

                        const hinhAnh = getAny(r, "hinhAnh", "hinh_anh") as
                            | string
                            | undefined;

                        const giaTien =
                            (getAny(r, "giaTien", "gia_tien") as
                                | number
                                | undefined) ?? 0;

                        const khach =
                            (getAny(r, "khach") as number | undefined) ?? 0;

                        const phongNgu =
                            (getAny(r, "phongNgu", "phong_ngu") as
                                | number
                                | undefined) ?? 0;

                        const giuong =
                            (getAny(r, "giuong") as number | undefined) ?? 0;

                        const phongTam =
                            (getAny(r, "phongTam", "phong_tam") as
                                | number
                                | undefined) ?? 0;

                        const wifi = getAny(r, "wifi");
                        const bep = getAny(r, "bep");
                        const dieuHoa = getAny(r, "dieuHoa");
                        const mayGiat = getAny(r, "mayGiat");
                        const tivi = getAny(r, "tivi");
                        const hoBoi = getAny(r, "hoBoi");

                        const tienNghi = [
                            wifi ? "Wifi" : null,
                            bep ? "Bếp" : null,
                            dieuHoa ? "Điều hòa nhiệt độ" : null,
                            mayGiat ? "Máy giặt" : null,
                            tivi ? "TV" : null,
                            hoBoi ? "Hồ bơi" : null,
                        ]
                            .filter(Boolean)
                            .slice(0, 4);

                        return (
                            <Link key={room.id} to={roomDetailPath(room.id)}>
                                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="aspect-4/3 bg-muted overflow-hidden">
                                        {hinhAnh ? (
                                            <img
                                                src={hinhAnh}
                                                alt={tenPhong ?? ""}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                Ảnh
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-semibold line-clamp-1">
                                            {tenPhong ?? "Chỗ ở"}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {khach} khách · {phongNgu} phòng ngủ
                                            · {giuong} giường · {phongTam} phòng
                                            tắm
                                        </p>

                                        {tienNghi.length > 0 && (
                                            <p className="text-sm text-muted-foreground">
                                                {tienNghi.join(" · ")}
                                            </p>
                                        )}

                                        <p className="font-semibold text-primary mt-2">
                                            ${giaTien}/đêm
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RoomsByLocationPage;
