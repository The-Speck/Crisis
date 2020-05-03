import { NewsAPIResponse } from '../models';
import { devLog, handleJsonResponse } from '../utils';

export const fetchTopNewsHeadlines = async (url: string): Promise<NewsAPIResponse> => {
  const response = await fetch(url, { method: 'GET' });
  const payload = await handleJsonResponse<NewsAPIResponse>(response);

  if (payload.status === 'error') {
    devLog(payload.message, payload.code);
  }

  return payload;
};
