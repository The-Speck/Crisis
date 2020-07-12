import { ApiResponse, Article, NewsOptions } from '../models';
import { handleJsonResponse } from '../utils';
import { fetchApi } from './apiWrapper';

export const fetchTopNewsHeadlines = async (
  url: string,
  options: NewsOptions,
): Promise<ApiResponse<Article[]>> => {
  const response = await fetchApi(url, { method: 'POST', body: JSON.stringify(options) });

  return handleJsonResponse<Article[]>(response);
};
