import { useQueryClient } from "@tanstack/react-query";
import { createChecklistItem } from "@/api/checklist-item";
import { TCreateChecklistItemRequest } from "@/api/checklist-item/schema";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useMutation } from "@/hooks/request/use-mutation";

export const useCreateChecklistItemMutation = (checklistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateChecklistItemRequest) => createChecklistItem(checklistId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST_ITEM.LIST, checklistId],
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST.LIST],
      });
    },
  });
};
