import { cn } from "@/shared/lib/utils";

interface ProfileProps {
  className?: string;
}

export default function Profile({ className = "" }: ProfileProps) {
  const name = localStorage.getItem("userInfo") || "NotiCore";
  return (
    <article className={cn("flex items-center gap-3 ml-auto", className)}>
      <div className="block size-8 bg-gray-400 rounded-full"></div>
      <span className="body-16">{name}</span>
    </article>
  );
}
