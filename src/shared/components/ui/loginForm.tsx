import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 임시 설정한 로그인 가능한 로그인 데이터
const MOCK_USERDATA = {
  email: "test@test.com",
  password: "test123",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  // 입력값 상태관리
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // input값 변경 핸들러
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // form 제출시 실행되는 함수
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력한 email, password 추출
    const email = input.email;
    const password = input.password;

    // 입력값 검증
    if (email === MOCK_USERDATA.email && password === MOCK_USERDATA.password) {
      navigate("/");
    } else {
      alert("Email과 Password를 확인하세요.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  onChange={onChangeInput}
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
