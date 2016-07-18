import React, { PropTypes } from 'react';
import RecordsWidget from '../components/RecordsWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as ActionCreators from '../actions/ActionCreators';

function select(state) {
    return { records: state.records };
}

class Records extends React.Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(ActionCreators, props.dispatch)

    }
    componentDidMount() {
        //fired only once
        this.actions.fetchRecords('Contacts');
    }
    render() {
        const { records } = this.props;
        return (
            <RecordsWidget records={records.toJS()}/>
        );
    }
};
Records.propTypes = {
    dispatch: PropTypes.func.isRequired,
    records: PropTypes.instanceOf(Immutable.Map).isRequired,
};
export default connect(select)(Records);
