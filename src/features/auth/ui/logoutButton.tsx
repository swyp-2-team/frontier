import { navigate } from "@/lib/navigation";

export default function LogoutButton() {
  const handleLogout = () => {
    console.log("Logging out");
    navigate("/");
  };

  return (
    <div className="w-20 p-2.5 inline-flex flex-col justify-start items-start gap-2.5">
      <button
        onClick={handleLogout}
        className="self-stretch h-6 px-1.5 py-1 bg-gray-300 rounded-lg inline-flex justify-center items-center"
      >
        <div className="body-13 justify-start text-gray-900 leading-none">
          로그아웃
        </div>
      </button>
    </div>
  );
}
