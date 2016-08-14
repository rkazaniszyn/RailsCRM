import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import _ from 'lodash';
import { Link } from 'react-router';

export default class HeaderToolbar extends React.Component {
    static propTypes = {
        logoutUser: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired,
    };
    onSignOut(event) {
        this.props.logoutUser();
    }
    render() {
        const { data } = this.props.user;
        let loggedInText = '';
        if (!_.isEmpty(data)) {

            loggedInText = 'Hello '+data.first_name+ ' ' + data.last_name + '. You are logged in.';
        }
        return (
            <Toolbar>
                <ToolbarGroup>
                    <Link to="/"><ToolbarTitle text="RailsCRM" /></Link>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle style={{'fontSize': '14px'}} text={loggedInText} />
                    <ToolbarSeparator />
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <MenuItem primaryText="More info" />
                        <MenuItem onTouchTap={this.onSignOut.bind(this)} primaryText="Sign out" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}