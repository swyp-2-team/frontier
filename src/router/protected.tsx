import { ReactNode } from "react";
import { ProtectedRoute } from "@/shared/components/auth/protectedRouter";

interface ProtectedProps {
  children: ReactNode;
}

/**
 * 보호된 라우트를 감싸는 래퍼 컴포넌트
 */
export function Protected({ children }: ProtectedProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
