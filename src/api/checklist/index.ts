import { httpClient } from "@/libs/axios";
import { TCreateChecklistRequest } from "./schema";
import { TChecklistResponse, TDeleteChecklistResponse } from "./type";

export const getChecklists = async () => {
  const response = await httpClient.get<TChecklistResponse>("/checklist");
  return response.data;
};

export const createChecklist = async (data: TCreateChecklistRequest) => {
  const response = await httpClient.post<TChecklistResponse>("/checklist", data);
  return response.data;
};

export const deleteChecklist = async (id: string) => {
  const response = await httpClient.delete<TDeleteChecklistResponse>(`/checklist/${id}`);
  return response.data;
};
