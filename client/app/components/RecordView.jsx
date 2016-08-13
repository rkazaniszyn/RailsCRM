import React, { PropTypes } from 'react';
import Field from './Field';
import { Link } from 'react-router';

export default class RecordView extends React.Component {
    static propTypes = {
        saveRecord: PropTypes.func.isRequired,
        metadata: PropTypes.array.isRequired,
        record: PropTypes.object.isRequired,
    };
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.saveRecord();
    }
    render() {
        const { metadata, mode, record, params } = this.props;
        const handleFieldChange = this.props.handleFieldChange;
        var rows = [];
        for (let i = 0; i < metadata.length; i++) {
            let value = record[metadata[i].field] || '';
            rows.push(<div key={metadata[i].id}><Field {...{ mode, handleFieldChange, value}} metadata={metadata[i]}/></div>);
        }
        let buttons = [];
        let urlPrefix = '/modules/'+params.module;
        if (this.props.mode == 'edit') {
            buttons.push(<Link key="cancel" to={urlPrefix+'/'+params.id}>Cancel</Link>);
            buttons.push(<input key="submit" type="submit" value="Update"/>);
        } else if (this.props.mode == 'add') {
            buttons.push(<Link key="cancel" to={urlPrefix}>Cancel</Link>);
            buttons.push(<input key="submit" type="submit" value="Save"/>);
        } else {
            buttons.push(<Link key="edit" to={urlPrefix+'/'+params.id+'/edit'}>Edit</Link>);
        }
        return (<form onSubmit={this.handleFormSubmit.bind(this)}>{buttons}{rows}</form>);
    }
}