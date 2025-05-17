import axios from "./baseInstance";

/**
 * 장애 상태 변경 API
 * @param id incident ID
 * @param completion true: 처리완료, false: 상황재개
 */
export const incidentStatusUpdate = (id: string, completion: boolean) => {
  return axios.patch(`/api/incidents/${id}`, { completion });
};
