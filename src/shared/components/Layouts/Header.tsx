import LogoutButton from "@/features/auth/ui/logoutButton";
import Profile from "@/features/user/ui/Profile";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex px-[42px] gap-6 items-center h-14 2xl:h-20 border-b border-gray-400">
      <Link to="/home">
        <img src="/images/noticore_banner.svg" />
      </Link>
      <Profile />
      <LogoutButton />
    </div>
  );
}
