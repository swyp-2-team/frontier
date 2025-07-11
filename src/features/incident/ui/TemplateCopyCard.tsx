import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@shared/components/ui/tooltip";
import PasteIcon from "@/assets/icons/paste.svg?react";
import { cn } from "@/shared/lib/utils";

interface TemplateCopyCardProps {
  copyTitle: string;
  copySubtitle?: string;
  copyContent?: boolean;
  selectedGroups?: string[];
  clickState: boolean;
  onClick: () => void;
}

export default function TemplateCopyCard({
  copyTitle,
  copySubtitle,
  copyContent,
  selectedGroups,
  clickState,
  onClick,
}: TemplateCopyCardProps) {
  return (
    <article
      className={cn(
        "rounded-[12px] border-gray-400",
        clickState ? "bg-tertiary shadow-template-hover" : "bg-white"
      )}
      onClick={onClick}
    >
      <Tooltip>
        <TooltipTrigger className="py-[14px] flex flex-col w-full px-6 cursor-pointer">
          <div className="flex items-center w-full">
            <p
              className={cn(
                "body-16_SB mr-[10px] shrink-0 mb-auto",
                clickState ? "text-primary" : "text-gray-700"
              )}
            >
              {copyTitle}
            </p>

            {copySubtitle && (
              <span
                className={cn(
                  "body-13",
                  clickState ? "text-primary" : "text-gray-600"
                )}
              >
                {copySubtitle}
              </span>
            )}
            {selectedGroups && selectedGroups.length > 0 && (
              <p
                className={cn(
                  "body-13 pr-3 text-left",
                  clickState ? "text-primary" : "text-gray-600"
                )}
              >
                {`[emergency: ${selectedGroups.join(
                  ", "
                )}] ‘이 곳에 장애 제목을 입력하세요’`}
              </p>
            )}

            <PasteIcon
              className={cn(
                "size-6 cursor-pointer ml-auto shrink-0",
                clickState ? "text-primary" : "text-gray-600"
              )}
            />
          </div>
          {copyContent && (
            <div
              className={cn(
                "body-13 space-y-[22px] px-3 text-start pt-6 pb-12",
                clickState ? "text-primary" : "text-gray-800"
              )}
            >
              <p>1. 장애 발생 시간 :</p>
              <p>2. 장애 확인 경로 :</p>
              <p>3. 장애 증상 :</p>
              <p>4. 영향 범위 :</p>
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>복사하기</p>
        </TooltipContent>
      </Tooltip>
    </article>
  );
}
