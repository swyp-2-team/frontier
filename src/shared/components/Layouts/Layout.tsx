import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="h-20 bg-amber-200">Header</header>
      <Outlet />
      <footer className="h-20 bg-amber-200">Footer</footer>
    </>
  );
}
