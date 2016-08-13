import React, { PropTypes } from 'react';
import Field from './Field';
import { Link } from 'react-router';

export default class RecordView extends React.Component {
    static propTypes = {
        updateRecord: PropTypes.func.isRequired,
        metadata: PropTypes.array.isRequired,
        record: PropTypes.object.isRequired,
    };
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.updateRecord();
    }
    render() {
        const { metadata, mode, record } = this.props;
        const handleFieldChange = this.props.handleFieldChange;
        var rows = [];
        for (let i = 0; i < metadata.length; i++) {
            rows.push(<div key={metadata[i].id}><Field {...{ mode, handleFieldChange }} metadata={metadata[i]} value={record[metadata[i].field]} /></div>);
        }
        let buttons = [];
        let recordUrl = '/modules/'+this.props.params.module+'/'+this.props.params.id;
        if (this.props.mode !== 'edit') {
            buttons.push(<Link key="edit" to={recordUrl+'/edit'}>Edit</Link>);
        } else {
            buttons.push(<Link key="cancel" to={recordUrl}>Cancel</Link>);
            buttons.push(<input key="submit" type="submit" value="Submit"/>);
        }
        return (<form method="PUT" onSubmit={this.handleFormSubmit.bind(this)}>{buttons}{rows}</form>);
    }
}