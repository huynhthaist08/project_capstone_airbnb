import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Search } from "lucide-react";

import { roomsByLocationPath } from "@/routes/path";
import LOCATION from "@/api/locations";
import type { Location } from "@/@types/location.type";

const SearchBar = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [ngayDen, setNgayDen] = useState("");
    const [ngayDi, setNgayDi] = useState("");
    const [soKhach, setSoKhach] = useState(1);

    const { data } = useQuery({
        queryKey: ["vi-tri-list"],
        queryFn: () => LOCATION.getAll(),
    });

    const locationList: Location[] = data?.data.content ?? [];

    const filtered = keyword.trim()
        ? locationList.filter((loc) => {
              const q = keyword.toLowerCase();
              return (
                  loc.tenViTri.toLowerCase().includes(q) ||
                  loc.tinhThanh.toLowerCase().includes(q)
              );
          })
        : locationList.slice(0, 10);

    const handleSelect = (loc: Location) => {
        setSelectedId(loc.id);
        setKeyword(`${loc.tenViTri}, ${loc.tinhThanh}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const maViTri = selectedId ?? filtered[0]?.id;
        if (!maViTri) return;

        const params = new URLSearchParams();
        if (ngayDen) params.set("ngayDen", ngayDen);
        if (ngayDi) params.set("ngayDi", ngayDi);
        if (soKhach) params.set("soKhach", String(soKhach));

        const base = roomsByLocationPath(maViTri);
        const url = params.toString() ? `${base}?${params.toString()}` : base;

        navigate(url);
    };

    return (
        <div className="max-w-4xl mx-auto mb-6">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 p-6 rounded-full border bg-background shadow-lg"
            >
                {/* Location */}
                <div className="flex-1">
                    <Input
                        placeholder="Địa điểm"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setSelectedId(null);
                        }}
                        autoComplete="off"
                        className="border-0 shadow-none focus-visible:ring-0 h-12"
                    />

                    {/* Dropdown */}
                    {keyword && filtered.length > 0 && (
                        <ul className="absolute left-0 right-0 top-full mt-2 bg-background border rounded-2xl shadow-xl max-h-60 overflow-auto z-50">
                            {filtered.map((loc) => (
                                <li
                                    key={loc.id}
                                    onClick={() => handleSelect(loc)}
                                    className="px-4 py-3 text-sm cursor-pointer hover:bg-muted transition"
                                >
                                    {loc.tenViTri}, {loc.tinhThanh}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Check in */}
                <Input
                    type="date"
                    value={ngayDen}
                    onChange={(e) => setNgayDen(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 h-12 sm:w-40"
                />

                {/* Check out */}
                <Input
                    type="date"
                    value={ngayDi}
                    onChange={(e) => setNgayDi(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 h-12 sm:w-40"
                />

                {/* Guests */}
                <Input
                    type="number"
                    min={1}
                    value={soKhach}
                    onChange={(e) =>
                        setSoKhach(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="border-0 shadow-none focus-visible:ring-0 h-12 sm:w-24"
                />

                {/* Button */}
                <Button
                    type="submit"
                    size="icon"
                    className="rounded-full bg-primary h-12 w-12 shrink-0 cursor-pointer"
                >
                    <Search className="size-5" />
                </Button>
            </form>
        </div>
    );
};

export default SearchBar;
