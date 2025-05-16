import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  isAuthenticated,
  validateSession,
  getUserInfo,
} from "@/features/auth/api/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authState, setAuthState] = useState<{
    isChecking: boolean;
    isAuthenticated: boolean;
  }>({
    isChecking: true,
    isAuthenticated: false,
  });

  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        // 로컬 인증 상태 확인
        if (isAuthenticated()) {
          // 로컬 스토리지/세션 스토리지에서 인증 상태 확인
          if (isMounted) {
            setAuthState({
              isChecking: false,
              isAuthenticated: true,
            });
          }
          return;
        }

        // 서버에 인증 상태 확인 요청 (필요시)
        try {
          const isValid = await validateSession();

          if (!isValid) {
            if (isMounted) {
              setAuthState({
                isChecking: false,
                isAuthenticated: false,
              });
            }
            return;
          }

          // 사용자 정보 및 권한 가져오기
          const userInfo = getUserInfo();

          if (isMounted) {
            setAuthState({
              isChecking: false,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error("인증 검증 실패:", error);

          if (isMounted) {
            setAuthState({
              isChecking: false,
              isAuthenticated: false,
            });
          }
        }
      } catch (error) {
        console.error("인증 상태 확인 오류:", error);

        if (isMounted) {
          setAuthState({
            isChecking: false,
            isAuthenticated: false,
          });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // 인증 확인 중
  if (authState.isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-600">인증 확인 중...</span>
      </div>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!authState.isAuthenticated) {
    // 현재 경로 저장 (로그인 후 돌아오기 위함)
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname + location.search
    );

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 인증 및 권한 확인 완료 - 자식 컴포넌트 렌더링
  return <>{children}</>;
}
