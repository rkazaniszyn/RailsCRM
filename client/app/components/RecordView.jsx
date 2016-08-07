import React from 'react';

export default (props) => {
    const { record, metadata } = props;
    var rows = [];
    for (let i = 0; i < metadata.length; i++) {
        rows.push(<div key={metadata[i].id}>{metadata[i].label} - {record[metadata[i].field]}</div>);
    }
    return(<div>{rows}</div>)
}

