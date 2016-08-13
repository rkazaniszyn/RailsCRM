import React, { PropTypes } from 'react';
import RecordRow from './RecordRow';
import { Link } from 'react-router';

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
            header.push(<th key={metadata[z].id}>{metadata[z].label}</th>);
        }
        var itemsArr = [];
        for (let i = 0; i < items.length; i++) {
            itemsArr.push(<RecordRow key={items[i].id} record={items[i]} {...{params, metadata, onRecordDelete}} />);
        }
        return (
            <div>
            <Link to={'/modules/'+params.module+'/add'}>Add new record</Link>
            <table>
                <thead>
                    <tr>
                       {header}
                       <th colSpan="2">Operations</th>
                    </tr>
                </thead>
                <tbody>
                {itemsArr}
                </tbody>
            </table>
            </div>
        );
    }
}