import React, { PropTypes } from 'react';
import RecordsWidget from '../components/RecordsWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as ActionCreators from '../actions/ActionCreators';

function select(state, props) {
    const metadata = state.metadata.toJS()[props.params.module];
    return {
        records: state.records.toJS(),
        metadata
    };
}

class RecordsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(ActionCreators, props.dispatch)

    }
    componentDidMount() {
        this.actions.fetchRecords(this.props.params.module);
    }
    render() {
        const { records, params, metadata } = this.props;
        if (metadata) {
            return (
                <RecordsWidget {...{params, metadata, records}}/>
            );
        }
        return null;

    }
};
RecordsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    records: PropTypes.object.isRequired,
    metadata: PropTypes.any,
};
export default connect(select)(RecordsContainer);
