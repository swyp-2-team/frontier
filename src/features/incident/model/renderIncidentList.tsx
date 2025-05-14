import IncidentCard from "@/features/incident/ui/IncidentCard";
import { Incident } from "@/shared/types/incident";
import { Link } from "react-router-dom";

export const renderIncidentList = (incidents: Incident[] | undefined) => {
  const incidentList = incidents?.map((item) => {
    const groups = item.groups;
    return groups.map((group) => (
      <Link key={`${item.id}-${group.id}`} to={`/incident-mnt/${item.id}`}>
        <IncidentCard
          groupName={group.name}
          time={item.registrationTime}
          title={item.title}
          confirmed={
            group.members.filter((member) => member.isVerified === true).length
          }
          total={group.members.length}
        />
      </Link>
    ));
  });

  return incidentList;
};
