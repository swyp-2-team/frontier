import { useState } from "react";

const tabs = [
  { label: "진행 중인 장애", value: "active" }, // 'processing'에서 'active'로 변경
  { label: "종료된 장애", value: "history" },
];

interface ToggleSelectProps {
  activeTab?: string; // 외부에서 활성 탭을 제어할 수 있도록 prop 추가
  onChange?: (value: string) => void; // 탭 변경 시 호출될 함수
}

export default function ToggleSelect({
  activeTab = "active", // 기본값을 'active'로 설정
  onChange,
}: ToggleSelectProps) {
  // 내부 상태는 외부 prop이 없을 때만 사용
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);

  // 실제 사용될 활성 탭 값 (prop이 있으면 prop 우선, 없으면 내부 상태)
  const currentActiveTab = activeTab || internalActiveTab;

  // 탭 클릭 핸들러
  const handleTabClick = (value: string) => {
    // 내부 상태 업데이트
    setInternalActiveTab(value);

    // 외부 onChange 함수가 있으면 호출
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex justify-self-center w-full max-w-md bg-gray-300 p-1 rounded-2xl mb-10 gap-[3px]">
      {tabs.map((tab) => {
        const isActive = currentActiveTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`flex-1 py-3 text-center transition-all rounded-xl
              ${
                isActive
                  ? "bg-white body-18_SB text-black shadow-[4px_4px_4px_0px_rgba(0,0,0,0.10)]"
                  : "body-18 text-gray-500"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
