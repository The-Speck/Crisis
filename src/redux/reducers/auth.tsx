import { AuthActions, AuthActionType } from '../../actions';
import { User } from '../../models/auth';

const initialState = {
  user: null,
  isAuthenticating: true,
  hasError: false,
  errorMsg: '',
};

export interface AuthState {
  user: User | null;
  isAuthenticating: boolean;
  hasError: boolean;
  errorMsg: string;
}

const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionType.RETRIEVING_USER: {
      return { ...state, isAuthenticating: true };
    }
    case AuthActionType.RECEIVE_USER: {
      return { ...state, isAuthenticating: false, hasError: false };
    }
    case AuthActionType.ERROR_USER: {
      const { error } = action;
      return { ...state, isAuthenticating: false, hasError: true, errorMsg: error };
    }

    default:
      return state;
  }
};

export default authReducer;
