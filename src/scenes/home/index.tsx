import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Actions from '../../actions';
import { NewsActions } from '../../actions';
import NewsItem from '../../components/NewsItem';
import { Article } from '../../models';
import { RootState } from '../../redux/root';

export type HomeProps = PropsFromRedux;

const Home = (props: HomeProps): React.ReactElement<HomeProps> => {
  const { articles, isFetching, hasError, errorMsg, getTopNewsHeadlines } = props;
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  React.useEffect(() => {
    getTopNewsHeadlines();
  }, []);

  const getNewsHeadlines = (): void => {
    setRefreshing(true);
    getTopNewsHeadlines().finally(() => setRefreshing(false));
  };

  const renderItem = ({ item, index }: { index: number; item: Article }): React.ReactElement => (
    <NewsItem key={index} article={item} />
  );

  if (isFetching) {
    return <ActivityIndicator />;
  } else {
    return (
      <FlatList
        style={{ backgroundColor: '#eaeaea' }}
        contentContainerStyle={{ paddingVertical: 5 }}
        data={articles}
        extraData={{}}
        renderItem={renderItem}
        initialNumToRender={5}
        keyExtractor={(_, index): string => index.toString() + '_home'}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={getNewsHeadlines} />}
      />
    );
  }
};

interface MapStateToProps {
  isFetching: RootState['news']['isFetching'];
  hasError: RootState['news']['hasError'];
  errorMsg: RootState['news']['errorMsg'];
  articles: RootState['news']['articles'];
}
const msp = (state: RootState): MapStateToProps => ({
  isFetching: state.news.isFetching,
  hasError: state.news.hasError,
  errorMsg: state.news.errorMsg,
  articles: state.news.articles,
});

interface MapDispatchToProps {
  getTopNewsHeadlines: () => Promise<NewsActions>;
}
const mdp = (dispatch: ThunkDispatch<RootState, null, NewsActions>): MapDispatchToProps => ({
  getTopNewsHeadlines: (): Promise<NewsActions> => dispatch(Actions.getTopNewsHeadlines()),
});

const connector = connect(msp, mdp);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Home);
