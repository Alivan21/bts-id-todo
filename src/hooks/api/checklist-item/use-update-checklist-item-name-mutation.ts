import { useQueryClient } from "@tanstack/react-query";
import { updateChecklistItemName } from "@/api/checklist-item";
import { TUpdateChecklistItemRequest } from "@/api/checklist-item/schema";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useMutation } from "@/hooks/request/use-mutation";

export const useUpdateChecklistItemNameMutation = (checklistId: string, itemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TUpdateChecklistItemRequest) =>
      updateChecklistItemName(checklistId, itemId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST_ITEM.LIST, checklistId],
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST_ITEM.DETAIL, checklistId, itemId],
      });
    },
  });
};
