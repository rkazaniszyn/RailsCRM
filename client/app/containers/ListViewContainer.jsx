import React, { PropTypes } from 'react';
import ListView from '../components/ListView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/ActionCreators';
import config from '../config';

function select(state, props) {
    const metadata = state.metadata.get('modules').toJS()[props.params.module] || [];
    return {
        records: state.records.toJS(),
        metadata
    };
}

class ListViewContainer extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        records: PropTypes.object.isRequired,
        onRecordDelete: PropTypes.func.isRequired,
        metadata: PropTypes.array.isRequired,
    };
    componentWillMount() {
        this.props.dispatch(ActionCreators.resetList());
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(ActionCreators.fetchRecords(this.props.params.module));
    }
    componentWillReceiveProps(newProps) {
        const { dispatch } = this.props;
        if (this.props.params.module !== newProps.params.module) {
            this.props.dispatch(ActionCreators.resetList());
            dispatch(ActionCreators.fetchRecords(newProps.params.module));
        }
    }
    loadMoreRecords() {
        const { dispatch } = this.props;
        const { module } = this.props.params;
        const newOffset = parseInt(this.props.records.offset) + config.listRecordsLimit;
        dispatch(ActionCreators.fetchRecords(module, newOffset));
    }
    render() {
        const { records, params, metadata, onRecordDelete } = this.props;
        if (metadata.length) {
            return (
                <ListView {...{params, metadata, records, onRecordDelete}} loadMoreRecords={this.loadMoreRecords.bind(this)}/>
            );
        }
        return null;

    }
};
export default connect(select)(ListViewContainer);
