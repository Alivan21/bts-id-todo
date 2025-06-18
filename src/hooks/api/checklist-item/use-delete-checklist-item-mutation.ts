import { useQueryClient } from "@tanstack/react-query";
import { deleteChecklistItem } from "@/api/checklist-item";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useMutation } from "@/hooks/request/use-mutation";

export const useDeleteChecklistItemMutation = (checklistId: string, itemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteChecklistItem(checklistId, itemId),
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
