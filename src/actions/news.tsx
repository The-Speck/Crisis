import { Dispatch } from 'redux';
import { fetchTopNewsHeadlines } from '../apis';
import { NEWS_API_URL } from '../config';
import { NewsAPIResponseOK, TopNewsOptions } from '../models';
import { createNewsQuery } from '../utils';

export const RETRIEVING_TOP_HEADLINES = 'RETRIEVING_TOP_HEADLINES';
export const RECEIVE_TOP_HEADLINES = 'RECEIVE_TOP_HEADLINES';
export const ERROR_TOP_HEADLINES = 'ERROR_TOP_HEADLINES';

const defaultOptions: TopNewsOptions = { country: 'us' };

export const getTopNewsHeadlines = (options = defaultOptions) => async (dispatch: Dispatch): Promise<void> => {
  await dispatch({
    type: RETRIEVING_TOP_HEADLINES,
  });

  const queryUrl = createNewsQuery(options);
  const url = `${NEWS_API_URL}?${queryUrl}`;
  const response = await fetchTopNewsHeadlines(url);

  if (response.status === 'ok') {
    dispatch({
      type: RECEIVE_TOP_HEADLINES,
      headlines: response,
    });
  } else {
    dispatch({
      type: ERROR_TOP_HEADLINES,
      error: response,
    });
  }
};

export interface RetrievingTopNewsAction {
  type: typeof RETRIEVING_TOP_HEADLINES;
}

export interface ReceiveTopNewsAction {
  type: typeof RECEIVE_TOP_HEADLINES;
  headlines: NewsAPIResponseOK;
}

export interface ErrorTopNewsAction {
  type: typeof ERROR_TOP_HEADLINES;
  error: any;
}

export type NewsActions = ReceiveTopNewsAction | ErrorTopNewsAction | RetrievingTopNewsAction;
