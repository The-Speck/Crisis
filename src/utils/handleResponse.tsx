import { ApiResponse, ApiResponseError, ApiResponseOk } from '../models';
import { devLog } from './devLog';

enum ResponseFunctions {
  ArrayBuffer = 'arrayBuffer',
  Blob = 'blob',
  Json = 'json',
  Text = 'text',
}

export enum ResponseStatus {
  OK = 'ok',
  ERROR = 'error',
}

export const createResponseOk = async function <T>(
  response: Response,
  func: ResponseFunctions,
): Promise<ApiResponseOk<T>> {
  return {
    data: await response[func](),
    status: ResponseStatus.OK,
  };
};

export const createResponseError = async function (response: Response): Promise<ApiResponseError> {
  return {
    status: ResponseStatus.ERROR,
    error: response.statusText,
  };
};

export const handleResponse = async function <T>(
  response: Response,
  func: ResponseFunctions,
): Promise<ApiResponse<T>> {
  try {
    if (response.status >= 200 && response.status <= 299) {
      return createResponseOk<T>(response, func);
    }
  } catch (error) {
    devLog(response.status, response.statusText, error);
  }

  return createResponseError(response);
};

export const handleJsonResponse = async function <T>(response: Response): Promise<ApiResponse<T>> {
  return handleResponse(response, ResponseFunctions.Json);
};
