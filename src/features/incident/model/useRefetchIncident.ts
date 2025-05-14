import { useQueryClient } from "@tanstack/react-query";

export function useRefetchIncidents() {
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    // 장애 목록 refetching
    queryClient.invalidateQueries({ queryKey: ["incidents", "list", true] });
  };

  return handleRefetch;
}
