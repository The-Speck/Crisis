import merge from 'lodash/merge';
import { AsyncStorage } from 'react-native';
import { refreshTokenApi } from '.';
import { devLog } from '../utils';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const createOptions = async (init: RequestInit = {}): Promise<Partial<RequestInit>> => {
  const access = await AsyncStorage.getItem('access_token');
  return merge({}, init, { headers: { Authorization: `JWT ${access}` } });
};

export const fetchApi = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const tokens = await refreshTokenApi();
  const options = await createOptions(init);

  if (tokens) {
    return fetch(input, options).catch((error) => {
      devLog(error);

      return {
        status: 503,
        statusText: 'Unable to connect, please try again later.',
      } as Response;
    });
  }

  return {
    status: 401,
    statusText: 'Please log in',
  } as Response;
};
