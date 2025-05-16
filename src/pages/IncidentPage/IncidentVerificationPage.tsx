import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleVerification } from "@/features/incident/lib/verification"; // API 호출 함수

/**
 * 인시던트 확인 페이지
 * 페이지 로드 시 자동으로 API를 호출하고, 성공 시 창을 닫습니다.
 */
export default function IncidentVerificationPage() {
  const { incidentId } = useParams<{
    incidentId: string;
  }>();

  useEffect(() => {
    // API 호출 실행
    if (incidentId) {
      handleVerification(incidentId);
    }
  }, [incidentId]);

  // 빈 페이지 반환 (API 호출 결과에 따라 내용이 변경될 수 있음)
  return null;
}
