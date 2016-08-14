import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/ActionCreators';
import {toastr} from 'react-redux-toastr'

class ModuleContainer extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }
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
    onRecordDelete(module, id) {3
        const { dispatch } = this.props;
        var self = this;
        const toastrConfirmOptions = {
            onOk: () => {
                dispatch(ActionCreators.deleteRecord(module, id));
                self.context.router.push('/modules/'+module);
            },
            onCancel: () => true
        };
        toastr.confirm('Are you sure you want to delete this record?', toastrConfirmOptions)
    }
    render() {
        //add props to all children
        const children = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                onRecordDelete: this.onRecordDelete.bind(this)
            })
        );
        return (<div>{children}</div>);
    }
};

export default connect(function(){return {}})(ModuleContainer);