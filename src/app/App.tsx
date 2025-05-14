import { RouterProvider } from "react-router-dom";
import router from "@/router/routes.tsx";
import { Toaster } from "@shared/components/ui/sonner";
import { useBreakpoint } from "@/shared/lib/useBreakpoint";

function App() {
  const breakpoint = useBreakpoint();
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        richColors
        offset={{
          bottom: "100px",
          right: breakpoint === "2xl" ? "300px" : "208px",
        }}
      />
    </>
  );
}

export default App;
