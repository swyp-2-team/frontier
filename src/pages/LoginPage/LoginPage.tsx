import { LoginForm } from "@/shared/components/ui/loginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex-1 h-full">
        <img
          src="/src/assets/images/logIn.png"
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
