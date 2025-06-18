import { SuccessResponse } from "@/common/types/base-response";

export type TChecklistItem = {
  id: string;
  itemName: string;
  isCompleted: boolean;
};

export type TChecklistItemResponse = SuccessResponse<TChecklistItem>;
export type TDeleteChecklistItemResponse = SuccessResponse<null>;
