/**
 * Base API response interface that all response types should extend
 */
export interface BaseResponse<T = unknown> {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: T;
}

/**
 * Standard success response with data payload
 */
export interface SuccessResponse<T = unknown> extends BaseResponse<T> {
  statusCode: number;
  errorMessage: null;
}

/**
 * Standard error response with error details
 */
export interface ErrorResponse extends BaseResponse<null> {
  statusCode: number;
  errorMessage: string;
  data: null;
}
