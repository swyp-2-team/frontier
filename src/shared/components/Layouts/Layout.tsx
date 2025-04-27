import Header from "@/shared/components/Layouts/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <footer className="h-20 bg-amber-200">Footer</footer>
    </>
  );
}
