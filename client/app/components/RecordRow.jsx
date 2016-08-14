import React from 'react';
import { Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
            cols.push(<TableRowColumn key={metadata[i].id}>{record[metadata[i].field]}</TableRowColumn>);
        }
        return(
            <TableRow>
                <TableRowColumn>{record.id}</TableRowColumn>
                {cols}
                <TableRowColumn><Link to={editUrl}>Edit</Link></TableRowColumn>
                <TableRowColumn><a href="#" onClick={this.onDeleteClicked.bind(this)}>Delete</a></TableRowColumn>
            </TableRow>
        )
    }
};

RecordRow.propTypes = {
    record: React.PropTypes.object.isRequired,
    metadata: React.PropTypes.array.isRequired,
};
export default RecordRow;