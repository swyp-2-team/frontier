import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleVerification } from "@/features/incident/lib/verification";

/**
 * 인시던트 확인 페이지
 * 페이지 로드 시 자동으로 API를 호출하고, 결과에 따라 UI 표시
 */
export default function IncidentVerificationPage() {
  const { incidentId } = useParams<{ incidentId: string }>();

  useEffect(() => {
    const processVerification = async () => {
      try {
        if (!incidentId) {
          console.error("인시던트 ID가 누락되었습니다.");
          document.body.innerHTML =
            '<div style="text-align: center; padding: 20px; color: #e53e3e; font-family: sans-serif;">' +
            "<h3>오류</h3><p>유효하지 않은 인시던트 ID입니다.</p>" +
            "</div>";
          return;
        }

        // 로딩 상태 표시
        document.body.innerHTML =
          '<div style="text-align: center; padding: 20px; font-family: sans-serif;">' +
          '<div style="display: inline-block; width: 40px; height: 40px; ' +
          "border: 4px solid rgba(0, 0, 0, 0.1); border-radius: 50%; border-top: 4px solid #3b82f6; " +
          'animation: spin 1s linear infinite;"></div>' +
          "<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>" +
          '<p style="margin-top: 16px;">인시던트 확인 처리 중...</p>' +
          "</div>";

        // URL 파라미터에서 incidentId를 숫자로 변환
        const parsedIncidentId = parseInt(incidentId, 10);

        // 유효한 숫자인지 확인
        if (isNaN(parsedIncidentId)) {
          throw new Error("유효하지 않은 인시던트 ID 형식입니다.");
        }

        // API 호출 실행
        await handleVerification(parsedIncidentId);
      } catch (error) {
        console.error("인시던트 확인 페이지 오류:", error);
        document.body.innerHTML =
          '<div style="text-align: center; padding: 20px; color: #e53e3e; font-family: sans-serif;">' +
          "<h3>확인 처리 중 오류가 발생했습니다</h3>" +
          `<p>${error || "알 수 없는 오류"}</p>` +
          '<button onclick="window.location.reload()" ' +
          'style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; ' +
          'border: none; border-radius: 4px; cursor: pointer;">다시 시도</button>' +
          "</div>";
      }
    };

    processVerification();
  }, [incidentId]);

  // 초기 로딩 상태 (API 호출 완료 시 내용이 교체됨)
  return null;
}
