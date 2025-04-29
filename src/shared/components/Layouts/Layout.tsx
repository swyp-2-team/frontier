import Header from "@/shared/components/Layouts/Header";
import Sidebar from "@/shared/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-200 space-y-16 h-full">
      <Header></Header>
      <div className="flex pb-9">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
