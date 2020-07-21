import { AsyncStorage } from 'react-native';
import { AUTH_REFRESH_API_URL, GET_USER_URL, LOGIN_API_URL } from '../config';
import { ApiResponse, AuthTokens, Credentials, User } from '../models';
import { handleJsonResponse, ResponseStatus } from '../utils';
import { fetchApi, HttpMethods } from './apiWrapper';

const setTokens = async (response: Response): Promise<ApiResponse<AuthTokens>> => {
  const handledResponse = await handleJsonResponse<AuthTokens>(response);

  if (handledResponse.status === ResponseStatus.OK) {
    const tokens = handledResponse.data;
    AsyncStorage.setItem('access_token', tokens.access);
    AsyncStorage.setItem('refresh_token', tokens.refresh);
  }

  return handledResponse;
};

export const refreshTokenApi = async (): Promise<ApiResponse<AuthTokens>> => {
  const refresh = await AsyncStorage.getItem('refresh_token');
  const response = await fetch(AUTH_REFRESH_API_URL, {
    method: HttpMethods.POST,
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ refresh }),
  });

  return setTokens(response);
};

export const obtainTokenApi = async ({
  email,
  password,
}: Credentials): Promise<ApiResponse<AuthTokens>> => {
  const response = await fetch(LOGIN_API_URL, {
    method: HttpMethods.POST,
    body: JSON.stringify({ email, password }),
  });

  return setTokens(response);
};

export const fetchUserApi = async (): Promise<ApiResponse<User>> => {
  const refreshTokenResponse = await fetchApi(GET_USER_URL, { method: 'GET' });
  return handleJsonResponse<User>(refreshTokenResponse);
};
