import React, { PropTypes } from 'react';
import Login from '../components/Login';
import * as ActionCreators from '../actions/ActionCreators';
import { connect } from 'react-redux';

class LoginContainer extends React.Component
{
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    componentWillMount()
    {
        const { router } = this.context;
        if (this.props.user.isAuthenticated) {
            router.push('/');
        }
    }
    componentWillReceiveProps(newProps) {
        const { router } = this.context;
        if (newProps.user.isAuthenticated) {
            router.push('/');
        }
    }
    render() {
        const { dispatch } = this.props;
        return (<Login onLoginClick={ creds => dispatch(ActionCreators.loginUser(creds)) }/>)
    }
}
function select(state) {
    return {user:state.user.toJS()}
}
export default connect(select)(LoginContainer);