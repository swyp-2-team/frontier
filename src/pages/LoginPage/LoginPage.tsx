import { useEffect } from "react";

import { LoginForm } from "@/features/auth/ui/loginForm";
import authApi from "@/features/auth/api/auth";
import { navigate } from "@/shared/lib/navigation";

export default function LoginPage() {
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!authApi.isAuthenticated()) {
        const isValid = await authApi.validateSession();
        if (isValid) {
          navigate("/home");
        } else {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        navigate("/home");
      }
    };

    checkAuthStatus();
  });

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex-1 h-full max-w-[716px]">
        <img
          src="/images/logIn.png"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-2 flex place-items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
