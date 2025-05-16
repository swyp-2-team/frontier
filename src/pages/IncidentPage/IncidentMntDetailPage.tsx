import { useParams, Link } from "react-router-dom";
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
import { useQuery } from "@tanstack/react-query";
import axios from "@/shared/api/baseInstance";
import Spinner from "@/shared/components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { IncidentDetailType } from "@/shared/types/incident";
import { formatDate } from "@/shared/lib/formatDate";

// 템플릿 내용용 타입 정의
interface TemplateContent {
  incidentTime: string;
  detectionPath: string;
  symptoms: string;
  impact: string;
}

// 장애 상세 정보 타입 정의
interface IncidentDetail {
  id: number;
  title: string;
  propagationTime: string;
  status: "active" | "completed";
  templateContent: TemplateContent;
}

// 템플릿 내용 MOCKUP
const TEMPLATE_MOCKUP: Record<string, IncidentDetail> = {
  "1": {
    id: 1,
    title: "503 Service Unavailable 문구 출력 오류",
    propagationTime: "2025년 4월 20일 15:27AM",
    status: "completed",
    templateContent: {
      incidentTime: "2025년 4월 10일 15:20PM",
      detectionPath: "모니터링 시스템, TS팀 감지, 사용자 제보 등",
      symptoms:
        "서비스 응답 지연 발생. 일부 사용자에게 로그인 및 데이터 조회 시 지연 현상 발생.",
      impact:
        "본 장애는 전사적으로 주요 시스템의 응답 속도 저하를 유발하였으며, 특히 웹/모바일 서비스의 로그인, 데이터 조회, 결제 요청 등 핵심 기능 이용 시 평균 20~30% 이상의 응답 지연이 발생하였습니다. 일부 사용자는 서비스 접속 자체가 불가하거나, 페이지 로딩 시간이 비정상적으로 길어지는 현상을 겪었으며, 이에 따라 고객 불만이 증가하고 고객센터를 통한 문의 건수도 급증하고 있는 상황입니다.",
    },
  },
  "2": {
    id: 2,
    title: "DB Connection Pool 고갈 장애",
    propagationTime: "2025년 4월 15일 09:45AM",
    status: "active",
    templateContent: {
      incidentTime: "2025년 4월 15일 09:30AM",
      detectionPath: "DB 모니터링 시스템 알람",
      symptoms: "서비스 전반 DB 조회 지연 및 타임아웃 발생",
      impact:
        "전체 사용자의 약 70%가 서비스 접속 불가 상태이며, 나머지 사용자도 간헐적 에러를 경험하고 있습니다. 결제 시스템, 회원 관리, 상품 조회 등 핵심 기능이 모두 영향을 받고 있으며 현재 긴급 복구 작업 진행 중입니다.",
    },
  },
};

// 댓글 MOCKUP
const COMMENTS_MOCKUP: Comment[] = [
  {
    id: 1,
    author: "문성욱",
    time: "8시간 전",
    content: "장애 확인 후 조치중입니다.",
  },
  {
    id: 2,
    author: "신재이",
    time: "8시간 전",
    content: "언제쯤 고쳐질 예정인지 문의드립니다.",
  },
  {
    id: 3,
    author: "박재호",
    time: "6시간 전",
    content: "3시간 내에 정상화 될 것으로 보입니다.",
  },
  {
    id: 4,
    author: "김민형",
    time: "2시간 전",
    content: "장애 확인 후 조치중입니다.",
  },
];

