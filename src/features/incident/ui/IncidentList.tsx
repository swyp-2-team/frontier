import IncidentCard from "@/features/incident/ui/IncidentCard";

const DUMMY_INCIDENT_LIST = [
  {
    id: 1,
    groupName: "Group_1",
    time: "25.03.01. 13:00AM",
    title: "503 Service Unavailable 문구 출력 오류",
    confirmed: 4,
    total: 12,
  },
  {
    id: 2,
    groupName: "Group_2",
    time: "25.03.02. 13:00AM",
    title: "503 Service Unavailable 문구 출력 오류",
    confirmed: 6,
    total: 12,
  },
  {
    id: 3,
    groupName: "Group_3",
    time: "25.04.01. 13:00AM",
    title: "503 Service Unavailable 문구 출력 오류",
    confirmed: 12,
    total: 12,
  },
];

export default function IncidentList() {
  // 동적으로 IncidentCard 렌더링
  return (
    <section className="flex flex-col gap-[26px]">
      {DUMMY_INCIDENT_LIST.map((item) => (
        <IncidentCard
          key={item.id}
          groupName={item.groupName}
          time={item.time}
          title={item.title}
          confirmed={item.confirmed}
          total={item.total}
        />
      ))}
    </section>
  );
}
