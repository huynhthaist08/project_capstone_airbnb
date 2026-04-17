// AdminLocationsPage: trang admin quản lý vị trí — bảng phân trang + tìm kiếm, thêm/sửa/xóa vị trí qua dialog; gọi API vi-tri (LOCATION).

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
import { useState } from "react";
import LOCATION from "@/api/vi-tri";
import type { Location } from "@/types/location.type";
import { getPaginatedData } from "@/utils/apiResponse";

const AdminLocationsPage = () => {
    const [keyword, setKeyword] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // [ADMIN] Trạng thái form dùng chung cho thêm/sửa vị trí
    const [editingLocation, setEditingLocation] = useState<Location | null>(
        null,
    );
    const [form, setForm] = useState({
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: "",
    });
    // [ADMIN] File hình khi sửa (upload chung trong form Sửa)
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["admin-locations", keyword, pageIndex],
        queryFn: () =>
            LOCATION.getPaginated({
                pageIndex,
                pageSize,
                keyword: keyword || undefined,
            }),
    });

    const { data: locationList, totalPage } = getPaginatedData<Location>(data);

    const deleteLocation = useMutation({
        mutationFn: (id: number) => LOCATION.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
        },
    });

    const createLocation = useMutation({
        mutationFn: () =>
            LOCATION.create({
                tenViTri: form.tenViTri.trim(),
                tinhThanh: form.tinhThanh.trim(),
                quocGia: form.quocGia.trim(),
                hinhAnh: form.hinhAnh.trim() || undefined,
            }),
        onSuccess: () => {
            setIsDialogOpen(false);
            setForm({
                tenViTri: "",
                tinhThanh: "",
                quocGia: "",
                hinhAnh: "",
            });
            queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
        },
    });

    const updateLocation = useMutation({
        mutationFn: (payload: { id: number; data: Partial<Location> }) =>
            LOCATION.update(payload.id, payload.data),
        onSuccess: () => {
            setIsDialogOpen(false);
            setEditingLocation(null);
            setForm({
                tenViTri: "",
                tinhThanh: "",
                quocGia: "",
                hinhAnh: "",
            });
            queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
        },
    });

    const uploadLocationImage = useMutation({
        mutationFn: (payload: { id: number; file: File }) =>
            LOCATION.uploadImage(payload.id, payload.file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Quản lý thông tin vị trí</h1>
            </div>

            {/* Search */}
            <div className="flex flex-wrap gap-2">
                <Input
                    placeholder="Tìm kiếm vị trí..."
                    className="max-w-xs"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                    onClick={() =>
                        queryClient.invalidateQueries({
                            queryKey: ["admin-locations"],
                        })
                    }
                >
                    Tìm
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                    Thêm vị trí
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-background overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên vị trí</TableHead>
                            <TableHead>Tỉnh thành</TableHead>
                            <TableHead>Quốc gia</TableHead>
                            <TableHead>Hình ảnh</TableHead>
                            <TableHead className="w-25">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {locationList.map((loc) => (
                            <TableRow key={loc.id}>
                                <TableCell>{loc.id}</TableCell>
                                <TableCell>{loc.tenViTri}</TableCell>
                                <TableCell>{loc.tinhThanh}</TableCell>
                                <TableCell>{loc.quocGia}</TableCell>
                                <TableCell>
                                    {loc.hinhAnh && (
                                        <img
                                            src={loc.hinhAnh}
                                            alt={loc.tenViTri}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setEditingLocation(loc);
                                            setForm({
                                                tenViTri: loc.tenViTri ?? "",
                                                tinhThanh: loc.tinhThanh ?? "",
                                                quocGia: loc.quocGia ?? "",
                                                hinhAnh: loc.hinhAnh ?? "",
                                            });
                                            setEditImageFile(null);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            deleteLocation.mutate(loc.id)
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
            {/* Dialog thêm vị trí */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingLocation ? "Sửa vị trí" : "Thêm vị trí"}
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        className="space-y-3 text-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editingLocation) {
                                updateLocation.mutate(
                                    {
                                        id: editingLocation.id,
                                        data: {
                                            tenViTri: form.tenViTri.trim(),
                                            tinhThanh: form.tinhThanh.trim(),
                                            quocGia: form.quocGia.trim(),
                                            hinhAnh:
                                                form.hinhAnh.trim() ||
                                                undefined,
                                        },
                                    },
                                    {
                                        onSuccess: () => {
                                            if (editImageFile) {
                                                uploadLocationImage.mutate({
                                                    id: editingLocation.id,
                                                    file: editImageFile,
                                                });
                                                setEditImageFile(null);
                                            }
                                        },
                                    },
                                );
                            } else {
                                createLocation.mutate();
                            }
                        }}
                    >
                        <div className="space-y-1">
                            <Label>Tên vị trí</Label>
                            <Input
                                value={form.tenViTri}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        tenViTri: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Tỉnh thành</Label>
                            <Input
                                value={form.tinhThanh}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        tinhThanh: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Quốc gia</Label>
                            <Input
                                value={form.quocGia}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        quocGia: e.target.value,
                                    }))
                                }
                            />
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
                        {editingLocation && (
                            <div className="space-y-1">
                                <Label>Hình ảnh (upload mới)</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] ?? null;
                                        setEditImageFile(file);
                                    }}
                                />
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    setEditingLocation(null);
                                    setEditImageFile(null);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    createLocation.isPending ||
                                    updateLocation.isPending ||
                                    uploadLocationImage.isPending
                                }
                            >
                                {editingLocation
                                    ? "Lưu thay đổi"
                                    : "Thêm vị trí"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminLocationsPage;
