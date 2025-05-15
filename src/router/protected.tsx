import { ReactNode } from "react";
import { ProtectedRoute } from "@/shared/components/auth/protectedRouter";

interface ProtectedProps {
  children: ReactNode;
  requiredRoles?: string[];
}

/**
 * 보호된 라우트를 감싸는 래퍼 컴포넌트
 */
export function Protected({ children, requiredRoles = [] }: ProtectedProps) {
  return (
    <ProtectedRoute requiredRoles={requiredRoles}>{children}</ProtectedRoute>
  );
}
