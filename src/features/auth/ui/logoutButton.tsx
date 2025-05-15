import { navigate } from "@/shared/lib/navigation";

export default function LogoutButton() {
  const handleLogout = () => {
    console.log("Log out");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-2 py-1 bg-gray-300 rounded-lg body-14 text-gray-600"
    >
      로그아웃
    </button>
  );
}
