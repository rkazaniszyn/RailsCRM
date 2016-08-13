import React from 'react';
import { Link } from 'react-router';
import LogoutContainer from '../containers/LogoutContainer';
import ReduxToastr from 'react-redux-toastr';
import { Spinner } from 'react-redux-spinner';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const RouterLayout = (props) => {
    const { children } = props;
    return (

            <div className="container">
                <Spinner />
                <ReduxToastr
                    timeOut={2000}
                    newestOnTop={false}
                    position="top-left"/>
                <h1>Some Header</h1>
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
            </div>
    );
};

RouterLayout.propTypes = {
    children: React.PropTypes.object,
};

export default RouterLayout;