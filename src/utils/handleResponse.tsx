import { ResponseException } from '../errors';
import { devLog } from './devLog';

export const handleResponse = async function <T>(response: Response): Promise<T> {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else if (process.env.NODE_ENV === 'development') {
    devLog(response.status, response.statusText);
  }

  throw new ResponseException('Connection error!');
};
