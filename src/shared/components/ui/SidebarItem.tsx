import { cn } from "@/shared/lib/utils";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  href: string;
}

export default function SidebarItem({
  icon,
  label,
  active,
  href,
}: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "w-full h-12 2xl:h-15 rounded-[8px] 2xl:rounded-[12px] body-16 2xl:body-18 text-gray-700 px-3 justify-normal group flex gap-2 items-center",
        active
          ? "body-16_SB 2xl:body-18_SB bg-secondary text-primary shadow-inner-custom"
          : "hover:text-primary"
      )}
    >
      <div
        className={cn(
          active ? "" : "text-gray-500 group-hover:text-primary transition-all"
        )}
      >
        <div className="size-5">{icon}</div>
      </div>
      {label}
    </Link>
  );
}
