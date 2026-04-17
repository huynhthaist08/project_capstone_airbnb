// Kiểm tra 2 ngày có xung đột không
// ngayDen1 <= ngayDi2 && ngayDi1 >= ngayDen2

export const hasDateConflict = (
    ngayDen1: string,
    ngayDi1: string,
    ngayDen2: string,
    ngayDi2: string,
): boolean => {
    return ngayDen1 <= ngayDi2 && ngayDi1 >= ngayDen2;
};

// Lấy danh sách ngày bị kín của một phòng

export const getBookedDates = (
    bookings: Array<{ ngayDen: string; ngayDi: string }>,
): string[] => {
    const bookedDates: Set<string> = new Set();

    bookings.forEach(({ ngayDen, ngayDi }) => {
        const current = new Date(ngayDen);
        const end = new Date(ngayDi);

        while (current <= end) {
            bookedDates.add(current.toISOString().split("T")[0]);
            current.setDate(current.getDate() + 1);
        }
    });

    return Array.from(bookedDates).sort();
};

// Kiểm tra xem ngày có bị kín không

export const isDateBooked = (date: string, bookedDates: string[]): boolean => {
    return bookedDates.includes(date);
};

// Kiểm tra range ngày có xung đột không

export const hasDateRangeConflict = (
    ngayDen: string,
    ngayDi: string,
    bookings: Array<{ ngayDen: string; ngayDi: string }>,
    excludeBookingId?: number,
): boolean => {
    return bookings.some((booking: any) => {
        // Nếu edit, bỏ qua booking hiện tại
        if (excludeBookingId && booking.id === excludeBookingId) {
            return false;
        }
        return hasDateConflict(
            ngayDen,
            ngayDi,
            booking.ngayDen,
            booking.ngayDi,
        );
    });
};
