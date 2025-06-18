import { SuccessResponse } from "@/common/types/base-response";

export type TChecklistItem = {
  id: string;
  itemName: string;
  isCompleted: boolean;
};

export type TChecklist = {
  checklistCompletionStatus: boolean;
  id: string;
  name: string;
  items: TChecklistItem[];
};

export type TChecklistResponse = SuccessResponse<TChecklist>;
export type TDeleteChecklistResponse = SuccessResponse<null>;
