import { NewsActions, NewsActionType } from '../../actions';
import { Article } from '../../models';

const initialState = {
  isFetching: true,
  articles: [],
  hasError: false,
  errorMsg: 'Error Retreiving News',
};

export interface NewsState {
  articles: Article[];
  isFetching: boolean;
  hasError: boolean;
  errorMsg?: string;
}

const newsReducer = (state: NewsState = initialState, action: NewsActions): NewsState => {
  switch (action.type) {
    case NewsActionType.RETRIEVING_TOP_HEADLINES: {
      return { ...state, isFetching: true };
    }
    case NewsActionType.RECEIVE_TOP_HEADLINES: {
      return { ...state, isFetching: false, hasError: false };
    }
    case NewsActionType.ERROR_TOP_HEADLINES: {
      const { error } = action;
      return { ...state, isFetching: false, hasError: true, errorMsg: error };
    }

    default:
      return state;
  }
};

export default newsReducer;
