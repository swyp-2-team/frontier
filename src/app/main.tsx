import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@app/styles/index.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Query 클라이언트 생성
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />{" "}
      {/* 개발 환경에서만 활성화 */}
    </QueryClientProvider>
  </StrictMode>
);
