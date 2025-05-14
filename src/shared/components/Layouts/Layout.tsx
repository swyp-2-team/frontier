import Header from "@/shared/components/Layouts/Header";
import Sidebar from "@/shared/components/ui/Sidebar";
import { Outlet } from "react-router-dom";
import { setNavigator } from "@/shared/lib/navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const nav = useNavigate();

  useEffect(() => {
    setNavigator(nav);
  }, [nav]);

  return (
    <div className="bg-gray-200 space-y-5 min-h-screen">
      <Header></Header>
      <div className="flex flex-1 pb-9 relative">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
