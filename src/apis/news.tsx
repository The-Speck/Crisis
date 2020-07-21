import { TOP_NEWS_API_URL } from '../config';
import { ApiResponse, Article, NewsOptions } from '../models';
import { handleJsonResponse } from '../utils';
import { fetchApi, HttpMethods } from './apiWrapper';

export const fetchTopNewsHeadlinesApi = async (
  options: NewsOptions,
): Promise<ApiResponse<Article[]>> => {
  const response = await fetchApi(TOP_NEWS_API_URL, {
    method: HttpMethods.POST,
    body: JSON.stringify(options),
  });

  return handleJsonResponse<Article[]>(response);
};
