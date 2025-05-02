interface ProfileProps {
  username?: string;
  className?: string;
}

export default function Profile({
  username = "Noti-Core",
  className = "",
}: ProfileProps) {
  return (
    <article className={`flex items-center gap-3 ${className}`}>
      <div className="block size-8 bg-gray-400 rounded-full"></div>
      <span className="body-16">{username}</span>
    </article>
  );
}
