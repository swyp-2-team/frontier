import { NavigateFunction, NavigateOptions, To } from "react-router-dom";

// NavigateFunction은 useNavigate()가 리턴하는 함수의 타입
// useNavigate()로 얻은 navigate 함수를 여기다 할당할 예정
let navigator: NavigateFunction;

// 앱 시작시 최초 1번 최상위 컴포넌트에서 이 함수를 호출
export const setNavigator = (nav: NavigateFunction) => {
  // 외부에서 이 함수를 호출해서 navigator에 useNavigate()로 받은 함수를 할당함
  navigator = nav;
};

// 내비게이션을 할 때 호출하는 함수
export const navigate = (to: To, options?: NavigateOptions) => {
  if (!navigator) throw new Error("Navigator is not set");
  // 내부적으로는 navigator 함수를 호출함
  return navigator(to, options);
};
