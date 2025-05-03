import { cn } from "@/shared/lib/utils";

interface ProfileProps {
  username?: string;
  className?: string;
}

export default function Profile({
  username = "NotiCore",
  className = "",
}: ProfileProps) {
  return (
    <article className={cn("flex items-center gap-3 ml-auto", className)}>
      <div className="block size-8 bg-gray-400 rounded-full"></div>
      <span className="body-16">{username}</span>
    </article>
  );
}
