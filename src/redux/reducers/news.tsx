import { ERROR_TOP_HEADLINES, NewsActions, RECEIVE_TOP_HEADLINES } from '../../actions';
import { Article } from '../../models';

const initialState = { isFetching: true, articles: [], hasError: false, errorMsg: 'Error Retreiving News' };

export interface NewsState {
  articles: Article[];
  isFetching: boolean;
  hasError: boolean;
  errorMsg?: string;
}

const newsReducer = (state: NewsState = initialState, action: NewsActions): NewsState => {
  switch (action.type) {
    case RECEIVE_TOP_HEADLINES: {
      const isFetching = state.articles.length > 0 ? false : true;

      return { ...state, isFetching, hasError: false };
    }
    case ERROR_TOP_HEADLINES: {
      return { ...state, isFetching: false, hasError: true, errorMsg: 'Error Retreiving News' };
    }

    default:
      return state;
  }
};

export default newsReducer;
