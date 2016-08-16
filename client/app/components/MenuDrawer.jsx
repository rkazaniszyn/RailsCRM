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
            let link = <Link className="menu-item" activeClassName="active" to={'/modules/'+metadata.modules_list[i]}/>
            modules.push(
                <MenuItem key={metadata.modules_list[i]} containerElement={link}>{metadata.modules_list[i]}</MenuItem>
            );
        }
        return (
            <div>
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer open={open}>
                    <AppBar style={{height:'56px'}} showMenuIconButton={false} title="Menu" />
                    <MenuItem containerElement={<Link className="menu-item" activeClassName="active" to="/first_page" />}>Router First Example Page</MenuItem>
                    <MenuItem containerElement={<Link className="menu-item" activeClassName="active" to="/second_page"/>}>Second Page</MenuItem>
                    {modules}
                </Drawer>
            </div>
        );
    }
}