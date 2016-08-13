import React from 'react'

export default class Field extends React.Component {
    handleChange(event) {
        const text = event.target.value
        this.props.handleFieldChange(this.props.metadata.field, text);
    }

    render() {
        const {metadata, value} = this.props;
        if (this.props.mode == 'edit') {
            return (<label>{metadata.label} <input type="text" onChange={this.handleChange.bind(this)}
                                                   name={metadata.field} {...{value}}/></label>);
        } else {
            return (<span>{metadata.label}: {this.props.value}</span>);
        }
    }
}