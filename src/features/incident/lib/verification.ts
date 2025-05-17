import { verifyIncident } from "@/features/auth/api/verifyingIncident";

/**
 * 인시던트 확인 처리 함수
 * 인시던트 ID를 받아 API를 호출하고 응답에 따라 UI 처리
 */
export const handleVerification = async (incidentId: number) => {
  try {
    if (!incidentId) {
      //console.error("인시던트 ID가 없습니다.");
      return;
    }

    // incidentId를 문자열로 변환
    const stringId = incidentId.toString();
    //console.log("인시던트 확인 요청:", { originalId: incidentId, stringId });

    // API 호출
    const response = await verifyIncident({
      incidentId: stringId, // 문자열로 변환하여 전송
    });

    //console.log("인시던트 확인 응답:", response);

    // 응답이 verified이면 창 닫기
    if (response.status === "verified") {
      console.log("인시던트 확인 완료. 창을 닫습니다.");

      // 확인 완료 메시지를 먼저 표시 (창이 닫히지 않을 경우 대비)
      document.body.innerHTML =
        '<div style="text-align: center; padding: 20px; font-family: sans-serif;">' +
        '<h3 style="color: #22c55e; font-size: 24px; margin-bottom: 16px;">확인 완료</h3>' +
        "<p>인시던트가 성공적으로 확인되었습니다.</p>" +
        '<p style="margin-top: 12px; font-size: 14px; color: #666;">이 창은 자동으로 닫히거나 수동으로 닫아도 됩니다.</p>' +
        "</div>";

      // 창 닫기 시도
      setTimeout(() => {
        try {
          window.close();
        } catch (e) {
          console.log("창을 자동으로 닫을 수 없습니다.");
        }
      }, 1000);
    } else {
      // 다른 상태인 경우 (예: 이미 확인됨, 유효하지 않은 ID 등)
      document.body.innerHTML =
        '<div style="text-align: center; padding: 20px; font-family: sans-serif;">' +
        '<h3 style="color: #3b82f6; font-size: 24px; margin-bottom: 16px;">처리 결과</h3>' +
        `<p>${
          response.message || response.status || "요청이 처리되었습니다."
        }</p>` +
        '<p style="margin-top: 12px; font-size: 14px; color: #666;">이 창은 닫아도 됩니다.</p>' +
        "</div>";
    }
  } catch (error) {
    console.error("인시던트 확인 처리 오류:", error);
    // 오류 메시지 표시
    document.body.innerHTML =
      '<div style="text-align: center; padding: 20px; font-family: sans-serif;">' +
      '<h3 style="color: #ef4444; font-size: 24px; margin-bottom: 16px;">확인 처리 중 오류</h3>' +
      `<p>${error}</p>` +
      '<p style="margin-top: 18px; font-size: 14px; color: #666;">페이지를 새로고침 하거나 관리자에게 문의하세요.</p>' +
      '<button onclick="window.location.reload()" ' +
      'style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; ' +
      'border: none; border-radius: 4px; cursor: pointer;">새로고침</button>' +
      "</div>";
  }
};
