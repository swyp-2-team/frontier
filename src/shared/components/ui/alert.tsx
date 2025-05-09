import CircleCheckIcon from "assets/icons/circle-check.svg?react";
import CircleExclamIcon from "assets/icons/circle-exclam.svg?react";

interface AlertProps {
  type: "success" | "warning";
}

export default function Alert({ type }: AlertProps) {
  const IconComponent = type === "success" ? CircleCheckIcon : CircleExclamIcon;
  const iconBG = type === "success" ? "bg-urgency-low" : "bg-urgency-high";
  const iconShadow = type === "success" ? "shadow-success" : "shadow-warning";
  const iconColor = "text-white";

  return (
    <div className="flex flex-col items-center gap-8 bg-white_90 pt-16 pb-8.5 rounded-xl shadow-alertncopy backdrop-blur-xs">
      <div className="flex flex-col items-center gap-2.5 w-full">
        <div
          className={`size-11 left-[7.50px] top-[7.50px] absolute ${iconBG} ${iconShadow} rounded-full`}
        >
          <div className={`size-6 ${iconColor}`}>
            <IconComponent />
          </div>
          <div className="title-20_SB text-black text-center">
            {type === "success" ? "Success" : "Warning"}
          </div>
          <div className="body-16 text-gray-600 text-center">
            {type === "success" ? "정상 처리 되었습니다." : "에러임."}
          </div>
        </div>
      </div>
    </div>
  );
}
