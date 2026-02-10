import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import element from "./routes/element";
import { store } from "./store";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <QueryClientProvider client={client}>
            <RouterProvider router={element} />
        </QueryClientProvider>
    </Provider>,
);
