import IncidentCard from "@/features/incident/ui/IncidentCard";
import { Incident } from "@/shared/types/incident";
import { Link } from "react-router-dom";

export const renderIncidentList = (incidents: Incident[] | undefined) => {
  if (!incidents) return null;

  // 1. 최신순 정렬 (registrationTime 기준 내림차순)
  const sortedIncidents = [...incidents].sort(
    (a, b) =>
      new Date(b.registrationTime).getTime() -
      new Date(a.registrationTime).getTime()
  );

  // 2. group별로 IncidentCard 생성
  const incidentList = sortedIncidents.flatMap((item) =>
    item.groups.map((group) => (
      <Link key={`${item.id}-${group.id}`} to={`/incident-mnt/${item.id}`}>
        <IncidentCard
          groupName={group.name}
          time={item.registrationTime}
          title={item.title}
          confirmed={
            group.members.filter((member) => member.isVerified).length
          }
          total={group.members.length}
        />
      </Link>
    ))
  );

  return incidentList;
};
