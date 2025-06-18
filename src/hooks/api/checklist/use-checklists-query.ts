import { getChecklists } from "@/api/checklist";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useQuery } from "@/hooks/request/use-query";

export const useChecklistsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECKLIST.LIST],
    queryFn: getChecklists,
  });
};
