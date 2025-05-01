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
import PasteIcon from "@/assets/icons/paste.svg?react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/components/ui/tooltip";

import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

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
              <article
                className={cn(
                  "h-13 rounded-[12px] border-gray-400",
                  isRecipientClicked
                    ? "bg-tertiary shadow-template-hover"
                    : "bg-white"
                )}
                onClick={onRecipientClick}
              >
                <Tooltip>
                  <TooltipTrigger className="flex w-full items-center px-6 py-[14px] cursor-pointer">
                    <p
                      className={cn(
                        "body-16_SB mr-[10px]",
                        isRecipientClicked ? "text-primary" : "text-gray-700"
                      )}
                    >
                      받는 사람
                    </p>
                    <p
                      className={cn(
                        "body-13",
                        isRecipientClicked ? "text-primary" : "text-gray-600"
                      )}
                    >
                      noticore@noticore.co.kr
                    </p>
                    <PasteIcon
                      className={cn(
                        "size-6 cursor-pointer ml-auto",
                        isRecipientClicked ? "text-primary" : "text-gray-600"
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>복사하기</p>
                  </TooltipContent>
                </Tooltip>
              </article>

              <article
                className={cn(
                  "h-13 rounded-[12px] border-gray-400",
                  isSubjectClicked
                    ? "bg-tertiary shadow-template-hover"
                    : "bg-white"
                )}
                onClick={onSubjectClick}
              >
                <Tooltip>
                  <TooltipTrigger className="flex w-full items-center px-6 py-[14px] cursor-pointer">
                    <p
                      className={cn(
                        "body-16_SB mr-[10px]",
                        isSubjectClicked ? "text-primary" : "text-gray-700"
                      )}
                    >
                      제목
                    </p>
                    <p
                      className={cn(
                        "body-13",
                        isSubjectClicked ? "text-primary" : "text-gray-600"
                      )}
                    >
                      503 Service Unavailable 문구 출력 오류
                    </p>
                    <PasteIcon
                      className={cn(
                        "size-6 cursor-pointer ml-auto",
                        isSubjectClicked ? "text-primary" : "text-gray-600"
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>복사하기</p>
                  </TooltipContent>
                </Tooltip>
              </article>

              <article
                className={cn(
                  "rounded-[12px] border-gray-400",
                  isBodyClicked
                    ? "bg-tertiary shadow-template-hover"
                    : "bg-white"
                )}
                onClick={onBodyClick}
              >
                <Tooltip>
                  <TooltipTrigger className="w-full cursor-pointer">
                    <article className="rounded-[12px] flex flex-col px-6 pt-[14px] pb-[62px]">
                      <div className="flex items-center mb-[22px]">
                        <p
                          className={cn(
                            "body-16_SB",
                            isBodyClicked ? "text-primary" : "text-gray-700"
                          )}
                        >
                          내용
                        </p>
                        <PasteIcon
                          className={cn(
                            "size-6 ml-auto",
                            isBodyClicked ? "text-primary" : "text-gray-600"
                          )}
                        />
                      </div>
                      <div
                        className={cn(
                          "body-13 space-y-[22px] px-3 text-start",
                          isBodyClicked ? "text-primary" : "text-gray-800"
                        )}
                      >
                        <p>1. 장애 발생 시간 :</p>
                        <p>2. 장애 확인 경로 :</p>
                        <p>3. 장애 증상 :</p>
                        <p>4. 영향 범위 :</p>
                      </div>
                    </article>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>복사하기</p>
                  </TooltipContent>
                </Tooltip>
              </article>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
