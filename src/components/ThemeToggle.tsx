import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// Nút toggle Light/Dark mode dùng chung: auto detect system, lưu vào localStorage, áp dụng class 'dark' lên <html>.
const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme | null>(null);

    // Khởi tạo theme: ưu tiên localStorage, fallback theo system prefers-color-scheme.
    useEffect(() => {
        const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
        if (stored === "light" || stored === "dark") {
            setTheme(stored);
            applyTheme(stored);
            return;
        }

        const prefersDark = window.matchMedia?.(
            "(prefers-color-scheme: dark)",
        ).matches;
        const initial: Theme = prefersDark ? "dark" : "light";
        setTheme(initial);
        applyTheme(initial);
    }, []);

    const applyTheme = (next: Theme) => {
        const root = document.documentElement;
        if (next === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem(STORAGE_KEY, next);
    };

    const toggleTheme = () => {
        if (!theme) return;
        const next: Theme = theme === "light" ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
    };

    if (!theme) return null;

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground active:scale-95 md:h-10 md:w-10"
            aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
        >
            {isDark ? (
                <FaSun className="h-4 w-4" />
            ) : (
                <FaMoon className="h-4 w-4" />
            )}
        </button>
    );
};

export default ThemeToggle;

