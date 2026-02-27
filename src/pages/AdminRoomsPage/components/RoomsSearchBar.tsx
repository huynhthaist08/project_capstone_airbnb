import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";

interface RoomsSearchBarProps {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
    onSearch: () => void;
    onAddNew: () => void;
}

export const RoomsSearchBar = ({
    keyword,
    onKeywordChange,
    onSearch,
    onAddNew,
}: RoomsSearchBarProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Input
                placeholder="Nhập tên phòng..."
                className="w-64"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
            />
            <Button onClick={onSearch}>Tìm</Button>
            <Button variant="outline" onClick={onAddNew}>
                Thêm phòng
            </Button>
        </div>
    );
};
