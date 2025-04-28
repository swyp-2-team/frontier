import { useUserRender } from "@/features/auth/model/useUserRender";

export default function HomePage() {
  // user email 렌더링 훅에서 email 값 가져오기
  const { email } = useUserRender();

  return (
    <>
      {email ? (
        <div>
          <h1>환영합니다, {email}님! </h1>
        </div>
      ) : (
        <h1>안녕하세요, Noti-Core 입니다.</h1>
      )}
    </>
  );
}
