import { devLog } from '../utils';

export const fetchApi = (input: RequestInfo, init?: RequestInit): Promise<Response> =>
  fetch(input, init).catch((error) => {
    devLog(error);

    return {
      status: 503,
      statusText: 'Unable to connect, please try again later.',
    } as Response;
  });
