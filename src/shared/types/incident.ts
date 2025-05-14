interface GroupAtIncident {
  id: number;
  name: string;
  members: {
    id: number;
    name: string;
    isVerified: boolean;
  }[];
}

export interface Incident {
  id: number;
  title: string;
  registrationTime: string;
  closingTime: string | null;
  groups: GroupAtIncident[];
}

export interface IncidentListType {
  incidents: Incident[];
}
