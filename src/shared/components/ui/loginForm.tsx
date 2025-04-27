import { useState } from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLogin } from "@/features/auth/model/useLogin";

import CircleSpread from "@/assets/icons/circle-spread.svg?react";
//import eyeOn from "@/assets/icons/eyes_on.svg";
//import eyeoff from "@/assets/icons/eyes_off.svg";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // 로그인 훅
  const { onLogin, onChangeInput } = useLogin();

  // 로그인 상태 유지 체크 상태
  // 비밀번호 보이기 토글 상태

  const [state, setState] = useState({
    isLoginChecked: false,
    pwIconChecked: false,
  });

  // 토글 함수
  const toggleState = (key: keyof typeof state) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
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
          <form onSubmit={onLogin}>
            <div className="flex flex-col">
              <div className="grid gap-1.5 mb-3">
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className="grid gap-1.5 mb-5">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={onChangeInput}
                  required
                />
                <div className="flex justify-end"></div>
              </div>
              <div className="pl-2.5 flex items-start">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleState("isLoginChecked")}
                >
                  <CircleSpread
                    className={cn(
                      "w-6 h-6 transition-colors",
                      state.isLoginChecked ? "text-gray-900" : "text-gray-400"
                    )}
                  />
                  <span className="text-right justify-start body-16 leading-normal">
                    로그인 상태 유지
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full my-10 body-16_SB"
                onClick={(e) => {
                  // 폼 제출 시 isLoginChecked 값 사용
                  console.log("로그인 상태 유지:", state.isLoginChecked);
                  console.log("비밀번호 보이기 상태:", state.pwIconChecked);
                }}
              >
                로그인
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
