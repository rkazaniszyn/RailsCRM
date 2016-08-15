import React, { PropTypes } from 'react';
import Field from './Field';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class RecordView extends React.Component {
    static propTypes = {
        saveRecord: PropTypes.func.isRequired,
        metadata: PropTypes.array.isRequired,
        record: PropTypes.object.isRequired,
        onRecordDelete: PropTypes.func.isRequired,
    };
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.saveRecord();
    }
    onCancelClick(e) {
        e.preventDefault();
        let urlPrefix = '/modules/'+this.props.params.module;
        if (this.props.mode == 'edit') {
            this.context.router.push(urlPrefix+'/'+this.props.params.id);
        } else if (this.props.mode == 'add') {
            this.context.router.push(urlPrefix);
        }
    }
    onEditClick(e) {
        e.preventDefault();
        let urlPrefix = '/modules/'+this.props.params.module;
        this.context.router.push(urlPrefix+'/'+this.props.params.id+'/edit');
    }
    onDeleteClick(e) {
        e.preventDefault();
        this.props.onRecordDelete(this.props.params.module, this.props.params.id);
    }
    render() {
        const { metadata, mode, record } = this.props;
        const handleFieldChange = this.props.handleFieldChange;
        var rows = [];
        for (let i = 0; i < metadata.length; i++) {
            let value = record.item[metadata[i].field] || '';
            let error = false;
            for (let z = 0; z < record.validationErrors.length; z++) {
                if (record.validationErrors[z].field == metadata[i].field) {
                    error = record.validationErrors[z].error;
                    break;
                }
            }
            rows.push(
                <div style={{marginBottom:'10px'}} key={metadata[i].id}>
                <Field {...{ mode, handleFieldChange, value, error}} metadata={metadata[i]}/>
                </div>
            );
        }
        let buttons = [];
        if (this.props.mode == 'edit' || this.props.mode == 'add') {
            let label = 'Update Record';
            if (this.props.mode == 'add') {
                label = 'Create Record';
            }
            buttons.push(<RaisedButton onTouchTap={this.onCancelClick.bind(this)} key="cancel" label="Cancel"/>);
            buttons.push(<RaisedButton style={{marginLeft:'10px'}} type="submit" key="submit" label={label} primary={true}/>);
        } else {
            buttons.push(<RaisedButton onTouchTap={this.onEditClick.bind(this)} key="edit" label="Edit"/>);
            buttons.push(<RaisedButton style={{marginLeft:'10px'}} onTouchTap={this.onDeleteClick.bind(this)} key="delete" label="Delete Record" secondary={true}/>);
        }
        return (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
            <div style={{marginBottom:'20px'}}>{buttons}</div>
            {rows}
            </form>
        );
    }
}