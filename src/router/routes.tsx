import HomePage from "@/pages/HomePage/HomePage";
import IncidentMntPage from "@/pages/IncidentPage/IncidentMntPage";
import IncidentMntDetailPage from "@/pages/IncidentPage/IncidentMntDetailPage";
import IncidentRegisterPage from "@/pages/IncidentPage/IncidentRegisterPage";
import IncidentVerificationPage from "@/pages/IncidentPage/IncidentVerificationPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MntPage from "@/pages/MntPage/MntPage";
import Layout from "@/shared/components/Layouts/Layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Protected } from "./protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
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
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
  // 인시던트 확인 라우트 - 보호된 경로
  {
    path: "/verify/:incidentId",
    element: (
      <Protected>
        <IncidentVerificationPage />
      </Protected>
    ),
  },
]);

export default router;
