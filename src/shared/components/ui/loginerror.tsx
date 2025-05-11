import CircleExclam from "@/assets/icons/circle-exclam.svg?react";

interface LoginErrorProps {
  errorText: string;
}

export default function LoginError({ errorText }: LoginErrorProps) {
  return (
    <div className="flex w-full mt-1">
      <div className="inline-flex items-center px-4 py-1.5 bg-urgency-high/10 rounded-md border border-gray-300">
        <div className="flex-shrink-0 size-4 mr-1.5">
          <CircleExclam className="text-red" />
        </div>
        <div className="body-13 leading-tight text-red whitespace-normal break-words">
          {errorText}
        </div>
      </div>
    </div>
  );
}
