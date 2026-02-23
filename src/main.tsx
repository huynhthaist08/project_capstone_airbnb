import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import element from "./routes/element";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";

// Tạo một QueryClient dùng chung cho toàn app để quản lý cache data (react-query).
const client = new QueryClient();

// Entry point của ứng dụng:
// - Bọc toàn bộ app với Redux Provider, React Query Provider, AuthProvider.
// - Sử dụng RouterProvider để điều hướng theo cấu hình router `element`.
// - Thêm Toaster để hiện toast thông báo toàn cục.
createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <QueryClientProvider client={client}>
            <AuthProvider>
                <>
                    <RouterProvider router={element} />
                    <Toaster richColors closeButton position="top-right" />
                </>
            </AuthProvider>
        </QueryClientProvider>
    </Provider>,
);
