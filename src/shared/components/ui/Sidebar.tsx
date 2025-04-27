import SidebarItem from "@/shared/components/ui/SidebarItem";
import HomeIcon from "@/assets/icons/home.svg?react";
import PencilIcon from "@/assets/icons/pencil.svg?react";
import DataIcon from "@/assets/icons/data.svg?react";
import SheildIcon from "@/assets/icons/shield.svg?react";
import { useGetCurrentPath } from "@/shared/hooks/useGetCurrentPath";

export default function Sidebar() {
  // 현재 경로 가져오기
  const currentPath = useGetCurrentPath();

  return (
    <aside className="w-60 bg-gray-100 p-6 flex flex-col">
      <nav className="flex flex-col gap-4">
        <SidebarItem
          icon={<HomeIcon className="size-6" />}
          label="HOME"
          active={currentPath === "/"}
          href="/"
        />
        <SidebarItem
          icon={<PencilIcon className="size-6" />}
          label="장애등록"
          active={currentPath === "/incidents/new"}
          href="/incidents/new"
        />
        <SidebarItem
          icon={<DataIcon className="size-6" />}
          label="장애관리"
          active={currentPath === "/incidents"}
          href="/incidents"
        />
        <SidebarItem
          icon={<SheildIcon className="size-6" />}
          label="사용자 및 그룹 관리"
          active={currentPath === "/users"}
          href="/users"
        />
      </nav>
    </aside>
  );
}
