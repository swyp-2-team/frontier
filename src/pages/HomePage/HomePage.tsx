import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div>Home Page</div>
      <Link to={"/users/login"}>로그인하기</Link>
    </>
  );
}
