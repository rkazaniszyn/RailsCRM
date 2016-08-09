import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login';

export default (ChildComponent) => {
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            user: PropTypes.object.isRequired
        };

        render () {
            const { user } = this.props;
            //user.isLoggedIn
            return (true ? <ChildComponent {...this.props} /> : <Login />)
        }
    }

    function select(state) {
        return {user:state.user.toJS()}
    }

    return connect(select)(AuthenticatedComponent)
}