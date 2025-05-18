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

  // UI용 인증 상태만 localStorage에 저장
  localStorage.setItem("isAuthenticated", "true");

  // 사용자 객체는 필요한 경우에만 공개 필드만 저장 (선택적)
  if (response.data && response.data.name) {
    const username = response.data.name; // name 자체가 username이므로 직접 할당
    localStorage.setItem("userInfo", username);
  }

  return response.data;
};

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<void> => {
  // 서버에 로그아웃 요청
  await instance.post("/api/auth/logout");
  //console.log("로그아웃 성공");
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
    // API 호출 전에 로컬 스토리지/세션 스토리지를 확인하지 않음
    // 직접 API 호출로 세션 유효성만 체크
    const response = await instance.get("/api/auth/refresh");
    return response.status === 200;
  } catch (error) {
    console.error("세션 검증 오류:", error);
    // 오류 발생 시에도 함부로 토큰/쿠키 삭제하지 않음
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
