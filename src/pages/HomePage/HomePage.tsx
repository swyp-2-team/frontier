import { useEffect, useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState<string>("");

  // 로그인한 유저 이메일을 화면에 렌더링
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

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
