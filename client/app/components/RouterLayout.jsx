
import React from 'react';
import { Link } from 'react-router';
import LogoutContainer from '../containers/LogoutContainer';

const RouterLayout = (props) => {
    const { children } = props;
    var loader = '';
    if (props.ui.ajax.isFetching) {
        loader = <div>Loading...</div>;
    }
    return (
    <div className="container">
        {loader}
        <h1>Naglowek</h1>
        <LogoutContainer />
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