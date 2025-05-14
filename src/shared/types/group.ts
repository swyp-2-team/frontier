interface Groups {
  id: number;
  name: string;
  members: string[];
}

export interface GroupListResponseType {
  groups: Groups[];
}
