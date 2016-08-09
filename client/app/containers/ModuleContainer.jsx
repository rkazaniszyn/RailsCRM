import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/ActionCreators';

class ModuleContainer extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.params.module !== nextProps.params.module) {
            const { dispatch } = this.props;
            dispatch(ActionCreators.fetchMetadata(this.props.params.module));
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(ActionCreators.fetchMetadata(this.props.params.module));
    }
    render() {
        const { children } = this.props;
        return (<div>{children}</div>);
    }
};

export default connect(function(){return {}})(ModuleContainer);