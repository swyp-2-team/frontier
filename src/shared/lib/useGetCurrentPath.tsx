import { useLocation } from "react-router-dom";

export function useGetCurrentPath() {
  const location = useLocation();
  const currentPath = location.pathname;

  return currentPath;
}
