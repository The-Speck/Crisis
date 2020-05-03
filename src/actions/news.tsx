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
  dispatch({
    type: RETRIEVING_TOP_HEADLINES,
  });

  const queryUrl = createNewsQuery(options);
  const url = `${NEWS_API_URL}?${queryUrl}`;
  const headlines = await fetchTopNewsHeadlines(url);

  if (headlines.status === 'ok') {
    dispatch({
      type: RECEIVE_TOP_HEADLINES,
      headlines,
    });
  } else {
    dispatch({
      type: ERROR_TOP_HEADLINES,
    });
  }
};

export interface RetrievingTopNewsAction {
  type: typeof RECEIVE_TOP_HEADLINES;
}

export interface ReceiveTopNewsAction {
  type: typeof RECEIVE_TOP_HEADLINES;
  headlines: NewsAPIResponseOK;
}

export interface ErrorTopNewsAction {
  type: typeof ERROR_TOP_HEADLINES;
}

export type NewsActions = ReceiveTopNewsAction | ErrorTopNewsAction | RetrievingTopNewsAction;
