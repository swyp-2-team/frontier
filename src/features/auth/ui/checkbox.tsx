import { cn } from "@shared/lib/utils";
import CircleSpread from "@/assets/icons/circle-spread.svg?react";

interface CheckBoxProps {
  isChecked: boolean;
  label: string;
  onChange: () => void;
  className?: string;
}

export function CheckBox({
  isChecked,
  label,
  onChange,
  className,
}: CheckBoxProps) {
  return (
    <div
      className={cn("flex items-center gap-2 cursor-pointer", className)}
      onClick={onChange}
    >
      <CircleSpread
        className={cn(
          "w-6 h-6 transition-colors",
          isChecked ? "text-gray-900" : "text-gray-400"
        )}
      />
      <span className="text-right justify-start body-16 leading-normal">
        {label}
      </span>
    </div>
  );
}
