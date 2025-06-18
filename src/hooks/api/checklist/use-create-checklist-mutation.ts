import { useQueryClient } from "@tanstack/react-query";
import { createChecklist } from "@/api/checklist";
import { QUERY_KEY } from "@/common/constants/query-keys";
import { useMutation } from "@/hooks/request/use-mutation";

export const useCreateChecklistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChecklist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECKLIST.LIST],
      });
    },
  });
};
