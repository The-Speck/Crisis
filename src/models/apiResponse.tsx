import { ResponseStatus } from '../utils';

export type ApiResponse<T> = ApiResponseOk<T> | ApiResponseError;

export interface ApiResponseOk<T> {
  data: T;
  status: ResponseStatus.OK;
}

export interface ApiResponseError {
  status: ResponseStatus.ERROR;
  error: string;
}
