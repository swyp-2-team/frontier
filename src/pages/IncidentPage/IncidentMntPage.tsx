import IncidentList from "@/features/incident/ui/IncidentList";
import ToggleSelect from "@/features/incident/ui/ToggleSelect";

export default function IncidentMntPage() {
  return (
    <div>
      <h1>홈 {`>`} 장애관리</h1>
      <div>
        <ToggleSelect />
        <IncidentList />
      </div>
    </div>
  );
}
