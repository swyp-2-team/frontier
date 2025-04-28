import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex h-20 bg-amber-100 *:not-last:border-r-2 *:flex *:flex-1 *:justify-center *:h-full *:items-center *:bg-red-200">
      <Link to={"/"}>홈페이지</Link>
      <Link to={"/users/login"}>로그인 페이지</Link>
    </div>
  );
}
