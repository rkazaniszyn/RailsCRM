import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/ActionCreators';
import {toastr} from 'react-redux-toastr'
import ErrorPage from '../components/ErrorPage';

class ErrorPageContainer extends React.Component {
    componentWillUnmount() {
        this.props.dispatch(ActionCreators.showHideErrorPage(0));
    }
    render() {
        return (<ErrorPage/>);
    }
};

export default connect(function(){return {}})(ErrorPageContainer);