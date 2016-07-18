
import React from 'react';
import { Link } from 'react-router';

const RouterLayout = ({ children }) => (
    <div className="container">
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
                <Link to="/records">
                    Records
                </Link>
            </li>
        </ul>
        <hr />
        {children}
    </div>
);

RouterLayout.propTypes = {
    children: React.PropTypes.object,
};

export default RouterLayout;