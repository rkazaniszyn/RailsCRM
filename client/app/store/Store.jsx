import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import api from '../middleware/api';

export default props => {

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  if (process.env.NODE_ENV == 'development' && false) {
    //debugging tools
    const logger = createLogger({
      stateTransformer: (state) => {
        let newState = {};
        //transform state from immutable to js arrays/objects
        for (var i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
          } else {
            newState[i] = state[i];
          }
        }
        ;

        return newState;
      }
    });
    var middleware = compose(
        applyMiddleware(thunkMiddleware, logger, api),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  } else {
    var middleware = applyMiddleware(thunkMiddleware, api);
  }

  const store = createStore(reducer, middleware);
  return store;
};