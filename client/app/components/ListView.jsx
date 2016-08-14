import React, { PropTypes } from 'react';
import RecordRow from './RecordRow';
import { Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class ListView extends React.Component {
    static propTypes = {
        records: PropTypes.object.isRequired,
        metadata: PropTypes.array,
        onRecordDelete: PropTypes.func.isRequired,
    };
    render() {
        const  { items } = this.props.records;
        const { params, metadata, onRecordDelete } = this.props;
        var header = [];
        for (let z = 0; z < metadata.length; z++) {
            header.push(<TableHeaderColumn key={metadata[z].id}>{metadata[z].label}</TableHeaderColumn>);
        }
        var itemsArr = [];
        for (let i = 0; i < items.length; i++) {
            itemsArr.push(<RecordRow key={items[i].id} record={items[i]} {...{params, metadata, onRecordDelete}} />);
        }
        const showCheckboxes = false;
        return (
            <div>
                <Link to={'/modules/'+params.module+'/add'}>Add new record</Link>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={showCheckboxes}
                                 adjustForCheckbox={showCheckboxes}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            {header}
                            <TableHeaderColumn colSpan="2">Operations</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={showCheckboxes}>
                        {itemsArr}
                    </TableBody>
                </Table>
            </div>
        );
    }
}