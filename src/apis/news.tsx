import { NewsAPIResponse } from '../models';
import { devLog, handleJsonResponse } from '../utils';

// TODO: Catch a failed fetch and return a generic error
export const fetchTopNewsHeadlines = async (url: string): Promise<NewsAPIResponse> => {
  const response = await fetch(url, { method: 'GET' }).catch((e) => ({}));
  const payload = await handleJsonResponse<NewsAPIResponse>(response);

  if (payload.status === 'error') {
    devLog(payload.message, payload.code);
  }

  return payload;
};
