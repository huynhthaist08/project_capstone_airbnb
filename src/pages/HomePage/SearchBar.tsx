import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="max-w-4xl mx-auto mb-8">
            <form className="flex flex-col items-center sm:flex-row gap-2 p-6 rounded-full border bg-background shadow-lg">
                {/* Location */}
                <div className="flex-1">
                    <Input
                        placeholder="Địa điểm"
                        className="border-0 shadow-none focus-visible:ring-0"
                    />
                </div>

                <Input
                    placeholder="Nhận phòng"
                    className="border-0 sm:w-36 focus-visible:ring-0"
                />

                {/* Check out */}
                <Input
                    placeholder="Trả phòng"
                    className="border-0 sm:w-36 focus-visible:ring-0"
                />

                {/* Khách */}
                <Input
                    placeholder="Trả phòng"
                    className="border-0 sm:w-24 focus-visible:ring-0"
                />

                {/* Button */}
                <Button
                    type="button"
                    size={"icon"}
                    className="rounded-full bg-primary shrink-0"
                >
                    <Search className="size-5" />
                </Button>
            </form>
        </div>
    );
};

export default SearchBar;
