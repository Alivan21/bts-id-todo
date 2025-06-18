import { httpClient } from "@/libs/axios";
import { SessionAuthCookies } from "@/libs/cookies";
import { TLoginRequest, TRegisterRequest } from "./schema";
import { TLoginResponse, TRegisterResponse } from "./type";

export const register = async (credentials: TRegisterRequest): Promise<TRegisterResponse> => {
  const response = await httpClient.post<TRegisterResponse>("/register", credentials);
  return response.data;
};

export const login = async (credentials: TLoginRequest): Promise<TLoginResponse> => {
  const response = await httpClient.post<TLoginResponse>("/login", credentials);
  return response.data;
};

export const logout = (): void => {
  SessionAuthCookies.remove();
};
