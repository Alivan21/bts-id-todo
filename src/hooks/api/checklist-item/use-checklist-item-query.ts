import { getChecklistItem } from "@/api/checklist-item";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useQuery } from "@/hooks/request/use-query";

export const useChecklistItemQuery = (checklistId: string, itemId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECKLIST_ITEM.DETAIL, checklistId, itemId],
    queryFn: () => getChecklistItem(checklistId, itemId),
    enabled: Boolean(checklistId && itemId),
  });
};
