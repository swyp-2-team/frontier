import { useState, useRef, useEffect } from "react";
import Profile from "@/features/user/ui/Profile";

// 코멘트 타입 정의
export interface Comment {
  id: number;
  author: string;
  time: string;
  content: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  currentUser: string;
}

export default function CommentSection({
  comments,
  onAddComment,
  currentUser = "현재 사용자",
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [profileWidth, setProfileWidth] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);

  // 프로필 컴포넌트의 실제 너비 측정
  useEffect(() => {
    if (profileRef.current) {
      const width = profileRef.current.offsetWidth;
      setProfileWidth(width + 10); // 여백 추가
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div>
      <div className="flex flex-row justify-between title-20_SB text-gray-600 mb-2">
        Comments
      </div>
      <div className="bg-white rounded-xl py-7 px-4 shadow-sm">
        {comments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            아직 등록된 코멘트가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id}>
                <div className="flex justify-start items-center gap-2 mb-1">
                  <span className="body-16 text-gray-700">
                    <Profile />
                  </span>
                  <span className="text-sm text-gray-500">{comment.time}</span>
                </div>
                <p className="pl-11 body-16 text-black">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg mt-4">
        <div className="relative">
          <div
            ref={profileRef}
            className="flex items-center pl-4 absolute left-0 top-0 h-full"
          >
            <span className="text-gray-700">
              <Profile className="text-sm" />
            </span>
          </div>
          <input
            type="text"
            placeholder="Comment를 입력해주세요."
            className="flex items-center border border-gray-300 rounded-lg px-4 py-3 w-full"
            style={{
              paddingLeft: profileWidth ? `${profileWidth}px` : "calc(8rem)",
              paddingRight: "6rem",
            }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white body-15 w-16 h-9 px-3 py-1 rounded-2xl"
            disabled={!newComment.trim()}
          >
            입력
          </button>
        </div>
      </form>
    </div>
  );
}
