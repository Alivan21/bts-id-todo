import { useQueryClient } from "@tanstack/react-query";
import { deleteChecklist } from "@/api/checklist";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useMutation } from "@/hooks/request/use-mutation";

export const useDeleteChecklistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChecklist(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST.LIST],
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST.DETAIL],
      });
    },
  });
};
