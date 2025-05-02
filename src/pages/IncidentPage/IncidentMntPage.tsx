import { useState } from "react";

import IncidentList from "@/features/incident/ui/IncidentList";
import ToggleSelect from "@/features/incident/ui/ToggleSelect";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@shared/components/ui/breadcrumb";

export default function IncidentMntPage() {
  const [showActive, setShowActive] = useState(true);

  return (
    <div className="flex-1 flex-col w-full min-w-md justify-self-center border-l border-gray-400 h-screen px-[42px]">
      <Breadcrumb className="self-start mb-[38px]">
        <BreadcrumbList className="body-13 text-gray-800">
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/incident-mnt"
              className="body-13_SB text-black"
            >
              장애관리
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
