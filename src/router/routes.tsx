import HomePage from "@/pages/HomePage/HomePage";
import IncidentMntPage from "@/pages/IncidentPage/IncidentMntPage";
import IncidentMntDetailPage from "@/pages/IncidentPage/IncidentMntDetailPage";
import IncidentRegisterPage from "@/pages/IncidentPage/IncidentRegisterPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MntPage from "@/pages/MntPage/MntPage";
import Layout from "@/shared/components/Layouts/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "incident-register", element: <IncidentRegisterPage /> },
      {
        path: "incident-mnt",
        element: <IncidentMntPage />,
      },
      {
        path: "incident-mnt/:incidentId", // 동적 라우트 파라미터 사용
        element: <IncidentMntDetailPage />,
      },
      { path: "management", element: <MntPage /> },
    ],
  },
]);

export default router;
