import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/core/ui/table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/core/ui/dialog";
import { Label } from "@/core/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import PHONG_THUE from "@/api/phong-thue";
import LOCATION from "@/api/vi-tri";
import type { Room } from "@/types/room.type";
import { getPaginatedData } from "@/utils/apiResponse";

const AdminRoomsPage = () => {
    const [keyword, setKeyword] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState({
        tenPhong: "",
        giaTien: 0,
        khach: 1,
        maViTri: 0,
        hinhAnh: "",
    });
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["admin-rooms", keyword, pageIndex],
        queryFn: () =>
            PHONG_THUE.getPaginated({
                pageIndex,
                pageSize,
                keyword: keyword || undefined,
            }),
    });

    const { data: roomList, totalPage } = getPaginatedData<Room>(data);

    const { data: locationsRes } = useQuery({
        queryKey: ["admin-room-locations"],
        queryFn: () => LOCATION.getAll(),
    });

    const locationOptions = useMemo(
        () =>
            ((locationsRes?.data?.content ?? []) as Location[]).map((loc) => ({
                id: loc.id,
                label: `${loc.tenViTri ?? ""}${
                    loc.tinhThanh ? `, ${loc.tinhThanh}` : ""
                }`,
            })),
        [locationsRes],
    );

    const deleteRoom = useMutation({
        mutationFn: (id: number) => PHONG_THUE.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
        },
    });

    const createRoom = useMutation({
        mutationFn: () =>
            PHONG_THUE.create({
                tenPhong: form.tenPhong.trim(),
                giaTien: Number(form.giaTien) || 0,
                khach: Number(form.khach) || 1,
                maViTri: Number(form.maViTri) || 0,
                hinhAnh: form.hinhAnh.trim() || undefined,
            }),
        onSuccess: () => {
            setIsDialogOpen(false);
            setForm({
                tenPhong: "",
                giaTien: 0,
                khach: 1,
                maViTri: 0,
                hinhAnh: "",
            });
            queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý thông tin phòng</h1>
            </div>

            {/* Search */}
            <div className="flex flex-wrap gap-2">
                <Input
                    placeholder="Nhập tên phòng..."
                    className="max-w-xs"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                    onClick={() =>
                        queryClient.invalidateQueries({
                            queryKey: ["admin-rooms"],
                        })
                    }
                >
                    Tìm
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                    Thêm phòng
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-background overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên phòng</TableHead>
                            <TableHead>Hình ảnh</TableHead>
                            <TableHead>Giá</TableHead>
                            <TableHead>Khách</TableHead>
                            <TableHead className="w-25">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {roomList.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell>{room.id}</TableCell>
                                <TableCell>{room.tenPhong}</TableCell>
                                <TableCell>
                                    {room.hinhAnh && (
                                        <img
                                            src={room.hinhAnh}
                                            alt={room.tenPhong}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>${room.giaTien}</TableCell>
                                <TableCell>{room.khach}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            deleteRoom.mutate(room.id)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPage > 1 && (
                <div className="flex justify-center pt-2">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
                        <button
                            type="button"
                            className="px-2 py-1 text-muted-foreground disabled:opacity-40"
                            disabled={pageIndex === 1}
                            onClick={() =>
                                setPageIndex((p) => Math.max(1, p - 1))
                            }
                        >
                            &lt; Trước
                        </button>
                        {Array.from(
                            { length: Math.min(10, totalPage) },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setPageIndex(page)}
                                className={`px-3 py-1 rounded border ${
                                    pageIndex === page
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:border-muted-foreground"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        {totalPage > 10 && <span className="px-1">...</span>}
                        <button
                            type="button"
                            className="px-2 py-1 text-muted-foreground disabled:opacity-40"
                            disabled={pageIndex === totalPage}
                            onClick={() =>
                                setPageIndex((p) => Math.min(totalPage, p + 1))
                            }
                        >
                            Sau &gt;
                        </button>
                    </div>
                </div>
            )}

            {/* Dialog thêm phòng */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm phòng</DialogTitle>
                    </DialogHeader>
                    <form
                        className="space-y-3 text-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            createRoom.mutate();
                        }}
                    >
                        <div className="space-y-1">
                            <Label>Tên phòng</Label>
                            <Input
                                value={form.tenPhong}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        tenPhong: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Giá / đêm</Label>
                            <Input
                                type="number"
                                value={form.giaTien}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        giaTien: Number(e.target.value) || 0,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Số khách tối đa</Label>
                            <Input
                                type="number"
                                min={1}
                                value={form.khach}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        khach: Number(e.target.value) || 1,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Vị trí</Label>
                            {locationOptions.length > 0 ? (
                                <select
                                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                                    value={form.maViTri || ""}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            maViTri: Number(e.target.value),
                                        }))
                                    }
                                >
                                    <option value="">Chọn vị trí</option>
                                    {locationOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <Input
                                    type="number"
                                    placeholder="Nhập mã vị trí"
                                    value={form.maViTri}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            maViTri:
                                                Number(e.target.value) || 0,
                                        }))
                                    }
                                />
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label>Hình ảnh (URL)</Label>
                            <Input
                                value={form.hinhAnh}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        hinhAnh: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={createRoom.isPending}
                            >
                                Thêm phòng
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminRoomsPage;
