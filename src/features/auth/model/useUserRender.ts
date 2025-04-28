import { useEffect, useState } from "react";

export function useUserRender() {
  const [email, setEmail] = useState<string>("");

  // 로그인한 유저 이메일을 화면에 렌더링
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  return { email };
}
