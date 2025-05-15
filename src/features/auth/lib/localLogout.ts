export const performLocalLogout = () => {
  // 인증 관련 데이터 모두 제거
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("redirectAfterLogin");

  console.log("로컬 로그아웃 처리 완료");
};
