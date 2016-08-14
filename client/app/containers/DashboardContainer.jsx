import React from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends React.Component {
    render() {
        return (<div className="container"><h1>Dashboard</h1><p>Dashboard will be here.</p></div>);
    }
};

export default connect(function(){return {}})(DashboardContainer);