import React, { PropTypes } from 'react';

export default class RecordsWidget extends React.Component {
    static propTypes = {
        records: PropTypes.object.isRequired
    };
    render() {
        const items = this.props.records.items;
        if (this.props.records.isFetching == true) {
            return (<div>fetching...</div>)
        } else {
            var itemsArr = [];
            for (let i = 0; i < items.length; i++) {
                itemsArr.push(<div key={items[i].id}>{items[i].first_name}</div>);
            }
            return (
                <div>{itemsArr}</div>
            );
        }

    }
}