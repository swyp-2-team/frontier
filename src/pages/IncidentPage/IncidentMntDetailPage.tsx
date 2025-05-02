import { useParams } from "react-router-dom"; // react-router-dom에서 useParams를 가져옴

export default function IncidentMntDetailPage() {
  const { incidentId } = useParams<{ incidentId: string }>(); // URL에서 incidentId를 가져옴

  return <div>장애 상세 페이지</div>;
}
