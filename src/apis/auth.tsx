import { AsyncStorage } from 'react-native';
import { AUTH_REFRESH_API_URL } from '../config';
import { ApiResponse, Article, NewsOptions, User } from '../models';
import { handleJsonResponse } from '../utils';
import { fetchApi } from './apiWrapper';

interface AuthTokens {
  access: string;
  refresh: string;
}

export const refreshTokenApi = async (): Promise<AuthTokens | null> => {
  const refresh = await AsyncStorage.getItem('refresh_token');

  return fetch(AUTH_REFRESH_API_URL, {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  }).then(async (response: Response) => {
    if (response.ok) {
      const tokens = await response.json();
      AsyncStorage.setItem('access_token', tokens.access);
      AsyncStorage.setItem('refresh_token', tokens.refresh);

      return tokens;
    }

    return null;
  });
};

export const obtainTokenApi = () => {};

export const fetchUserApi = async (
  url: string,
  options: NewsOptions,
): Promise<ApiResponse<User>> => {
  const tokens = await refreshTokenApi();

  if (tokens) {
    const response = await fetchApi(url, { method: 'POST', body: JSON.stringify(options) });

    return handleJsonResponse<Article[]>(response);
  } else {
    return null;
  }
};
