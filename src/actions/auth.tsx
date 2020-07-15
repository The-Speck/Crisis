import { Action } from 'redux';
import { DispatchableAction } from '.';
import { LOGIN_API_URL } from '../config';
import { User } from '../models';
import { ResponseStatus } from '../utils';

export enum AuthActionType {
  RETRIEVING_USER = 'RETRIEVING_USER',
  RECEIVE_USER = 'RECEIVE_USER',
  ERROR_USER = 'ERROR_USER',
}

interface Credentials {
  email: string;
  password: string;
}

export const fetchUser = (
  credentials: Credentials,
): DispatchableAction<AuthActions, true> => async (dispatch): Promise<AuthActions> => {
  dispatch({
    type: AuthActionType.RETRIEVING_USER,
  });

  const response = await fetchUserApi(LOGIN_API_URL, credentials);

  if (response.status === ResponseStatus.OK) {
    return dispatch({
      type: AuthActionType.RECEIVE_USER,
      user: response.data,
    });
  } else {
    return dispatch({
      type: AuthActionType.ERROR_USER,
      error: response.error,
    });
  }
};

export type RetrievingUserAction = Action<typeof AuthActionType.RETRIEVING_USER>;
export interface ReceiveUserAction extends Action<typeof AuthActionType.RECEIVE_USER> {
  user: User;
}
export interface ErrorAuthAction extends Action<typeof AuthActionType.ERROR_USER> {
  error: string;
}
export type AuthActions = RetrievingUserAction | ReceiveUserAction | ErrorAuthAction;
