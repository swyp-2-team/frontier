import { Badge } from "@/shared/components/ui/badge";
import UserIcon from "@/assets/icons/user.svg?react";

interface IncidentCardProps {
  groupName: string;
  time: string;
  title: string;
  confirmed: number;
  total: number;
}

export default function IncidentCard({
  groupName,
  time,
  title,
  confirmed,
  total,
}: IncidentCardProps) {
  return (
    <article className="bg-white rounded-[12px] py-7 px-22 flex items-center">
      <section className="flex items-start gap-20 border-r-2 border-gray-300 pr-18 pt-[30px] pb-9">
        <Badge>{groupName}</Badge>
        <div className="min-w-[210px]">
          <p className="title-20_SB text-gray-600 mb-3">등록시간</p>
          <p className="title-24 text-gray-700">{time}</p>
        </div>
      </section>
      <section className="flex items-center pl-18 justify-between text-sm text-gray-500 w-full">
        <div>
          <p className="title-20_SB text-gray-600 mb-3">제목</p>
          <p className="title-24 text-black">{title}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="title-20_SB text-gray-600 mb-3">확인인원</p>
          <div className="flex items-center gap-2">
            <span className="text-primary">
              <UserIcon className="size-6" fill="#ed8a30" />
            </span>
            <p className="title-24 text-gray-600">
              <span className="text-primary">{confirmed}</span>
              <span> / {total}</span>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
