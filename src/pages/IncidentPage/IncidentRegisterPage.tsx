import { cn } from "@/shared/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

const groups = [
  "Group_1",
  "Group_2",
  "Group_3",
  "Group_4",
  "Group_5",
  "Group_6",
];

export default function IncidentRegisterPage() {
  // 현재 경로
  const location = useLocation();

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

      {/* 본문 영역 */}
      <section className="flex flex-col md:flex-row gap-10 w-full">
        {/* Step 1: 그룹 선택 */}
        <section className="flex-1" aria-labelledby="group-selection-title">
          <header className="text-center mb-6">
            <h2 id="group-selection-title" className="text-lg font-semibold">
              전파 그룹을 선택해주세요.
            </h2>
            <p className="text-sm text-gray-500">
              그룹을 선택하고 대상 인원을 확인해주세요.
            </p>
          </header>

          <div className="space-y-2">
            {groups.map((group) => (
              <details key={group} className="bg-white border rounded-lg">
                <summary className="px-4 py-3 cursor-pointer flex justify-between items-center">
                  <span>{group}</span>
                  <span className="transform rotate-0 transition group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="px-4 py-2 text-sm text-gray-600 border-t">
                  대상 인원: 5명
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Step 2: 템플릿 복사 */}
        <section className="flex-1" aria-labelledby="template-copy-title">
          <header className="text-center mb-6">
            <h2 id="template-copy-title" className="text-lg font-semibold">
              템플릿을 복사해주세요.
            </h2>
            <p className="text-sm text-gray-500">
              클립보드에 복사 후 시스템에 이메일을 전송해주세요.
            </p>
          </header>

          <div className="space-y-3">
            <article className="bg-white border rounded-lg px-4 py-2 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <strong className="mr-2">받는 사람</strong>abc@gmail.com
              </div>
              <button
                aria-label="복사"
                className="text-gray-400 hover:text-gray-600"
              >
                📋
              </button>
            </article>

            <article className="bg-white border rounded-lg px-4 py-2 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <strong className="mr-2">제목</strong>503 Service Unavailable
                한국 출력 오류
              </div>
              <button
                aria-label="복사"
                className="text-gray-400 hover:text-gray-600"
              >
                📋
              </button>
            </article>

            <article className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="text-sm text-gray-700 space-y-2">
                  <p>1. 장애 발생 시간 :</p>
                  <p>2. 장애 확인 경로 :</p>
                  <p>3. 장애 증상 :</p>
                  <p>4. 영향 범위 :</p>
                </div>
                <button
                  aria-label="복사"
                  className="text-gray-400 hover:text-gray-600 mt-1"
                >
                  📋
                </button>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
