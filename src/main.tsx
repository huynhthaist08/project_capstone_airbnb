import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import element from "./routes/element";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={element} />
    </QueryClientProvider>,
);
