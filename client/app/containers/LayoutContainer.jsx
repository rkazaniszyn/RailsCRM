import React from 'react';
import { connect } from 'react-redux';
import RouterLayout from '../components/RouterLayout';
import * as ActionCreators from '../actions/ActionCreators';
function select(state) {

    return {ui: state.ui}
}

class LayoutContainer extends React.Component {
    componentDidMount()
    {
        alert('asd');
    }
    render() {
        return (<RouterLayout ui={this.props.ui.toJS()} children={this.props.children}/>);
    }
};

export default connect(select)(LayoutContainer);