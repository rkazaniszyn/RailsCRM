import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import createStore from '../store/Store';

import LayoutContainer from '../containers/LayoutContainer';
import RouterFirstPage from '../components/RouterFirstPage';
import RouterSecondPage from '../components/RouterSecondPage';
import HelloWorld from '../containers/HelloWorld';
import RecordsContainer from '../containers/RecordsContainer';
import RecordViewContainer from '../containers/RecordViewContainer';
import AuthenticationDecorator from '../containers/AuthenticationDecorator';
import ModuleContainer from '../containers/ModuleContainer';
import LoginContainer from '../containers/LoginContainer';

const App = (props, _railsContext) => {
  const store = createStore(props);
  const history = syncHistoryWithStore(browserHistory, store);
  const reactComponent = (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AuthenticationDecorator(LayoutContainer)}>
          <Route path="first_page" component={RouterFirstPage} />
          <Route path="second_page" component={RouterSecondPage} />
          <Route path="hello_world" component={HelloWorld} />
          <Route path="modules" component={ModuleContainer}>
              <Route path=":module" component={RecordsContainer} />
                <Route path=":module/:id" component={RecordViewContainer}/>
          </Route>
         </Route>
        <Route path="/login" component={LoginContainer}/>
      </Router>
    </Provider>
  );
  return reactComponent;
};

ReactOnRails.register({ App });