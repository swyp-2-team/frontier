import instance from "@/shared/api/baseInstance";
import { LoginFormValues } from "@/features/auth/model/types";
import { AxiosResponse } from "axios";

export interface LoginResponse {
  name: string;
}

/**
 * 로그인 API
 * @param credentials 로그인 인증 정보 (아이디, 비밀번호)
 * @returns 로그인 응답 (토큰, 사용자 정보)
 */
export const login = async (
  credentials: LoginFormValues
): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await instance.post(
    "/api/auth/login",
    credentials
  );

  // 로컬 저장소 사용하지 않음 (Query Client로 관리)
  return response.data;
};

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<void> => {
  // 서버에 로그아웃 요청
  await instance.post("/api/auth/logout");
};

/**
 * 사용자 세션 유효성 검증
 */
export const validateSession = async (): Promise<boolean> => {
  try {
    // 직접 API 호출로 세션 유효성만 체크
    const response = await instance.get("/api/auth/refresh");
    return response.status === 200;
  } catch (error) {
    console.error("세션 검증 오류:", error);
    return false;
  }
};

export default {
  login,
  logout,
  validateSession,
};
