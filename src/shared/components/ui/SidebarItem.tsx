import { Button } from "@/shared/components/ui/button";
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
    <Button
      asChild
      variant={"sidebar"}
      className={cn(
        "w-[200px] h-[60px] rounded-[12px] body-18 text-gray-700 px-3 justify-normal group",
        active
          ? "body-18_SB bg-secondary text-primary shadow-inner-custom"
          : "hover:text-primary"
      )}
    >
      <Link to={href} className="flex gap-2">
        <div
          className={cn(
            active
              ? ""
              : "text-gray-500 group-hover:text-primary transition-all"
          )}
        >
          {icon}
        </div>
        {label}
      </Link>
    </Button>
  );
}
