import { Dispatch } from 'redux';
import { fetchTopNewsHeadlines } from '../apis';
import { NEWS_API_URL } from '../config';
import { TopNewsOptions } from '../models';
import { createNewsQuery } from '../utils';

export const RECIEVE_TOP_HEADLINES = 'RECIEVE_TOP_HEADLINES';

const defaultOptions: TopNewsOptions = { country: 'us' };

export const getTopNewsHeadlines = (options = defaultOptions) => async (dispatch: Dispatch): Promise<void> => {
  const queryUrl = createNewsQuery(options);
  const url = `${NEWS_API_URL}?${queryUrl}`;
  const headlines = await fetchTopNewsHeadlines(url);

  dispatch({
    type: RECIEVE_TOP_HEADLINES,
    headlines,
  });
};
