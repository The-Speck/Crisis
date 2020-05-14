import * as React from 'react';
import { Provider } from 'react-redux';
import Router from './src/pages/routes';
import store from './src/redux/store';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
