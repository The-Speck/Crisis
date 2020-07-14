import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../redux/root';
import Auth from '../scenes/auth';
import { not } from '../utils';

export type RouteProps = PropsFromRedux;

const Routes = (props: RouteProps): React.ReactElement<RouteProps> => {
  const { isAuthenticating, user } = props;
  const [isReady, setReady] = React.useState<boolean>(false);
  const Stack = createStackNavigator();

  React.useEffect(() => {
    setTimeout(() => setReady(true), 1000);
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  if (not(isAuthenticating) && not(user)) {
    return <Auth />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>{/* <Stack.Screen name="Home" component={Home} /> */}</Stack.Navigator>
    </NavigationContainer>
  );
};

interface MapStateToProps {
  user: RootState['auth']['user'];
  isAuthenticating: RootState['auth']['isAuthenticating'];
}
const msp = (state: RootState): MapStateToProps => ({
  user: state.auth.user,
  isAuthenticating: state.auth.isAuthenticating,
});

interface MapDispatchToProps {
  getTopNewsHeadlines: () => Promise<AuthActions>;
}
const mdp = (dispatch: ThunkDispatch<RootState, null, AuthActions>): MapDispatchToProps => ({
  getUser: (): Promise<AuthActions> => dispatch(Actions.getUser()),
});

const connector = connect(msp, mdp);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Routes);
