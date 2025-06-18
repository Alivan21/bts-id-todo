import { httpClient } from "@/libs/axios";
import { TLoginRequest, TRegisterRequest } from "./schema";
import { TLoginResponse, TRegisterResponse } from "./type";

export const register = async (credentials: TRegisterRequest): Promise<TRegisterResponse> => {
  const response = await httpClient.post<TRegisterResponse>("/auth/register", credentials);
  return response.data;
};

export const login = async (credentials: TLoginRequest): Promise<TLoginResponse> => {
  const response = await httpClient.post<TLoginResponse>("/auth/login", credentials);
  return response.data;
};
