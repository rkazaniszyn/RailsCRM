import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/ActionCreators';
import { PropTypes } from 'react';
import RecordView from '../components/RecordView';
import _ from 'lodash';

function select(state, props) {
    console.log(state.record.toJS());
    const record = state.record.get('item').toJS();
    const metadata = state.metadata.toJS()[props.params.module];
    return {
        record,
        metadata
    }
}

class RecordViewContainer extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(ActionCreators.fetchRecord(this.props.params.module, this.props.params.id));
    }
    render() {
        const { record, metadata } = this.props;
        if (metadata && !_.isEmpty(record)) {
            return (<RecordView {...{record, metadata}}/>);
        }
        return null;
    }
    static propTypes = {
        record: PropTypes.object.isRequired,
        metadata: PropTypes.any,
    };
};

export default connect(select)(RecordViewContainer);