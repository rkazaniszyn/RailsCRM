import React, { PropTypes } from 'react'

export default class Login extends React.Component {
    componentDidMount() {
        document.body.classList.add('signin')
    }
    componentWillUnmount() {
        document.body.classList.remove('signin')
    }
    render() {
        return (
            <div className="container">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" ref="email" className="form-control" placeholder="Email address" required autofocus />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <button onClick={(event) => this.handleClick(event)} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        )
    }

    handleClick(event) {
        const email = this.refs.email
        const password = this.refs.password
        const creds = { email: email.value.trim(), password: password.value.trim() }
        this.props.onLoginClick(creds)
    }
}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
}