import HomePage from "@/pages/HomePage/HomePage";
import IncidentMntPage from "@/pages/IncidentPage/IncidentMntPage";
import IncidentRegisterPage from "@/pages/IncidentPage/IncidentRegisterPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MntPage from "@/pages/MntPage/MntPage";
import Layout from "@/shared/components/Layouts/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "incident-register", element: <IncidentRegisterPage /> },
      { path: "/incident-mnt", element: <IncidentMntPage /> },
      {
        path: "/users",
        element: <MntPage />,
      },
    ],
  },
  {
    path: "/users/login",
    element: <LoginPage />,
  },
]);

export default router;
