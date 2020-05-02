import { Article } from './article';

export type NewsAPIResponse = NewsAPIResponseOK | NewsAPIResponseError;

export interface NewsAPIResponseOK extends NewsAPIResponseStatus {
  totalResults: number;
  article: Article[];
}

export interface NewsAPIResponseError extends NewsAPIResponseStatus {
  code: string;
  message: string;
}

export interface NewsAPIResponseStatus {
  status: 'ok' | 'error';
}
