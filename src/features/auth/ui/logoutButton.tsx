import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { navigate } from "@/shared/lib/navigation";
import authApi from "@/features/auth/api/auth";

import { toast } from "sonner";
import { performLocalLogout } from "../lib/localLogout";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // 로컬 인증 정보 삭제
      performLocalLogout();
      toast.success("로그아웃되었습니다.");
      // 로그아웃 API 호출
      await authApi.logout();
      navigate("/");
    } catch (error) {
      // 에러 처리
      console.error("로그아웃 오류:", error);
      // 오류가 발생해도 로컬 인증 정보는 삭제
      performLocalLogout();
      // 오류가 발생해도 로그인 페이지로 리다이렉트
      navigate("/");

      toast.error("로그아웃 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoggingOut(false);
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
