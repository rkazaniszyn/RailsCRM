
import React from 'react';
import { Link } from 'react-router';

const RouterLayout = (props) => {
    const { children } = props;
    var loader = '';
    if (props.ui.ajax.isFetching) {
        loader = <div>Loading...</div>;
    }
    return (
    <div className="container">
        <form method="POST" action="/api/v1/auth_user">
            <input type="text" name="email"/><br/>
            <input type="password" name="password"/><br/>
            <input type="password" name="confirm_password"/><br/>
            <input type="submit" value="Submit"/>
        </form>
        {loader}
        <h1>Router dziala!</h1>
        <p>
            siema siema!
        </p>
        <ul>
            <li>
                <Link to="/">
                    Layout
                </Link>
            </li>
            <li>
                <Link to="/first_page">
                    Router First Page
                </Link>
            </li>
            <li>
                <Link to="/second_page">
                    Router Second Page
                </Link>
            </li>
            <li>
                <Link to="/hello_world">
                    Hello world
                </Link>
            </li>
            <li>
                <Link to="/modules/Contacts">
                    Records
                </Link>
            </li>
        </ul>
        <hr />
        {children}
    </div>);
};

RouterLayout.propTypes = {
    children: React.PropTypes.object,
};

export default RouterLayout;