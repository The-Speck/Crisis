import { ResponseException } from '../errors';
import { NewsAPIResponse } from '../models';
import { devLog, handleResponse } from '../utils';

export const fetchTopNewsHeadlines = async (url: string): Promise<NewsAPIResponse> => {
  const response = await fetch(url, { method: 'GET' });
  const payload = await handleResponse<NewsAPIResponse>(response);

  if (payload.status === 'ok') {
    return payload;
  } else {
    devLog(payload.message, payload.code);
    throw new ResponseException('Error retrieving news');
  }
};
