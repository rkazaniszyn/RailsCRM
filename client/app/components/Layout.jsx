import React from 'react';
import { Link } from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import { Spinner } from 'react-redux-spinner';
import HeaderToolbar from './HeaderToolbar';
import MenuDrawer from './MenuDrawer';

class Layout extends React.Component {
    render() {
        const { children, metadata } = this.props;
        return (
            <div>
                <Spinner />
                <ReduxToastr
                    timeOut={2000}
                    newestOnTop={false}
                    position="top-right"/>

                <div style={{paddingLeft: '256px'}}>
                    <HeaderToolbar {...this.props} />
                    <div style={{paddingTop: "64px", minHeight: '400px'}}>
                        <div style={{margin: '48px 72px'}}>
                            {children}
                        </div>
                    </div>
                </div>
                <MenuDrawer {...{metadata}} />
            </div>
        );
    }
};

Layout.propTypes = {
    children: React.PropTypes.object,
    logoutUser: React.PropTypes.func.isRequired,
    metadata: React.PropTypes. object.isRequired,
};

export default Layout;