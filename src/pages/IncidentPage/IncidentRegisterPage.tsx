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
import TemplateCopyCard from "@/features/incident/ui/TemplateCopyCard";
import { Link } from "react-router-dom";
import {
  onBodyClick,
  onRecipientClick,
  onSubjectClick,
} from "@/features/incident/model/copyIncidentTemplate";
import { useQuery } from "@tanstack/react-query";
import axios from "@/shared/api/baseInstance";
import { GroupListResponseType } from "@/shared/types/group";
import Spinner from "@/shared/components/ui/Spinner";

export default function IncidentRegisterPage() {
  // 복사 버튼 선택시 상태 관리
  const [isRecipientClicked, setIsRecipientClicked] = useState<boolean>(false); // 수신자 섹션
  const [isSubjectClicked, setIsSubjectClicked] = useState<boolean>(false); // 제목 섹션
  const [isBodyClicked, setIsBodyClicked] = useState<boolean>(false); // 내용 섹션

  // 선택된 수신 그룹 상태 관리
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // 그룹 목록 조회
  const { data: groupList, isLoading } = useQuery({
    queryKey: ["groups", "list"],
    queryFn: () => axios.get<GroupListResponseType>("/api/groups/list"),
    select: (res) => res.data.groups,
  });

  return (
    <main className="flex flex-col items-center w-full px-[42px]">
      {/* Breadcrumb */}
      <Breadcrumb className="self-start mb-[38px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/home">홈</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="body-16_SB text-black">
              <Link to="/incident-register">장애등록</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Step 표시 */}
      <div className="w-full px-[138px]">
        <div className="h-15 2xl:h-[70px] bg-[url('/images/step_arrow.png')] bg-[length:100%_100%] bg-center bg-no-repeat flex justify-around items-center body-18 mb-10">
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

            {isLoading ? (
              <Spinner />
            ) : (
              <Accordion
                type="multiple"
                className="bg-white text-black rounded-[12px] border-gray-300 body-16 overflow-hidden"
                onValueChange={setSelectedGroups}
              >
                {groupList?.map((group) => (
                  <AccordionItem
                    key={group.id}
                    value={group.name}
                    className="hover:bg-tertiary"
                  >
                    <AccordionTrigger className="px-4 rounded-none [&[data-state=open]]:bg-primary [&[data-state=open]]:text-white">
                      {group.name}
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-100 px-4 py-[30px] flex justify-center gap-4 flex-wrap">
                      {group.members.map((member) => (
                        <span key={member} className="body-16 text-gray-700">
                          {member}
                        </span>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
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
                copySubtitle="noticore@noticore.co.kr"
                clickState={isRecipientClicked}
                onClick={() => onRecipientClick(setIsRecipientClicked)}
              />
              <TemplateCopyCard
                copyTitle="제목"
                selectedGroups={selectedGroups}
                clickState={isSubjectClicked}
                onClick={() =>
                  onSubjectClick(selectedGroups, setIsSubjectClicked)
                }
              />

              <TemplateCopyCard
                copyTitle="내용"
                copyContent={true}
                clickState={isBodyClicked}
                onClick={() => onBodyClick(setIsBodyClicked)}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
