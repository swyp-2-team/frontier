import { useState } from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import LoginError from "@/shared/components/ui/loginerror";
//import { navigate } from "@/shared/lib/navigation";
import { useNavigate } from "react-router-dom";
import { CheckBox } from "./checkbox";
import authApi from "../api/auth";

import EyeOn from "@/assets/icons/eyes_on.svg?react";
import EyeOff from "@/assets/icons/eyes_off.svg?react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  // 폼 입력값 상태
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // 로그인 상태 유지 체크 상태, 비밀번호 보이기 토글 상태, 에러 상태
  const [state, setState] = useState({
    isLoginChecked: false,
    pwIconChecked: false,
    errors: "",
    isSubmitting: false,
  });

  // 토글 함수
  const toggleState = (key: keyof typeof state) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 폼 값 업데이트
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 해당 필드의 에러 지우기
    if (state.errors[name as keyof typeof state.errors]) {
      setState((prev) => ({
        ...prev,
        errors: "",
      }));
    }
  };

  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      /*const response = */ await authApi.login(formValues);
      //console.log("로그인 성공:", response);
      setState((prev) => ({
        ...prev,
        errors: "",
        isSubmitting: false,
      }));

      handleLoginSuccess();
    } catch (error) {
      console.error("로그인 실패:", error);
      setState((prev) => ({
        ...prev,
        errors: "Email 또는 Password가 일치하지 않습니다.",
        isSubmitting: false,
      }));
    }
  };

  // 로그인 성공 후 처리
  const handleLoginSuccess = () => {
    // 로그인 전에 저장된 리다이렉트 URL 확인
    const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
    // 리다이렉트 URL이 존재하면 해당 URL로 이동
    sessionStorage.removeItem("redirectAfterLogin");

    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      // 리다이렉트 URL이 없으면 기본 페이지로 이동
      navigate("/home");
    }
  };

  return (
    <div
      className={cn("flex flex-col w-full max-w-lg p-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Log-in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <div className="grid gap-1.5 mb-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  onChange={handleInputChange}
                  value={formValues.email}
                  required
                  aria-invalid={!!state.errors}
                />
              </div>
              <div className="grid gap-1.5 mb-5">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={state.pwIconChecked ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={handleInputChange}
                    value={formValues.password}
                    required
                    className="pr-10"
                    aria-invalid={!!state.errors}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => toggleState("pwIconChecked")}
                  >
                    {state.pwIconChecked ? (
                      <EyeOn className={cn("w-5 h-5")} />
                    ) : (
                      <EyeOff className={cn("w-5 h-5")} />
                    )}
                  </div>
                </div>
                {state.errors && (
                  <LoginError errorText={state.errors} />
                )}
              </div>
              <div className="pl-2.5 flex items-start">
                <CheckBox
                  isChecked={state.isLoginChecked}
                  label="Email 기억하기"
                  onChange={() => toggleState("isLoginChecked")}
                />
              </div>
              <Button
                type="submit"
                className="w-full 2xl:w-full my-10 body-16_SB"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
