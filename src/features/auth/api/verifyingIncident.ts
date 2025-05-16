import instance from "@/shared/api/baseInstance";
import { AxiosResponse } from "axios";

export interface VerifyIncidentResponse {
  status: string;
}
export interface VerifyIncidentRequest {
  incidentId: string;
}

/**
 * 인시던트 확인 API
 * @param request 인시던트 확인 요청 정보 (그룹 ID, 멤버 ID)
 * @returns 인시던트 확인 응답 (확인 여부)
 */
export const verifyIncident = async (
  request: VerifyIncidentRequest
): Promise<VerifyIncidentResponse> => {
  const response: AxiosResponse<VerifyIncidentResponse> = await instance.patch(
    "/api/incident/verify",
    request
  );

  return response.data;
};
