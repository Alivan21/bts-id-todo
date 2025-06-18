import { httpClient } from "@/libs/axios";
import {
  TCreateChecklistItemRequest,
  TUpdateChecklistItemRequest,
  TUpdateChecklistItemStatusRequest,
} from "./schema";
import { TChecklistItemResponse, TDeleteChecklistItemResponse } from "./type";

export const getChecklistItems = async (checklistId: string) => {
  const response = await httpClient.get<TChecklistItemResponse>(`/checklist/${checklistId}/item`);
  return response.data;
};

export const getChecklistItem = async (checklistId: string, itemId: string) => {
  const response = await httpClient.get<TChecklistItemResponse>(
    `/checklist/${checklistId}/item/${itemId}`
  );
  return response.data;
};

export const createChecklistItem = async (
  checklistId: string,
  data: TCreateChecklistItemRequest
) => {
  const response = await httpClient.post<TChecklistItemResponse>(
    `/checklist/${checklistId}/item`,
    data
  );
  return response.data;
};

export const updateChecklistItemStatus = async (
  checklistId: string,
  itemId: string,
  data: TUpdateChecklistItemStatusRequest
) => {
  const response = await httpClient.put<TChecklistItemResponse>(
    `/checklist/${checklistId}/item/${itemId}`,
    data
  );
  return response.data;
};

export const updateChecklistItemName = async (
  checklistId: string,
  itemId: string,
  data: TUpdateChecklistItemRequest
) => {
  const response = await httpClient.put<TChecklistItemResponse>(
    `/checklist/${checklistId}/item/rename/${itemId}`,
    data
  );
  return response.data;
};

export const deleteChecklistItem = async (checklistId: string, itemId: string) => {
  const response = await httpClient.delete<TDeleteChecklistItemResponse>(
    `/checklist/${checklistId}/item/${itemId}`
  );
  return response.data;
};
