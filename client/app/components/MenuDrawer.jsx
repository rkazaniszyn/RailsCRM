import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';

export default class MenuDrawer extends React.Component {
    static propTypes = {
      metadata: React.PropTypes.shape({
          modules_list: React.PropTypes.array,
          modules: React.PropTypes.object
      }).isRequired,
    };
    render() {
        const { metadata } = this.props;
        let open = true;
        let modules = []
        for (let i = 0; i < metadata.modules_list.length; i++) {
            modules.push(
                <Link key={metadata.modules_list[i]} activeClassName="active" to={'/modules/'+metadata.modules_list[i]}>
                <MenuItem>{metadata.modules_list[i]}</MenuItem>
            </Link>);
        }
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
                    {modules}
                </Drawer>
            </div>
        );
    }
}