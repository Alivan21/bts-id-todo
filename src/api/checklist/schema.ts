import { z } from "zod";

export const createChecklistSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type TCreateChecklistRequest = z.infer<typeof createChecklistSchema>;
