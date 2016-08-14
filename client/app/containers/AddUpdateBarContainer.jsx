import React from 'react';

export default class AddUpdateBarContainer extends React.Component {
    render() {
        return (<AppBar
            title={<span>Title</span>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />}
        />)
    }
}