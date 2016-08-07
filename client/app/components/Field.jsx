import React from 'react'

export default (props) => {
    const { field } = props;
    if (props.isEdited) {
        return (<label>{field.label}<input {...{field}}/></label>);
    } else {
        return (<span>{field.label}: {field.value}</span>);
    }
}