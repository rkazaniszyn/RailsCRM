import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/ActionCreators';
import { PropTypes } from 'react';
import RecordView from '../components/RecordView';
import _ from 'lodash';

function select(state, props) {
    const record = state.record.get('item').toJS();
    const metadata = state.metadata.toJS()[props.params.module] || [];
    return {
        record,
        metadata,
        ui: state.ui.toJS()
    }
}

class RecordViewContainer extends React.Component {
    static propTypes = {
        record: PropTypes.object.isRequired,
        metadata: PropTypes.array.isRequired,
        onRecordDelete: PropTypes.func.isRequired,
    };
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(ActionCreators.resetRecord());
    }
    componentDidMount() {
        const { params } = this.props;
        if (!_.isEmpty(params.id)) {
            this.props.dispatch(ActionCreators.fetchRecord(params.module, params.id));
        }
    }
    updateRecord() {
        const { params } = this.props;
        const { router } = this.context;
        this.props.dispatch(ActionCreators.updateRecord(params.module, params.id, this.props.record, function() {
            router.push('/modules/'+params.module);
        }.bind(this)));
    }
    addRecord() {
        const { params } = this.props;
        const { router } = this.context;
        this.props.dispatch(ActionCreators.addRecord(params.module, this.props.record, function(){
            router.push('/modules/'+params.module);
        }.bind(this)));
    }
    handleFieldChange(name, value) {
        this.props.dispatch(ActionCreators.updateRecordField(name, value));
    }
    render() {
        const { record, metadata, params, onRecordDelete } = this.props;
        let { mode } = this.props.params;
        let saveRecord = this.updateRecord;
        if (/\/add$/.test(this.props.route.path)) {
            mode = 'add';
            saveRecord = this.addRecord;
        }

        if (metadata.length) {
            return (<RecordView {...{record, metadata, mode, params, onRecordDelete}} saveRecord={saveRecord.bind(this)} handleFieldChange={this.handleFieldChange.bind(this)}/>);
        }
        return null;
    }
};

export default connect(select)(RecordViewContainer);