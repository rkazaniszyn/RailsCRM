import React from 'react';
import { Link } from 'react-router';

class RecordRow extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired,
        metadata: React.PropTypes.array.isRequired,
        onRecordDelete: React.PropTypes.func.isRequired,
    };
    onDeleteClicked(event) {
        event.preventDefault();
        this.props.onRecordDelete(this.props.params.module, this.props.record.id);
    }
    render() {
        const { record, metadata } = this.props;
        const editUrl = '/modules/'+this.props.params.module+'/'+record.id;
        var cols = [];
        for (let i = 0; i < metadata.length; i++) {
            cols.push(<td key={metadata[i].id}>{record[metadata[i].field]}</td>);
        }
        return(
            <tr>
                {cols}
                <td><Link to={editUrl}>Edit</Link></td>
                <td><a href="#" onClick={this.onDeleteClicked.bind(this)}>Delete</a></td>
            </tr>
        )
    }
};

RecordRow.propTypes = {
    record: React.PropTypes.object.isRequired,
    metadata: React.PropTypes.array.isRequired,
};
export default RecordRow;