import { NewsAPIResponse } from '../models';
import { handleResponse } from '../utils';

export const fetchTopNewsHeadlines = async (url: string): Promise<Response> => {
  const response = await fetch(url, { method: 'GET' });
  return handleResponse<NewsAPIResponse>(response);
};

// .then((response) => response.json())
// .catch();

export const fetchEveryNews = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
  });
