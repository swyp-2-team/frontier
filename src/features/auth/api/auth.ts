import instance from "@/shared/api/baseInstance";
import { LoginFormValues } from "@/features/auth/model/types";
import { AxiosResponse } from "axios";

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
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

  // UI용 인증 상태만 localStorage에 저장
  localStorage.setItem("isAuthenticated", "true");

  // 사용자 객체는 필요한 경우에만 공개 필드만 저장 (선택적)
  if (response.data && response.data.user) {
    const { username } = response.data.user; // 필요한 공개 정보만 추출
    localStorage.setItem("userInfo", JSON.stringify({ username }));
  }

  return response.data;
};

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<void> => {
  try {
    // 서버에 로그아웃 요청
    await instance.post("/api/auth/logout");
  } finally {
    // UI용 상태만 제거
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
  }
};

/**
 * 현재 인증 상태 확인
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

/**
 * 현재 로그인한 사용자 기본 정보 가져오기
 */
export const getUserInfo = () => {
  const userJson = localStorage.getItem("userInfo");
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

/**
 * 사용자 세션 유효성 검증
 */
export const validateSession = async (): Promise<boolean> => {
  if (!isAuthenticated()) {
    return false;
  }

  try {
    // 서버에 현재 세션 상태 확인 요청
    await instance.get("/api/auth/refresh");
    return true;
  } catch (error) {
    // 검증 실패 시 (쿠키 만료, 서버 오류 등) 인증 상태 제거
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
    return false;
  }
};

export default {
  login,
  logout,
  isAuthenticated,
  getUserInfo,
  validateSession,
};
