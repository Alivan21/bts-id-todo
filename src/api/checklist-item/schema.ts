import { z } from "zod";

export const createChecklistItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  isCompleted: z.boolean().optional(),
});

export const updateChecklistItemStatusSchema = z.object({
  isCompleted: z.boolean().optional(),
});

export const updateChecklistItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
});

export type TCreateChecklistItemRequest = z.infer<typeof createChecklistItemSchema>;
export type TUpdateChecklistItemStatusRequest = z.infer<typeof updateChecklistItemStatusSchema>;
export type TUpdateChecklistItemRequest = z.infer<typeof updateChecklistItemSchema>;
