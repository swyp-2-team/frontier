import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout, isLoading: isLoggingOut } = useAuth();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      await logout();
      toast.success("로그아웃되었습니다.");
      navigate("/");
    } catch (error) {
      // 오류가 발생해도 로그인 페이지로 리다이렉트
      navigate("/");
      toast.error("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-20 p-2.5 inline-flex flex-col justify-start items-start gap-2.5">
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="self-stretch h-6 px-1.5 py-1 bg-gray-300 rounded-lg inline-flex justify-center items-center cursor-pointer"
      >
        <div className="body-13 justify-start text-gray-900 leading-none">
          로그아웃
        </div>
      </button>
    </div>
  );
}
