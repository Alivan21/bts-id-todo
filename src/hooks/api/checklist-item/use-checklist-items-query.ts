import { getChecklistItems } from "@/api/checklist-item";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useQuery } from "@/hooks/request/use-query";

export const useChecklistItemsQuery = (checklistId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECKLIST_ITEM.LIST, checklistId],
    queryFn: () => getChecklistItems(checklistId),
  });
};
