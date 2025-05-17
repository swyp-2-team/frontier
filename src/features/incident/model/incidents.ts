export interface IncidentList {
  id: number;
  registration_time: string;
  closing_time: string | null;
  title: string;
  groups: [
    {
      id: number;
      name: string;
      members: [
        {
          id: number;
          name: string;
          is_verified: boolean;
        }
      ];
    }
  ];
}

export interface IncidentDetail {
  incident_id: number;
  bucket: string;
  s3_uuid: string;
  registration_time: string;
  closing_time: string | null;
  title: string;
  groups: [
    {
      id: number;
      name: string;
      members: [
        {
          id: number;
          name: string;
          is_verified: boolean;
        }
      ];
    }
  ];
}

export interface IncidentStatus {
  completion: boolean;
}
