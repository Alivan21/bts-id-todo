import { SuccessResponse } from "@/common/types/base-response";
import { TChecklistItem } from "../checklist-item/type";

export type TChecklist = {
  checklistCompletionStatus: boolean;
  id: string;
  name: string;
  items?: TChecklistItem[];
};

export type TChecklistResponse = SuccessResponse<TChecklist[]>;
export type TDeleteChecklistResponse = SuccessResponse<null>;
