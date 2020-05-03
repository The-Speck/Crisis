import { Article } from './article';

export type NewsAPIResponse = NewsAPIResponseOK | NewsAPIResponseError;

export interface NewsAPIResponseOK {
  status: 'ok';
  totalResults: number;
  articles: Article[];
}

export interface NewsAPIResponseError {
  status: 'error';
  code: string;
  message: string;
}
