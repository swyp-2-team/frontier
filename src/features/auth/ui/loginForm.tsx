import { useState } from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/components/ui/card";
import { Input } from "../../../shared/components/ui/input";
import { Label } from "../../../shared/components/ui/label";
import { MOCK_CREDENTIALS } from "@/shared/lib/const";
import { CheckBox } from "./checkbox";

import EyeOn from "@/assets/icons/eyes_on.svg?react";
import EyeOff from "@/assets/icons/eyes_off.svg?react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // 폼 입력값 상태
  const [formValues, setFormValues] = useState({
    id: "",
    password: "",
  });

  // 로그인 상태 유지 체크 상태, 비밀번호 보이기 토글 상태, 에러 상태
  const [state, setState] = useState({
    isLoginChecked: false,
    pwIconChecked: false,
    errors: {
      id: "",
      password: "",
    },
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
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isSubmitting: true }));

    // 모킹된 로그인 검증 (실제로는 API 호출로 대체됨)
    setTimeout(() => {
      if (
        formValues.id === MOCK_CREDENTIALS.id &&
        formValues.password === MOCK_CREDENTIALS.password
      ) {
        // 로그인 성공
        console.log("로그인 성공:", {
          ...formValues,
          isLoginChecked: state.isLoginChecked,
        });
        setState((prev) => ({
          ...prev,
          errors: { id: "", password: "" },
          isSubmitting: false,
        }));
        alert("로그인 성공!");
      } else {
        // 로그인 실패
        console.log("로그인 실패");
        setState((prev) => ({
          ...prev,
          errors: {
            id: "아이디 또는 비밀번호가 일치하지 않습니다",
            password: "아이디 또는 비밀번호가 일치하지 않습니다",
          },
          isSubmitting: false,
        }));
      }
    }, 1000); // 네트워크 지연 시뮬레이션
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
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  onChange={handleInputChange}
                  value={formValues.id}
                  required
                  aria-invalid={!!state.errors.id}
                />
                {state.errors.id && (
                  <p className="text-sm text-red-500 mt-1">{state.errors.id}</p>
                )}
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
                    aria-invalid={!!state.errors.password}
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
                {state.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {state.errors.password}
                  </p>
                )}
              </div>
              <div className="pl-2.5 flex items-start">
                <CheckBox
                  isChecked={state.isLoginChecked}
                  label="로그인 상태 유지"
                  onChange={() => toggleState("isLoginChecked")}
                />
              </div>
              <Button
                type="submit"
                className="w-full my-10 body-16_SB"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? "로그인 중..." : "로그인"}
              </Button>

              {/* 테스트를 위한 도움말 */}
              <div className="text-sm text-gray-500 border-t pt-4 mt-2">
                <p>테스트 계정:</p>
                <p>ID: {MOCK_CREDENTIALS.id}</p>
                <p>Password: {MOCK_CREDENTIALS.password}</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
