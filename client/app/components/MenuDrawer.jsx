import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';

export default class MenuDrawer extends React.Component {
    render() {
        let open = true;
        return (
            <div>
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer open={open}>
                    <AppBar style={{height:'56px'}} showMenuIconButton={false} title="Menu" />
                    <Link activeClassName="active" to="/first_page"><MenuItem>Router First Example Page</MenuItem></Link>
                    <Link activeClassName="active" to="/second_page"><MenuItem>Second Page</MenuItem></Link>
                    <Link activeClassName="active" to="/modules/Contacts"><MenuItem>Records</MenuItem></Link>
                </Drawer>
            </div>
        );
    }
}