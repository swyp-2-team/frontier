import instance from "@/shared/api/baseInstance";
import { AxiosResponse } from "axios";

import {
  IncidentList,
  IncidentDetail,
  IncidentStatus,
} from "../model/incidents";

interface IncidentListResponse {
  incidents: IncidentList[];
}

/**
 * 장애 목록 조회 API
 * @param completion - 완료 여부 (true: 완료된 장애, false: 미완료 장애)
 * @returns 장애 목록
 */
export const getIncidentList = async (
  completion: boolean
): Promise<IncidentList[]> => {
  const response: AxiosResponse<IncidentListResponse> = await instance.get(
    `/api/incidents/list`,
    {
      params: {
        completion,
      },
    }
  );
  return response.data.incidents;
};

/**
 * 장애 상세 정보 조회 API
 * @param incidentId - 장애 ID
 * @returns 장애 상세 정보
 */
export const getIncidentDetail = async (
  incidentId: number
): Promise<IncidentDetail> => {
  const response: AxiosResponse<IncidentDetail> = await instance.get(
    `/api/incidents/${incidentId}`
  );
  //console.log("getIncidentDetail", response.data);
  return response.data;
};

/**
 * 장애 완료/미완료 상태 변경 API
 * @param incidentId - 장애 ID
 * @param completion - 완료 여부 (true: 완료 처리, false: 미완료 처리)
 * @returns 업데이트된 장애 상태
 */
export const updateIncidentStatus = async (
  incidentId: number,
  completion: boolean
): Promise<IncidentStatus> => {
  const response: AxiosResponse<IncidentStatus> = await instance.patch(
    `/api/incidents/${incidentId}`,
    {
      completion,
    }
  );
  return response.data;
};
