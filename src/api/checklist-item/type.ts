import { SuccessResponse } from "@/common/types/base-response";

export type TChecklistItem = {
  id: string;
  name: string;
  itemCompletionStatus: boolean;
};

export type TChecklistItemResponse = SuccessResponse<TChecklistItem>;
export type TChecklistItemsResponse = SuccessResponse<TChecklistItem[]>;
export type TDeleteChecklistItemResponse = SuccessResponse<null>;
