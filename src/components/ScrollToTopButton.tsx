import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

// Nút scroll to top dùng chung cho toàn app, theo dõi scrollY và chỉ hiện khi đã cuộn xuống đủ xa.
const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const shouldShow = window.scrollY >= 300;
                    setVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Khởi tạo trạng thái ban đầu
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!visible) return null;

    return (
        <button
            type="button"
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                })
            }
            // Luôn dùng primary color cố định giống header/search, không phụ thuộc theme.
            className="fixed bottom-16 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff385c] text-white shadow-lg transition hover:bg-[#ff385c]/90 active:scale-95 md:bottom-8 md:right-8"
            aria-label="Scroll to top"
        >
            <FaArrowUp className="h-4 w-4" />
        </button>
    );
};

export default ScrollToTopButton;

