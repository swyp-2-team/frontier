import Header from "@/shared/components/Layouts/Header";
import Sidebar from "@/shared/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-200 space-y-16 h-screen">
      <Header></Header>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
