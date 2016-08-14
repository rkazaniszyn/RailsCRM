import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/ActionCreators';

function select(state) {

    return {
        ui: state.ui.toJS(),
    }
}

class LayoutContainer extends React.Component {
    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
    };
    render() {
        const { user, children, ui } = this.props;
        //bind logoutUser with dispatch so that child components are not aware of redux
        const logoutUser = bindActionCreators(ActionCreators.logoutUser, this.props.dispatch);
        return (<Layout {...{ user, children, ui, logoutUser}}/>);
    }
};

export default connect(select)(LayoutContainer);