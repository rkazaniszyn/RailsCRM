import React from 'react';
import { connect } from 'react-redux';
import RouterLayout from '../components/RouterLayout';
function select(state) {

    return {ui: state.ui}
}

class LayoutContainer extends React.Component {
    render() {
        const { user, children } = this.props;
        return (<RouterLayout ui={this.props.ui.toJS()} {...{ user, children }}/>);
    }
};

export default connect(select)(LayoutContainer);