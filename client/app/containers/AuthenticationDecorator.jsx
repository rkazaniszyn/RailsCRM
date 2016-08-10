import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login';

export default (ChildComponent) => {
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            user: PropTypes.object.isRequired
        };
        static contextTypes = {
            router: PropTypes.object.isRequired
        };
        componentWillMount() {
            const { router } = this.context;
            if (!this.props.user.isAuthenticated) {
                router.push('/login');
            }
        }
        render () {
            //user.isLoggedIn
            return (<ChildComponent {...this.props} />)
        }
    }

    function select(state) {
        return {user:state.user.toJS()}
    }

    return connect(select)(AuthenticatedComponent)
}