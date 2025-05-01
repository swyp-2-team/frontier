import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@shared/components/ui/breadcrumb";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/components/ui/accordion";

import { useState } from "react";
import { toast } from "sonner";
import TemplateCopyCard from "@/features/incident/ui/TemplateCopyCard";

const groups = [
  {
    id: 1,
    groupName: "Group_1",
    human: [
      "김철수",
      "이영희",
      "박민수",
      "최수정",
      "정우성",
      "한가인",
      "장동건",
      "고소영",
      "이정재",
      "송강호",
      "전지현",
      "황정민",
      "강호동",
      "유재석",
      "이효리",
      "신동엽",
      "김종국",
      "윤아",
    ],
  },
  {
    id: 2,
    groupName: "Group_2",
    human: ["최수정", "정우성", "한가인"],
  },
  {
    id: 3,
    groupName: "Group_3",
    human: ["장동건", "고소영", "이정재"],
  },
  {
    id: 4,
    groupName: "Group_4",
    human: ["송강호", "전지현", "황정민"],
  },
  {
    id: 5,
    groupName: "Group_5",
    human: ["강호동", "유재석", "이효리"],
  },
  {
    id: 6,
    groupName: "Group_6",
    human: ["신동엽", "김종국", "윤아"],
  },
];

export default function IncidentRegisterPage() {
  // 복사 버튼 선택시 상태 관리
  const [isRecipientClicked, setIsRecipientClicked] = useState<boolean>(false); // 수신자 섹션
  const [isSubjectClicked, setIsSubjectClicked] = useState<boolean>(false); // 제목 섹션
  const [isBodyClicked, setIsBodyClicked] = useState<boolean>(false); // 내용 섹션

  // 복사하기 버튼 눌렀을 때 실행할 함수
  const onRecipientClick = () => {
    toast.success("복사 되었습니다! 이메일에 붙여넣기하세요.");
    setIsRecipientClicked(true);
  };
  const onSubjectClick = () => {
    toast.success("복사 되었습니다! 이메일에 붙여넣기하세요.");
    setIsSubjectClicked(true);
  };
  const onBodyClick = () => {
    toast.success("복사 되었습니다! 이메일에 붙여넣기하세요.");
    setIsBodyClicked(true);
  };

  return (
    <main className="flex flex-col items-center w-full border-l border-gray-400 h-screen px-[42px]">
      {/* Breadcrumb */}
      <Breadcrumb className="self-start mb-[38px]">
        <BreadcrumbList className="body-13 text-gray-800">
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/incident-register"
              className="body-13_SB text-black"
            >
              장애등록
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Step 표시 */}
      <div className="w-full px-[138px]">
        <div className="h-[70px] bg-[url('/images/step_arrow.png')] bg-[length:100%_100%] bg-center bg-no-repeat flex justify-around items-center body-18 mb-10">
          <span>Step.1</span>
          <span>Step.2</span>
        </div>

        {/* 본문 영역 */}
        <section className="flex flex-col md:flex-row gap-10 w-full">
          {/* Step 1: 그룹 선택 */}
          <section className="flex-1" aria-labelledby="group-selection-title">
            <div className="text-center mb-6">
              <h2
                id="group-selection-title"
                className="title-24 text-black pb-2"
              >
                <span className="title-24_SB">전파 그룹</span>을 선택해주세요.
              </h2>
              <p className="body-18 text-gray-700">
                그룹을 선택하고 대상 인원을 확인해주세요.
              </p>
            </div>

            <Accordion
              type="multiple"
              className="bg-white text-black rounded-[12px] border-gray-300 body-16 overflow-hidden"
            >
              {groups.map((group) => (
                <AccordionItem
                  key={group.id}
                  value={group.groupName}
                  className="hover:bg-tertiary"
                >
                  <AccordionTrigger className="px-4 rounded-none [&[data-state=open]]:bg-primary [&[data-state=open]]:text-white">
                    {group.groupName}
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-100 px-4 py-[30px] flex justify-center gap-4 flex-wrap">
                    {group.human.map((human) => (
                      <span key={human} className="body-16 text-gray-700">
                        {human}
                      </span>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Step 2: 템플릿 복사 */}
          <section className="flex-1" aria-labelledby="template-copy-title">
            <div className="text-center mb-6">
              <h2
                id="group-selection-title"
                className="title-24 text-black pb-2"
              >
                템플릿을 <span className="title-24_SB">복사</span>해주세요.
              </h2>
              <p className="body-18 text-gray-700">
                클립보드에 복사 후 시스템에 이메일을 전송해주세요.
              </p>
            </div>

            <div className="space-y-[10px]">
              <TemplateCopyCard
                copyTitle="받는 사람"
                copySubtitle="noti-core@noticore.co.kr"
                clickState={isRecipientClicked}
                onClick={onRecipientClick}
              />
              <TemplateCopyCard
                copyTitle="제목"
                copySubtitle="[Group_1] 503 Service Unavailable 문구 출력 오류"
                clickState={isSubjectClicked}
                onClick={onSubjectClick}
              />

              <TemplateCopyCard
                copyTitle="내용"
                copyContent={true}
                clickState={isBodyClicked}
                onClick={onBodyClick}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
