import { cn } from "@/shared/lib/utils";
import dogProfile from "@/assets/dogProfile.png";
import { useState } from "react";

interface ProfileProps {
  className?: string;
}

export default function Profile({ className = "" }: ProfileProps) {
  const name = localStorage.getItem("userInfo") || "NotiCore";
  const [showModal, setShowModal] = useState(false);
  return (
    <article className={cn("flex items-center gap-3 ml-auto", className)}>
      <div
        className="size-10 rounded-full overflow-hidden flex-shrink-0"
        onClick={() => setShowModal(true)}
      >
        <img
          src={dogProfile}
          alt="프로필 이미지"
          className="w-full h-full object-cover scale-[2.6] object-[40%_75%]"
        />
      </div>
      <span className="body-16">{name}</span>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white p-2 rounded-lg shadow-lg max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
              onClick={() => setShowModal(false)}
            ></button>
            <img
              src={dogProfile}
              alt="프로필 이미지 확대"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </article>
  );
}
