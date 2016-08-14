import React from 'react'
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

export default class Field extends React.Component {

    handleDateChange(event, date) {
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth()+1)).slice(-2);
        let year = date.getFullYear();
        let dateString = year + '-' + month + '-' + day;
        this.props.handleFieldChange(this.props.metadata.field, dateString);
    }
    handleChange(event, value) {
        this.props.handleFieldChange(this.props.metadata.field, value);
    }
    render() {
        const {metadata, value} = this.props;
        if (this.props.mode == 'edit' || this.props.mode == 'add') {
            switch(metadata.field_type) {
                case 'date':
                    if (!_.isEmpty(value)) {
                        var date = new Date(Date.parse(value));
                    } else {
                        var date = null
                    }
                    return (<DatePicker autoOk={true} floatingLabelText={metadata.label}
                        value={date}
                        onChange={this.handleDateChange.bind(this)} />)
                default:
                    return (<TextField errorText={this.props.error} floatingLabelText={metadata.label}
                                        value={value}
                                        onChange={this.handleChange.bind(this)} />)
            }

        } else {
            return (<span>{metadata.label}: {this.props.value}</span>);
        }
    }
}