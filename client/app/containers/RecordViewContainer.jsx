import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/ActionCreators';
import { PropTypes } from 'react';
import RecordView from '../components/RecordView';
import _ from 'lodash';

function select(state, props) {
    const record = state.record.get('item').toJS();
    const metadata = state.metadata.toJS()[props.params.module];
    return {
        record,
        metadata,
        ui: state.ui.toJS()
    }
}

class RecordViewContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(ActionCreators.resetRecord());
    }
    componentDidMount() {
        const { params } = this.props;
        this.props.dispatch(ActionCreators.fetchRecord(params.module, params.id));
    }
    updateRecord() {
        const { params } = this.props;
        this.props.dispatch(ActionCreators.updateRecord(params.module, params.id, this.props.record))
    }
    handleFieldChange(name, value) {
        this.props.dispatch(ActionCreators.updateRecordField(name, value));
    }
    render() {
        const { record, metadata, params } = this.props;
        const { mode } = this.props.params;
        if (metadata && !_.isEmpty(record)) {
            return (<RecordView {...{record, metadata, mode, params}} updateRecord={this.updateRecord.bind(this)} handleFieldChange={this.handleFieldChange.bind(this)}/>);
        }
        return null;
    }
    static propTypes = {
        record: PropTypes.object.isRequired,
        metadata: PropTypes.any,
    };
};

export default connect(select)(RecordViewContainer);