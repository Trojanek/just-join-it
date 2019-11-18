import React from 'react';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './state/store';
import AppContainer from './AppContainer';

const App = () => (
  <>
    <CssBaseline />
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </>
);

export default App;
