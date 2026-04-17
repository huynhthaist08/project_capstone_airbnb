import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/core/ui/dialog";
import { Label } from "@/core/ui/label";
import type { Room, RoomFormData } from "../server";

interface RoomDialogProps {
    isOpen: boolean;
    editingRoom: Room | null;
    form: RoomFormData;
    onFormChange: (form: RoomFormData) => void;
    onClose: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    locationOptions: Array<{ id: number; label: string }>;
}

export const RoomDialog = ({
    isOpen,
    editingRoom,
    form,
    onFormChange,
    onClose,
    onSubmit,
    isLoading,
    locationOptions,
}: RoomDialogProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    const handleCheckboxChange = (field: keyof RoomFormData) => {
        onFormChange({
            ...form,
            [field]: !form[field],
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {editingRoom ? "Sửa phòng" : "Thêm phòng"}
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
                    {/* Tên phòng */}
                    <div className="space-y-1">
                        <Label>Tên phòng</Label>
                        <Input
                            value={form.tenPhong}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    tenPhong: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Giá / đêm */}
                    <div className="space-y-1">
                        <Label>Giá / đêm</Label>
                        <Input
                            type="number"
                            value={form.giaTien}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    giaTien: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </div>

                    {/* Số khách tối đa */}
                    <div className="space-y-1">
                        <Label>Số khách tối đa</Label>
                        <Input
                            type="number"
                            min={1}
                            value={form.khach}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    khach: Number(e.target.value) || 1,
                                })
                            }
                        />
                    </div>

                    {/* Số phòng ngủ */}
                    <div className="space-y-1">
                        <Label>Số phòng ngủ</Label>
                        <Input
                            type="number"
                            min={0}
                            value={form.phongNgu}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    phongNgu: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </div>

                    {/* Số giường */}
                    <div className="space-y-1">
                        <Label>Số giường</Label>
                        <Input
                            type="number"
                            min={0}
                            value={form.giuong}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    giuong: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </div>

                    {/* Số phòng tắm */}
                    <div className="space-y-1">
                        <Label>Số phòng tắm</Label>
                        <Input
                            type="number"
                            min={0}
                            value={form.phongTam}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    phongTam: Number(e.target.value) || 0,
                                })
                            }
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="space-y-1">
                        <Label>Mô tả</Label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                            rows={3}
                            value={form.moTa}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    moTa: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Vị trí */}
                    <div className="space-y-1">
                        <Label>Vị trí</Label>
                        {locationOptions.length > 0 ? (
                            <select
                                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                                value={form.maViTri || ""}
                                onChange={(e) =>
                                    onFormChange({
                                        ...form,
                                        maViTri: Number(e.target.value),
                                    })
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
                                    onFormChange({
                                        ...form,
                                        maViTri: Number(e.target.value) || 0,
                                    })
                                }
                            />
                        )}
                    </div>

                    {/* Hình ảnh (URL) */}
                    <div className="space-y-1">
                        <Label>Hình ảnh (URL)</Label>
                        <Input
                            value={form.hinhAnh}
                            onChange={(e) =>
                                onFormChange({
                                    ...form,
                                    hinhAnh: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Hình ảnh (upload) */}
                    {editingRoom && (
                        <div className="space-y-1">
                            <Label>Hình ảnh (upload mới)</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={() => {}}
                            />
                        </div>
                    )}

                    {/* Tiện nghi - Checkboxes */}
                    <div className="border-t pt-3">
                        <Label className="font-semibold">Tiện nghi</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="mayGiat"
                                    checked={form.mayGiat}
                                    onChange={() =>
                                        handleCheckboxChange("mayGiat")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="mayGiat" className="text-sm">
                                    Máy giặt
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="banLa"
                                    checked={form.banLa}
                                    onChange={() =>
                                        handleCheckboxChange("banLa")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="banLa" className="text-sm">
                                    Bàn là
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="tivi"
                                    checked={form.tivi}
                                    onChange={() =>
                                        handleCheckboxChange("tivi")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="tivi" className="text-sm">
                                    TV
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="dieuHoa"
                                    checked={form.dieuHoa}
                                    onChange={() =>
                                        handleCheckboxChange("dieuHoa")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="dieuHoa" className="text-sm">
                                    Điều hòa
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="wifi"
                                    checked={form.wifi}
                                    onChange={() =>
                                        handleCheckboxChange("wifi")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="wifi" className="text-sm">
                                    WiFi
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="bep"
                                    checked={form.bep}
                                    onChange={() => handleCheckboxChange("bep")}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="bep" className="text-sm">
                                    Bếp
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="doXe"
                                    checked={form.doXe}
                                    onChange={() =>
                                        handleCheckboxChange("doXe")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="doXe" className="text-sm">
                                    Đỗ xe
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="hoBoi"
                                    checked={form.hoBoi}
                                    onChange={() =>
                                        handleCheckboxChange("hoBoi")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="hoBoi" className="text-sm">
                                    Hồ bơi
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="banUi"
                                    checked={form.banUi}
                                    onChange={() =>
                                        handleCheckboxChange("banUi")
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="banUi" className="text-sm">
                                    Bàn uống
                                </label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {editingRoom ? "Lưu thay đổi" : "Thêm phòng"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
