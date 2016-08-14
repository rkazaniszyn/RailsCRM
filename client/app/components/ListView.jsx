import React, { PropTypes } from 'react';
import RecordRow from './RecordRow';
import { Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class ListView extends React.Component {
    static propTypes = {
        records: PropTypes.object.isRequired,
        metadata: PropTypes.array,
        onRecordDelete: PropTypes.func.isRequired,
    };
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    onAddClicked(event) {
        this.context.router.push('/modules/'+this.props.params.module+'/add');
    }
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
                <FloatingActionButton onTouchTap={this.onAddClicked.bind(this)}>
                    <ContentAdd/>
                </FloatingActionButton>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={showCheckboxes}
                                 adjustForCheckbox={showCheckboxes}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            {header}
                            <TableHeaderColumn>Operations</TableHeaderColumn>
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