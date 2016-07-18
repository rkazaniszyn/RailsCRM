import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import createStore from '../store/Store';

import RouterLayout from '../components/RouterLayout';
import RouterFirstPage from '../components/RouterFirstPage';
import RouterSecondPage from '../components/RouterSecondPage';
import HelloWorld from '../containers/HelloWorld';
import Records from '../containers/Records';

const App = (props, _railsContext) => {
  const store = createStore(props);
  const history = syncHistoryWithStore(browserHistory, store);
  const reactComponent = (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={RouterLayout}>
          <Route path="first_page" component={RouterFirstPage} />
          <Route path="second_page" component={RouterSecondPage} />
          <Route path="hello_world" component={HelloWorld} />
          <Route path="records" component={Records} />
         </Route>
      </Router>
    </Provider>
  );
  return reactComponent;
};

ReactOnRails.register({ App });