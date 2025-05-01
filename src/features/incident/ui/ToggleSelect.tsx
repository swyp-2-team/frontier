import { useState } from "react";

const tabs = [
  { label: "진행 중인 장애", value: "processing" },
  { label: "장애 히스토리", value: "history" },
];

export default function ToggleSelect() {
  const [activeTab, setActiveTab] = useState("processing");

  return (
    <div className="flex justify-self-center w-full max-w-md bg-gray-300 p-1 rounded-2xl mb-10 gap-[3px]">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.value;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;

        return (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 py-3 text-center transition-all rounded-xl
              ${
                isActive
                  ? "bg-white body-18_SB text-black shadow-[4px_4px_4px_0px_rgba(0,0,0,0.10)]"
                  : "body-18 text-gray-500"
              }
              ${isFirst ? "rounded-l-xl" : ""}
              ${isLast ? "rounded-r-xl" : ""}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
