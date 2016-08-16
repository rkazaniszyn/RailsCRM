import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import createStore from '../store/Store';
import LayoutContainer from '../containers/LayoutContainer';
import RouterFirstPage from '../components/RouterFirstPage';
import RouterSecondPage from '../components/RouterSecondPage';
import Dashboard from '../containers/DashboardContainer';
import ListViewContainer from '../containers/ListViewContainer';
import RecordViewContainer from '../containers/RecordViewContainer';
import AuthenticationDecorator from '../containers/AuthenticationDecorator';
import ModuleContainer from '../containers/ModuleContainer';
import LoginContainer from '../containers/LoginContainer';
import NotFoundRoute from '../components/NotFoundRoute';
import ErrorPageContainer from '../containers/ErrorPageContainer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = (props, _railsContext) => {
  const store = createStore(props);
  const history = syncHistoryWithStore(browserHistory, store);
  const reactComponent = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AuthenticationDecorator(LayoutContainer)}>
            <IndexRoute component={Dashboard} />
            <Route path="first_page" component={RouterFirstPage} />
            <Route path="second_page" component={RouterSecondPage} />
            <Route path="modules">
                <Route path=":module" component={ModuleContainer}>
                    <IndexRoute component={ListViewContainer} />
                    <Route path="add" component={RecordViewContainer}/>
                    <Route path=":id(/:mode)" component={RecordViewContainer}/>
                </Route>
            </Route>
            <Route path="/error" component={ErrorPageContainer}/>
           </Route>
          <Route path="/login" component={LoginContainer}/>
          <Route path="*" component={NotFoundRoute} />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
  return reactComponent;
};

ReactOnRails.register({ App });