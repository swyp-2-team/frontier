import { LoginForm } from "@/features/auth/ui/loginForm";
import { setNavigator } from "@/shared/lib/navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();

  useEffect(() => {
    setNavigator(nav);
  }, [nav]);

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
