import { Badge } from "@/shared/components/ui/badge";
import UserIcon from "@/assets/icons/user.svg?react";
import { formatDate } from "@/shared/lib/formatDate";

interface IncidentCardProps {
  groupName: string;
  time: string;
  title: string;
  confirmed: number;
  total: number;
  isActive?: boolean; // 진행 중인 장애인지 여부를 나타내는 속성 추가
}

export default function IncidentCard({
  groupName,
  time,
  title,
  confirmed,
  total,
  isActive = true, // 기본값은 진행 중인 장애
}: IncidentCardProps) {
  return (
    <article className="bg-white rounded-[12px] py-5 2xl:py-7 px-15 2xl:px-22 flex items-center">
      <section className="flex items-start gap-13 2xl:gap-20 border-r-2 border-gray-300 pr-12 2xl:pr-18 pt-[30px] pb-9">
        {/* isActive 속성에 따라 배지 변형 결정 */}
        <Badge variant={isActive ? "default" : "tertiary"}>{groupName}</Badge>
        <div className="min-w-[210px]">
          <p className="body-18_SB 2xl:title-20_SB text-gray-600 mb-3">
            등록시간
          </p>
          <p className="title-20 2xl:title-24 text-gray-700">
            {formatDate(time)}
          </p>
        </div>
      </section>
      <section className="flex items-center pl-12 2xl:pl-18 justify-between text-sm text-gray-500 w-full">
        <div>
          <p className="body-18_SB 2xl:title-20_SB text-gray-600 mb-3">제목</p>
          <p className="title-20 2xl:title-24 text-black">{title}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="body-18_SB 2xl:title-20_SB text-gray-600 mb-3">
            확인인원
          </p>
          <div className="flex items-center gap-2">
            <span className="text-primary">
              <UserIcon className="size-6" fill="#ed8a30" />
            </span>
            <p className="title-20 2xl:title-24 text-gray-600">
              <span className="text-primary">{confirmed}</span>
              <span> / {total}</span>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
