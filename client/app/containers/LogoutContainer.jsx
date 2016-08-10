import React, { PropTypes } from 'react';
import Logout from '../components/Logout';
import * as ActionCreators from '../actions/ActionCreators';
import { connect } from 'react-redux';

class LogoutContainer extends React.Component
{
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    componentWillReceiveProps(newProps) {
        const { router } = this.context;
        if (newProps.user.isAuthenticated == false) {
            router.push('/login');
        }
    }
    render() {
        const { dispatch } = this.props;
        return (<Logout errorMessage=""
                       onLogoutClick={ creds => dispatch(ActionCreators.logoutUser()) }/>)
    }
}
function select(state) {
    return {user:state.user.toJS()}
}
export default connect(select)(LogoutContainer);