export default function IncidentMntDetailPage() {
  const navigate = useNavigate(); // 네비게이션 훅 추가
  // 현재 장애 id 가져오기
  const { incidentId } = useParams<{ incidentId: string }>();
  const [dividerHeight, setDividerHeight] = useState(0);
  const [incidentDetail, setIncidentDetail] = useState<IncidentDetail | null>(
    null
  );
  const [status, setStatus] = useState<"active" | "completed">("completed");
  const [comments, setComments] = useState<Comment[]>(COMMENTS_MOCKUP);

  // 장애 상세 정보 fetching
  const { data: incident, isLoading } = useQuery({
    queryKey: ["incidents", incidentId],
    queryFn: () =>
      axios.get<IncidentDetailType>(`/api/incidents/${incidentId}`),
    select: (res) => res.data,
    refetchInterval: 10 * 1000, // 10초마다 자동 요청
  });

  // 확인/미확인 목록 컨테이너에 대한 참조 생성
  const confirmedListRef = useRef<HTMLDivElement>(null);
  const unconfirmedListRef = useRef<HTMLDivElement>(null);

  // 확인 인원 명단이 담긴 배열
  const confirmedUsers = incident?.groups.flatMap((group) =>
    group.members.filter((member) => member.isVerified)
  );

  // 미확인 인원 명단이 담긴 배열
  const unconfirmedUsers = incident?.groups.flatMap((group) =>
    group.members.filter((member) => !member.isVerified)
  );

  // 전체 인원
  const totalMembers = incident?.groups.flatMap((group) => group.members);

  // 장애 상세 정보 로드
  useEffect(() => {
    if (incidentId && TEMPLATE_MOCKUP[incidentId]) {
      const detail = TEMPLATE_MOCKUP[incidentId];
      setIncidentDetail(detail);
      setStatus(detail.status);
    }
  }, [incidentId]);

  // 컴포넌트가 마운트된 후와 창 크기가 변경될 때마다 높이 계산
  useEffect(() => {
    const calculateHeight = () => {
      const confirmedHeight = confirmedListRef.current?.clientHeight || 0;
      const unconfirmedHeight = unconfirmedListRef.current?.clientHeight || 0;

      // 두 목록 중 더 긴 쪽의 높이를 구분선 높이로 설정
      setDividerHeight(Math.max(confirmedHeight, unconfirmedHeight));
    };

    calculateHeight();

    // 창 크기 변경 이벤트에 대응
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, [confirmedUsers?.length, unconfirmedUsers?.length]);

  if (incident) console.log(incident);

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: "현재 사용자", // 실제로는 로그인한 사용자 정보를 사용
      time: "방금 전",
      content,
    };

    setComments((prev) => [...prev, newComment]);
  };

  const toggleStatus = () => {
    setStatus(status === "completed" ? "active" : "completed");
    if (incidentDetail) {
      setIncidentDetail({
        ...incidentDetail,
        status: status === "completed" ? "active" : "completed",
      });
    }
  };

  if (!incidentDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {incident && (
            <div className="px-6 w-full">
              <div className="flex flex-row justify-between items-center mb-4">
                <Breadcrumb className="self-start mb-[38px]">
                  <BreadcrumbList className="body-13 text-gray-800">
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/home">홈</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild className="body-13 text-gray-800">
                        <Link to="/incident-mnt">장애관리</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild className="body-13_SB text-black">
                        <Link to={`/incident-mnt/${incidentId}`}>
                          장애 상세
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <button
                  onClick={handleGoBack}
                  className="flex justify-self-end mb-4"
                >
                  <OutIcon className={cn("w-8 h-8")} />
                </button>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex gap-25">
                  <div className="flex flex-col justify-start items-start mb-2 gap-2.5 title-20_SB text-gray-600">
                    제목
                    <span className="title-24_SB text-gray-800">
                      {incident.title}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2.5 title-20_SB text-gray-600 pl-8 border-l-2 border-gray-400">
                    전파 시간
                    <span className="title-18 text-gray-800">
                      {formatDate(incident.registrationTime)}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2.5 title-20_SB text-gray-600 pl-8 border-l-2 border-gray-400">
                    진행 상태
                    <span className="title-18 text-primary">
                      {incident.closingTime ? "처리완료" : "진행중"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleStatus}
                  className={`text-white w-[156px] h-[48px] rounded-xl my-3 ${
                    incident.closingTime ? "bg-[#eb5757]" : "bg-green-600"
                  }`}
                >
                  {incident.closingTime ? "상황재개" : "처리완료"}
                </button>
              </div>

              {/* 템플릿 내용 및 확인 인원 영역 */}
              <div className="flex flex-row gap-10 my-4">
                {/* 왼쪽 - 템플릿 내용 */}
                <div className="flex-2">
                  <div className="title-18_SB text-gray-600 mb-3">
                    템플릿 내용
                  </div>
                  <div className="py-8 pl-12 pr-14 bg-white rounded-xl h-9/10 overflow-y-auto">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex">
                          <span className="body-18_SB text-gray-800 whitespace-nowrap mr-2">
                            1. 장애 발생 시간 :{" "}
                          </span>
                          <span className="body-18_LH32 text-gray-700 break-words whitespace-pre-wrap grow max-w-full">
                            {incidentDetail.templateContent.incidentTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex">
                          <span className="body-18_SB text-gray-800 whitespace-nowrap mr-2">
                            2. 장애 확인 경로 :{" "}
                          </span>
                          <span className="body-18_LH32 text-gray-700 break-words whitespace-pre-wrap grow max-w-full">
                            {incidentDetail.templateContent.detectionPath}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex">
                          <span className="body-18_SB text-gray-800 whitespace-nowrap mr-2">
                            3. 장애 증상 :{" "}
                          </span>
                          <span className="body-18_LH32 text-gray-700 break-words whitespace-pre-wrap grow max-w-full">
                            {incidentDetail.templateContent.symptoms}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex">
                          <span className="body-18_SB text-gray-800 whitespace-nowrap mr-2">
                            4. 영향 범위 :
                          </span>
                          <span className="body-18_LH32 text-gray-700 break-words whitespace-pre-wrap grow max-w-full">
                            {incidentDetail.templateContent.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 오른쪽 - 확인 인원 */}
                <div className="flex-1">
                  <div className="flex flex-row justify-between title-20_SB text-gray-600 mb-2">
                    <span>확인 인원</span>
                    <span>
                      <span className="text-primary">
                        {confirmedUsers?.length}
                      </span>{" "}
                      / {totalMembers?.length}
                    </span>
                  </div>
                  <div className="py-8 px-8 bg-white rounded-xl h-9/10 overflow-y-auto">
                    <div className="flex flex-row gap-12 relative">
                      {/* 확인 컬럼 */}
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

                      {/* 구분선 - 이름 목록 길이에 맞춤 (동적 높이) */}
                      <div
                        className="w-px bg-gray-400 rounded-md absolute left-1/2 transform -translate-x-1/2"
                        style={{
                          top: "3.5rem",
                          height: `${dividerHeight}px`,
                        }}
                      ></div>

                      {/* 미확인 컬럼 */}
                      <div className="flex-1 justify-items-center">
                        <div className="body-16_SB text-gray-400 my-4">
                          미확인
                        </div>
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

              {/* 댓글 섹션 - 새로운 컴포넌트 사용 */}
              <CommentSection
                comments={comments}
                onAddComment={handleAddComment}
                currentUser="신재이" // 현재 로그인한 사용자 이름을 prop으로 전달
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
