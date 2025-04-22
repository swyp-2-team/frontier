import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 임시 설정한 로그인 가능한 로그인 데이터
const MOCK_USERDATA = {
  email: "test@test.com",
  password: "test123",
};

export function useLogin() {
  const navigate = useNavigate();
  // 입력값 상태관리
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // input값 변경 핸들러
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // form 제출시 실행되는 함수
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력한 email, password 추출
    const email = input.email;
    const password = input.password;

    // 입력값 검증
    if (email === MOCK_USERDATA.email && password === MOCK_USERDATA.password) {
      navigate("/");
      sessionStorage.setItem("userEmail", input.email);
    } else {
      alert("Email과 Password를 확인하세요.");
    }
  };

  return { onLogin, onChangeInput };
}
