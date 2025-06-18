import { SuccessResponse } from "@/common/types/base-response";

export type TLoginResponse = SuccessResponse<{
  token: string;
}>;

export type TRegisterResponse = SuccessResponse<string>;
