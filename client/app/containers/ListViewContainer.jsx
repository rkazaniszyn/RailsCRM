import React, { PropTypes } from 'react';
import ListView from '../components/ListView';
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

class ListViewContainer extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        records: PropTypes.object.isRequired,
        metadata: PropTypes.any,
    };
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
                <ListView {...{params, metadata, records}}/>
            );
        }
        return null;

    }
};
export default connect(select)(ListViewContainer);
