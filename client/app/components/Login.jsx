import React, { PropTypes } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Spinner } from 'react-redux-spinner';

export default class Login extends React.Component {
    static propTypes = {
        onLoginClick: PropTypes.func.isRequired,
    }
    componentDidMount() {
        document.body.classList.add('signin')
    }
    componentWillUnmount() {
        document.body.classList.remove('signin')
    }
    render() {
        return (
            <div className="container">
                <Spinner />
                <ReduxToastr
                    timeOut={2000}
                    newestOnTop={false}
                    position="top-right"/>
                <form onSubmit={(event) => this.handleClick(event)} className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" ref="email" className="form-control" placeholder="Email address" required />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        )
    }

    handleClick(event) {
        event.preventDefault();
        const email = this.refs.email
        const password = this.refs.password
        const creds = { email: email.value.trim(), password: password.value.trim() }
        this.props.onLoginClick(creds)
    }
}