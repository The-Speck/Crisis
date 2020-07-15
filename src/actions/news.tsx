import { Action } from 'redux';
import { DispatchableAction } from '.';
import { fetchTopNewsHeadlinesApi } from '../apis';
import { TOP_NEWS_API_URL } from '../config';
import { Article, TopNewsOptions } from '../models';
import { ResponseStatus } from '../utils';

export enum NewsActionType {
  RETRIEVING_TOP_HEADLINES = 'RETRIEVING_TOP_HEADLINES',
  RECEIVE_TOP_HEADLINES = 'RECEIVE_TOP_HEADLINES',
  ERROR_TOP_HEADLINES = 'ERROR_TOP_HEADLINES',
}

const defaultOptions: TopNewsOptions = { country: 'us' };

export const getTopNewsHeadlines = (
  options = defaultOptions,
): DispatchableAction<NewsActions, true> => async (dispatch): Promise<NewsActions> => {
  await dispatch({
    type: NewsActionType.RETRIEVING_TOP_HEADLINES,
  });

  const response = await fetchTopNewsHeadlinesApi(TOP_NEWS_API_URL, options);

  if (response.status === ResponseStatus.OK) {
    return dispatch({
      type: NewsActionType.RECEIVE_TOP_HEADLINES,
      headlines: response.data,
    });
  } else {
    return dispatch({
      type: NewsActionType.ERROR_TOP_HEADLINES,
      error: response.error,
    });
  }
};

export type RetrievingTopNewsAction = Action<typeof NewsActionType.RETRIEVING_TOP_HEADLINES>;
export interface ReceiveTopNewsAction extends Action<typeof NewsActionType.RECEIVE_TOP_HEADLINES> {
  headlines: Article[];
}
export interface ErrorTopNewsAction extends Action<typeof NewsActionType.ERROR_TOP_HEADLINES> {
  error: string;
}
export type NewsActions = ReceiveTopNewsAction | ErrorTopNewsAction | RetrievingTopNewsAction;
