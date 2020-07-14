import { NewsActionType } from '../../actions';
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
    case NewsActionType.RETRIEVING_TOP_HEADLINES: {
      return { ...state, isAuthenticating: true };
    }
    case NewsActionType.RECEIVE_TOP_HEADLINES: {
      return { ...state, isAuthenticating: false, hasError: false };
    }
    case NewsActionType.ERROR_TOP_HEADLINES: {
      const { error } = action;
      return { ...state, isAuthenticating: false, hasError: true, errorMsg: error };
    }

    default:
      return state;
  }
};

export default authReducer;
