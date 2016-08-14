import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentUser } from '../actions/ActionCreators';

export default (ChildComponent) => {
    class AuthenticationDecorator extends React.Component {
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
        componentWillReceiveProps(newProps)
        {
            const { router } = this.context;
            if (newProps.user.isAuthenticated == false) {
                router.push('/login');
            }
        }
        componentDidMount() {
            this.props.dispatch(fetchCurrentUser());
        }
        render () {
            //user.isLoggedIn
            return (<ChildComponent {...this.props} />)
        }
    }

    function select(state) {
        return {user: state.user.toJS()}
    }

    return connect(select)(AuthenticationDecorator)
}