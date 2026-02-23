/**
 * lib/utils.ts
 * Hàm cn(): gộp className (Tailwind) an toàn: clsx xử lý điều kiện, twMerge tránh conflict giữa các class.
 * Dùng cho mọi component UI cần merge class động.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
