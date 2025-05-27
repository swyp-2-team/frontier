import { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues } from "../model/types";
import * as authApi from "../api/auth";

// 사용자 정보 타입 정의
export interface User {
  name: string;
  role?: string;
}

// Auth 컨텍스트 타입 정의
interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

// Auth 컨텍스트 생성
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Props 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider 컴포넌트
export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  // 세션 유효성 검증
  const { data: isSessionValid, isLoading: isValidatingSession } = useQuery({
    queryKey: ["auth", "sessionValid"],
    queryFn: async () => {
      try {
        return await authApi.validateSession(); // boolean 반환
      } catch (error) {
        return false;
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 60 * 1000,
  });

  // 사용자 정보 쿼리 (캐시된 데이터 사용)
  const { data: user } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: () => {
      // 이 함수는 실제로는 호출되지 않음 (캐시된 데이터가 있을 경우)
      return Promise.resolve(null);
    },
    // 로그인 시 설정된 캐시된 사용자 정보 사용
    enabled: !!isSessionValid,
    staleTime: Infinity, // 무기한 캐시 유지 (로그인/로그아웃 시에만 변경)
  });

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      return await authApi.login(credentials);
    },
    onSuccess: (data) => {
      // 세션 유효성 상태 업데이트
      queryClient.setQueryData(["auth", "sessionValid"], true);

      // 사용자 정보 캐시에 저장
      if (data && data.name) {
        queryClient.setQueryData(["auth", "user"], { name: data.name });
      }
    },
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await authApi.logout();
    },
    onSuccess: () => {
      // 필요한 캐시만 초기화 (전체 캐시 초기화는 부작용 발생 가능)
      queryClient.setQueryData(["auth", "sessionValid"], false);
      queryClient.setQueryData(["auth", "user"], null);
    },
  });

  // 로그인/로그아웃 함수 구현
  const login = async (credentials: LoginFormValues) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // BroadcastChannel을 사용하여 창 간 동기화
  useEffect(() => {
    const channel = new BroadcastChannel("auth_channel");

    // 메시지 수신 시 쿼리 무효화
    channel.addEventListener("message", (event) => {
      if (event.data === "auth_changed") {
        queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
      }
    });

    return () => {
      channel.close();
    };
  }, [queryClient]);

  // 로그인/로그아웃 시 다른 창에 알림
  useEffect(() => {
    if (loginMutation.isSuccess || logoutMutation.isSuccess) {
      const channel = new BroadcastChannel("auth_channel");
      channel.postMessage("auth_changed");
      channel.close();
    }
  }, [loginMutation.isSuccess, logoutMutation.isSuccess]);

  // Context 값 설정
  const value = {
    isLoading: isValidatingSession,
    isAuthenticated: !!isSessionValid && !!user,
    user: isSessionValid ? user ?? null : null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 커스텀 훅: 인증 컨텍스트 사용
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
