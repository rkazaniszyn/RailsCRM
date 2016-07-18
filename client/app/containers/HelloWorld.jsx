import React, { PropTypes } from 'react';
import HelloWorldWidget from '../components/HelloWorldWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as ActionCreators from '../actions/ActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return { name: state.name };
}

// Simple example of a React "smart" component
const HelloWorld = (props) => {
  const { dispatch, name } = props;
  const actions = bindActionCreators(ActionCreators, dispatch);
  const { updateName } = actions;

  // This uses the ES2015 spread operator to pass properties as it is more DRY
  // This is equivalent to:
  // <HelloWorldWidget $$helloWorldStore={$$helloWorldStore} actions={actions} />
  return (
    <HelloWorldWidget {...{ updateName, name }} />
  );
};

HelloWorld.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(HelloWorld);
