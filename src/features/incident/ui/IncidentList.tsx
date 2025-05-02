import { Link } from "react-router-dom";

import IncidentCard from "@/features/incident/ui/IncidentCard";

const DUMMY_INCIDENT_LIST = [
  {
    id: 1,
    groupName: "Group_1",
    time: "25.03.01. 13:00AM",
    title: "503 Service Unavailable 문구 출력 오류",
    confirmed: 4,
    total: 12,
    isActive: true,
  },
  {
    id: 2,
    groupName: "Group_2",
    time: "25.03.02. 13:00AM",
    title: "503 Service Unavailable 문구 출력 오류",
    confirmed: 6,
    total: 12,
    isActive: true,
  },
  {
    id: 3,
    groupName: "Group_3",
    time: "25.04.01. 13:00AM",
    title: "503 Service Unavailable 문구 출력 오류",
    confirmed: 12,
    total: 12,
    isActive: false,
  },
];

export default function IncidentList({
  showActive = true,
}: {
  showActive: boolean;
}) {
  const incidents = showActive
    ? DUMMY_INCIDENT_LIST.filter((item) => item.isActive)
    : DUMMY_INCIDENT_LIST.filter((item) => !item.isActive); // 히스토리만 표시하도록 변경

  return (
    <section className="flex flex-col gap-[26px]">
      {incidents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {showActive
            ? "현재 진행 중인 장애가 없습니다."
            : "장애 히스토리가 없습니다."}
        </div>
      ) : (
        incidents.map((item) => (
          <Link key={item.id} to={`/incident-mnt/${item.id}`}>
            <IncidentCard
              groupName={item.groupName}
              time={item.time}
              title={item.title}
              confirmed={item.confirmed}
              total={item.total}
              isActive={item.isActive}
            />
          </Link>
        ))
      )}
    </section>
  );
}
