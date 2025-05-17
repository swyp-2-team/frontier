import instance from "@/shared/api/baseInstance";
import { AxiosResponse } from "axios";

export interface VerifyIncidentResponse {
  status: string;
  message?: string;
}

export interface VerifyIncidentRequest {
  incidentId: string; // Long 타입 호환성을 위해 문자열로 변경
}

/**
 * 인시던트 확인 API
 * @param request 인시던트 확인 요청 정보
 * @returns 인시던트 확인 응답 (확인 여부)
 */
export const verifyIncident = async (
  request: VerifyIncidentRequest
): Promise<VerifyIncidentResponse> => {
  //console.log("인시던트 확인 API 호출", request);

  // 요청 내용 검증 및 로깅
  if (!request.incidentId) {
    //console.error("유효하지 않은 incidentId:", request.incidentId);
    throw new Error("인시던트 ID가 필요합니다");
  }

  const response = await instance.patch<VerifyIncidentResponse>(
    `/api/incidents/verify/${request.incidentId}`
  );

  return response.data;
};
