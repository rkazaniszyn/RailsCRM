import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import createLogger from 'redux-logger';
import Immutable from 'immutable';

export default props => {

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  let middlewares = [thunkMiddleware];
  if (process.env.NODE_ENV == 'development') {
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
    middlewares.push(logger)
  }
  const middleware = applyMiddleware(...middlewares);
  const store = createStore(reducer, middleware);
  return store;
};