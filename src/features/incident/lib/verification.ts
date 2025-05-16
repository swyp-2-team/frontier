import { verifyIncident } from "@/features/auth/api/verifyingIncident";

export const handleVerification = async (incidentId: string) => {
  try {
    if (!incidentId) {
      console.error("인시던트 ID가 없습니다.");
      return;
    }

    // API 호출
    const response = await verifyIncident({ incidentId });

    console.log("인시던트 확인 응답:", response);

    // 응답이 verified이면 창 닫기
    if (response.status === "verified") {
      console.log("인시던트 확인 완료. 창을 닫습니다.");
      window.close();

      // 창이 닫히지 않을 경우 메시지 표시 (팝업 차단 등의 이유로)
      setTimeout(() => {
        document.body.innerHTML =
          '<div style="text-align: center; padding: 20px; font-family: sans-serif;"><h3>확인 완료</h3><p>이 창은 닫아도 됩니다.</p></div>';
      }, 300);
    }
  } catch (error) {
    console.error("인시던트 확인 처리 오류:", error);

    // 에러 발생 시 최소한의 메시지만 표시
    document.body.innerHTML =
      '<div style="text-align: center; padding: 20px; color: #e53e3e; font-family: sans-serif;"><h3>확인 처리 중 오류가 발생했습니다</h3><p>페이지를 새로고침 하거나 관리자에게 문의하세요.</p></div>';
  }
};
