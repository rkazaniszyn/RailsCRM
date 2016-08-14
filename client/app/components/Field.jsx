import React from 'react'
import DatePicker from 'material-ui/DatePicker';

export default class Field extends React.Component {
    handleChange(event) {
        const text = event.target.value
        this.props.handleFieldChange(this.props.metadata.field, text);
    }

    render() {
        const {metadata, value} = this.props;
        if (this.props.mode == 'edit' || this.props.mode == 'add') {
            switch(metadata.field_type) {
                case 'date':
                    return (<label>{metadata.label} <input type="text" onChange={this.handleChange.bind(this)}
                                                           name={metadata.field} {...{value}}/></label>);
                default:
                    return (<label>{metadata.label} <input type="text" onChange={this.handleChange.bind(this)}
                                                           name={metadata.field} {...{value}}/></label>);
            }

        } else {
            return (<span>{metadata.label}: {this.props.value}</span>);
        }
    }
}