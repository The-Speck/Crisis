import { AppLoading } from 'expo';
import * as React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Home from '../scenes/home';

const Routes = (): JSX.Element => {
  const [isReady, setReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => setReady(true), 1000);
  }, []);

  const navTitleStyle = {
    fontSize: 15,
    fontFamily: 'HelveticaNeue-Medium',
    color: '#1E1611',
    letterSpacing: 0.4,
  };

  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <Router>
      <Stack key="root" navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={navTitleStyle}>
        <Scene key="Home" component={Home} title="Headlines" initial />
      </Stack>
    </Router>
  );
};

export default Routes;
