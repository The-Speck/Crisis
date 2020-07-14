import { Action } from 'redux';
import { DispatchableAction } from '.';
import { ResponseStatus } from '../utils';

export enum AuthActionType {
  RETRIEVING_USER = 'RETRIEVING_USER',
  RECEIVE_USER = 'RECEIVE_USER',
  ERROR_USER = 'ERROR_USER',
}

export const getUser = (options = defaultOptions): DispatchableAction<AuthActions, true> => async (
  dispatch,
): Promise<AuthActions> => {
  await dispatch({
    type: AuthActionType.RETRIEVING_TOP_HEADLINES,
  });

  const response = await AuthHeadlines(Auth_API_URL, options);

  if (response.status === ResponseStatus.OK) {
    return dispatch({
      type: AuthActionType.RECEIVE_TOP_HEADLINES,
      headlines: response.data,
    });
  } else {
    return dispatch({
      type: AuthActionType.ERROR_TOP_HEADLINES,
      error: response.error,
    });
  }
};

export type AuthAction = Action<typeof AuthActionType.RETRIEVING_TOP_HEADLINES>;
export interface AuthAction extends Action<typeof AuthActionType.RECEIVE_TOP_HEADLINES> {
  headlines: Article[];
}
export interface AuthAction extends Action<typeof AuthActionType.ERROR_TOP_HEADLINES> {
  error: string;
}
export type AuthActions = AuthAction | AuthAction | AuthAction;
