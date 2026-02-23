import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import element from "./routes/element";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";

const client = new QueryClient();

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
