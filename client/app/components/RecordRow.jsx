import React from 'react';
import { Link } from 'react-router';

const RecordRow = (props) => {
    const { record, metadata } = props;
    const editUrl = '/modules/'+props.params.module+'/'+record.id;
    var cols = [];
    for (let i = 0; i < metadata.length; i++) {
        cols.push(<td key={metadata[i].id}>{record[metadata[i].field]}</td>);
    }
    return(
        <tr>
            {cols}
            <td><Link to={editUrl}>Edit</Link></td>
            <td>Delete</td>
        </tr>
    )
};

RecordRow.propTypes = {
    record: React.PropTypes.object.isRequired,
    metadata: React.PropTypes.array.isRequired,
};
export default RecordRow;