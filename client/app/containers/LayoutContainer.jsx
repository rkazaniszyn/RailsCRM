import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/ActionCreators';

function select(state) {
    return {
        ui: state.ui.toJS(),
        metadata: state.metadata.toJS()
    }
}

class LayoutContainer extends React.Component {

    static propTypes = {
        ui: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        metadata: React.PropTypes.object.isRequired,
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(ActionCreators.fetchMetadata());
    }
    componentWillReceiveProps(newProps) {
        if (this.props.ui.errorPage !== newProps.ui.errorPage && newProps.ui.errorPage == 1) {
            this.context.router.push('/error')
        }
    }
    render() {
        const { user, children, ui, metadata } = this.props;
        //bind logoutUser with dispatch so that child components are not aware of redux
        const logoutUser = bindActionCreators(ActionCreators.logoutUser, this.props.dispatch);
        return (<Layout {...{ user, children, ui, logoutUser, metadata}}/>);
    }
};

export default connect(select)(LayoutContainer);