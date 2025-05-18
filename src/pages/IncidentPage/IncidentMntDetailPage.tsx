import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import OutIcon from "@/assets/icons/out.svg?react";
import CommentSection, { Comment } from "@/features/incident/ui/CommentSection";
import { cn } from "@/shared/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@shared/components/ui/breadcrumb";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/shared/api/baseInstance";
import Spinner from "@/shared/components/ui/Spinner";
import { IncidentDetailType } from "@shared/types/incident";
import { formatDate } from "@/shared/lib/formatDate";
import { incidentStatusUpdate } from "@/shared/api/incidentstatusupdate";
import TemplateSection from "@/features/incident/ui/TemplateSection";
import { AlertDialog } from "@/shared/components/ui/alertdialog";

const COMMENTS_MOCKUP: Comment[] = [
  {
    id: 1,
    author: "Noticore User",
    time: "1시간 전",
    content: "댓글 기능은 유지보수 기간 동안 고도화 예정입니다.",
  },
];

export default function IncidentMntDetailPage() {
  const navigate = useNavigate();
  const { incidentId } = useParams<{ incidentId: string }>();
  const [dividerHeight, setDividerHeight] = useState(0);
  const [comments, setComments] = useState<Comment[]>(COMMENTS_MOCKUP);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    type: "success" as const,
    description: "",
  });

  const queryClient = useQueryClient();

  const { data: incident, isLoading } = useQuery({
    queryKey: ["incidents", incidentId],
    queryFn: () =>
      axios.get<IncidentDetailType>(`/api/incidents/${incidentId}`),
    select: (res) => res.data,
    refetchInterval: 10 * 1000,
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (completion: boolean) =>
      incidentStatusUpdate(incidentId!, completion),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["incidents", incidentId] });

      const statusMessage = data.closingTime
        ? "장애가 처리완료 상태로 변경되었습니다."
        : "장애가 진행중 상태로 재개되었습니다.";

      setAlertInfo({
        type: "success",
        description: statusMessage,
      });
      setAlertOpen(true);
    },
    onError: (error) => {
      console.error("장애 상태 변경 실패:", error);

      setAlertInfo({
        type: "warning",
        description: "장애 상태 변경에 실패했습니다.",
      });
      setAlertOpen(true);
    },
  });

  const confirmedListRef = useRef<HTMLDivElement>(null);
  const unconfirmedListRef = useRef<HTMLDivElement>(null);

  const confirmedUsers = incident?.groups.flatMap((group) =>
    group.members.filter((member) => member.isVerified)
  );
  const unconfirmedUsers = incident?.groups.flatMap((group) =>
    group.members.filter((member) => !member.isVerified)
  );
  const totalMembers = incident?.groups.flatMap((group) => group.members);

  useEffect(() => {
    const calculateHeight = () => {
      const confirmedHeight = confirmedListRef.current?.clientHeight || 0;
      const unconfirmedHeight = unconfirmedListRef.current?.clientHeight || 0;
      setDividerHeight(Math.max(confirmedHeight, unconfirmedHeight));
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, [confirmedUsers?.length, unconfirmedUsers?.length]);

  const handleGoBack = () => {
    navigate("/incident-mnt");
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: "현재 사용자",
      time: "방금 전",
      content,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const toggleStatus = () => {
    const isCompleted = Boolean(incident?.closingTime);
    mutate(!isCompleted);
  };

  if (isLoading || !incident) {
    return (
      <div className="flex w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 w-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <Breadcrumb className="self-start mb-[38px]">
          <BreadcrumbList className="text-gray-800">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/home">홈</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/incident-mnt">장애관리</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="body-16_SB text-black">
                <Link to={`/incident-mnt/${incidentId}`}>장애 상세</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <button
          onClick={handleGoBack}
          className="flex justify-self-end mb-4 cursor-pointer"
        >
          <OutIcon className={cn("w-8 h-8")} />
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex gap-25">
          <div className="flex flex-col justify-start items-start mb-2 gap-2.5 title-20_SB text-gray-600">
            제목
            <span className="title-24_SB text-gray-800">{incident.title}</span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2.5 title-20_SB text-gray-600 pl-8 border-l-2 border-gray-400">
            전파 시간
            <span className="title-24_SB text-gray-800">
              {formatDate(incident.registrationTime)}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2.5 title-20_SB text-gray-600 pl-8 border-l-2 border-gray-400">
            진행 상태
            <span className="title-24 text-primary">
              {incident.closingTime ? "처리완료" : "진행중"}
            </span>
          </div>
        </div>
        <button
          onClick={toggleStatus}
          disabled={isMutating}
          className={`text-white w-[156px] h-[48px] rounded-xl my-3 cursor-pointer ${
            incident.closingTime ? "bg-[#eb5757]" : "bg-green-600"
          }`}
        >
          {isMutating
            ? "처리 중..."
            : incident.closingTime
            ? "상황재개"
            : "처리완료"}
        </button>
      </div>

      <div className="flex flex-row gap-10 my-4">
        <div className="flex-2">
          <div className="flex flex-row justify-between title-20_SB text-gray-600 mb-2">
            템플릿 내용
          </div>
          <div className="py-8 pl-12 pr-14 bg-white rounded-xl h-9/10 overflow-y-auto">
            <TemplateSection rawBody={incident.rawBody} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-row justify-between title-20_SB text-gray-600 mb-2">
            <span>확인 인원</span>
            <span>
              <span className="text-primary">{confirmedUsers?.length}</span> /{" "}
              {totalMembers?.length}
            </span>
          </div>
          <div className="py-8 px-8 bg-white rounded-xl h-9/10 overflow-y-auto">
            <div className="flex flex-row gap-12 relative">
              <div className="flex-1 justify-items-center">
                <div className="body-16_SB text-black my-4">확인</div>
                <div className="space-y-3" ref={confirmedListRef}>
                  {confirmedUsers?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 text-black"
                    >
                      <span className="body-18">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="w-px bg-gray-400 rounded-md absolute left-1/2 transform -translate-x-1/2"
                style={{ top: "3.5rem", height: `${dividerHeight}px` }}
              ></div>
              <div className="flex-1 justify-items-center">
                <div className="body-16_SB text-gray-400 my-4">미확인</div>
                <div className="space-y-3" ref={unconfirmedListRef}>
                  {unconfirmedUsers?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <span className="body-18">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentSection
        comments={comments}
        onAddComment={handleAddComment}
        currentUser="Noticore User"
      />

      <AlertDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        type={alertInfo.type}
        description={alertInfo.description}
      />
    </div>
  );
}
