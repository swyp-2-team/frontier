import { parseRawBodyToSections } from "@shared/lib/parseRawBodyToSections";

export default function TemplateSection({ rawBody }: { rawBody: string }) {
  const parsedSections = parseRawBodyToSections(rawBody);

  const fallbackSectionHeaders = [
    "1. 장애 발생 시간 :",
    "2. 장애 확인 경로 :",
    "3. 장애 증상 :",
    "4. 영향 범위 :",
  ];

  return (
    <div className="flex flex-col gap-6">
      {fallbackSectionHeaders.map((header) => (
        <div className="flex flex-col gap-4" key={header}>
          <div className="flex">
            <span className="body-18_SB text-gray-800 whitespace-nowrap mr-2">
              {header}
            </span>
            <div className="body-18_LH32 text-gray-700 whitespace-pre-wrap break-words grow max-w-full">
              {parsedSections[header]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
