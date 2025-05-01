import { useState } from "react";

import IncidentList from "@/features/incident/ui/IncidentList";
import ToggleSelect from "@/features/incident/ui/ToggleSelect";

export default function IncidentMntPage() {
  const [showActive, setShowActive] = useState(true);

  return (
    <div className="flex flex-col w-full min-w-md justify-self-center gap-[26px] mt-[26px]">
      <h1>홈 {`>`} 장애관리</h1>
      <div>
        <ToggleSelect
          activeTab={showActive ? "active" : "history"}
          onChange={(tab) => setShowActive(tab === "active")}
        />
        <IncidentList showActive={showActive} />
      </div>
    </div>
  );
}
