import axios from "@/shared/api/baseInstance";
import { useQuery } from "@tanstack/react-query";
import { IncidentListType } from "@/shared/types/incident";
import Spinner from "@/shared/components/ui/Spinner";
import { renderIncidentList } from "@/features/incident/model/renderIncidentList";

export default function IncidentList({
  showActive = true,
}: {
  showActive: boolean;
}) {
  // 장애 목록 조회
  const { data: incidents, isLoading } = useQuery({
    queryKey: ["incidents", "list", showActive],
    queryFn: () =>
      axios.get<IncidentListType>("/api/incidents/list", {
        params: { completion: !showActive },
      }),
    select: (res) => res.data.incidents,
    refetchInterval: 10 * 1000, // 10초마다 자동 요청
  });

  if (isLoading) return <Spinner />;

  const incidentList = renderIncidentList(incidents);

  return (
    <section className="flex flex-col gap-[18px] 2xl:gap-[26px]">
      {incidents?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {showActive
            ? "현재 진행 중인 장애가 없습니다."
            : "장애 히스토리가 없습니다."}
        </div>
      ) : (
        <>{incidentList}</>
      )}
    </section>
  );
}
