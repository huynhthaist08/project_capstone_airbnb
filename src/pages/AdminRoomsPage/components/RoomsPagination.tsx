interface RoomsPaginationProps {
    pageIndex: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

export const RoomsPagination = ({
    pageIndex,
    totalPage,
    onPageChange,
}: RoomsPaginationProps) => {
    if (totalPage <= 1) return null;

    return (
        <div className="flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
                <button
                    type="button"
                    className="px-2 py-1 text-muted-foreground disabled:opacity-40"
                    disabled={pageIndex === 1}
                    onClick={() => onPageChange(Math.max(1, pageIndex - 1))}
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
                        onClick={() => onPageChange(page)}
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
                        onPageChange(Math.min(totalPage, pageIndex + 1))
                    }
                >
                    Sau &gt;
                </button>
            </div>
        </div>
    );
};
