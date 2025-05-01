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
    <aside className="w-60 py-4 px-5 flex flex-col h-fit sticky top-0">
      <nav className="flex flex-col">
        <SidebarItem
          icon={<HomeIcon className="size-full" />}
          label="HOME"
          active={currentPath === "/home"}
          href="/home"
        />
        <SidebarItem
          icon={<PencilIcon className="size-full" />}
          label="장애등록"
          active={currentPath === "/incident-register"}
          href="/incident-register"
        />
        <SidebarItem
          icon={<DataIcon className="size-full" />}
          label="장애관리"
          active={currentPath === "/incident-mnt"}
          href="/incident-mnt"
        />
        <SidebarItem
          icon={<SheildIcon className="size-full" />}
          label="사용자 및 그룹 관리"
          active={currentPath === "/management"}
          href="/management"
        />
      </nav>
    </aside>
  );
}
