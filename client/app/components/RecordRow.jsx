import React from 'react';
import { Link } from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class RecordRow extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired,
        metadata: React.PropTypes.array.isRequired,
        onRecordDelete: React.PropTypes.func.isRequired,
    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    onDeleteClicked(event) {
        event.preventDefault();
        this.props.onRecordDelete(this.props.params.module, this.props.record.id);
    }
    onEditClicked(event) {
        this.context.router.push('/modules/'+this.props.params.module+'/'+this.props.record.id+'/edit')
    }
    onShowClicked(event) {
        this.context.router.push('/modules/'+this.props.params.module+'/'+this.props.record.id)
    }
    render() {
        const { record, metadata } = this.props;

        var cols = [];
        for (let i = 0; i < metadata.length; i++) {
            cols.push(<TableRowColumn key={metadata[i].id}>{record[metadata[i].field]}</TableRowColumn>);
        }
        return(
            <TableRow>
                <TableRowColumn>{record.id}</TableRowColumn>
                {cols}
                <TableRowColumn>
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <MenuItem onTouchTap={this.onShowClicked.bind(this)} primaryText="Show" />
                        <MenuItem onTouchTap={this.onEditClicked.bind(this)} primaryText="Edit" />
                        <MenuItem onTouchTap={this.onDeleteClicked.bind(this)} primaryText="Delete" />
                    </IconMenu>
                </TableRowColumn>
            </TableRow>
        )
    }
};

RecordRow.propTypes = {
    record: React.PropTypes.object.isRequired,
    metadata: React.PropTypes.array.isRequired,
};
export default RecordRow;