import Header from "@/shared/components/Layouts/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
}
