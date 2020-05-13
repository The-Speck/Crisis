import { Action } from 'redux';
import { DispatchableAction } from '.';
import { fetchTopNewsHeadlines } from '../apis';
import { NEWS_API_URL } from '../config';
import { NewsAPIResponseOK, TopNewsOptions } from '../models';
import { createNewsQuery } from '../utils';

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

  const queryUrl = createNewsQuery(options);
  const url = `${NEWS_API_URL}?${queryUrl}`;
  const response = await fetchTopNewsHeadlines(url);

  if (response.status === 'ok') {
    return dispatch({
      type: NewsActionType.RECEIVE_TOP_HEADLINES,
      headlines: response,
    });
  } else {
    return dispatch({
      type: NewsActionType.ERROR_TOP_HEADLINES,
      error: response,
    });
  }
};

export type RetrievingTopNewsAction = Action<typeof NewsActionType.RETRIEVING_TOP_HEADLINES>;
export interface ReceiveTopNewsAction extends Action<typeof NewsActionType.RECEIVE_TOP_HEADLINES> {
  headlines: NewsAPIResponseOK;
}
export interface ErrorTopNewsAction extends Action<typeof NewsActionType.ERROR_TOP_HEADLINES> {
  error: any;
}
export type NewsActions = ReceiveTopNewsAction | ErrorTopNewsAction | RetrievingTopNewsAction;
