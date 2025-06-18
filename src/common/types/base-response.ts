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

/**
 * Paginated response for list endpoints
 */
export type PaginatedResponse<T = unknown> = SuccessResponse<{
  items: T[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    total_page: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    next_page?: string;
    prev_page?: string;
    first_page?: string;
    last_page?: string;
    links?: {
      [key: string]: string | undefined;
    };
  };
}>;

/**
 * Helper type to represent any valid API response
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;
