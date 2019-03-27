import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Drawer, List, ListItem, ListItemText, Divider, } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#e0e0e0",
    minHeight: '40px',
    maxHeight: '56px',
    height: '100%',
},
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavigationBar extends React.Component {
  state = {
    loggedIn: false,
    openMenu: false,
  };

  handleChange = event => {
    this.setState({ loggedIn: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ openMenu: event.currentTarget });
  };

  handleDrawerOpen = () => {
    this.setState({ openMenu: true });
  };

  handleDrawerClose = () => {
    this.setState({ openMenu: false });
  };

  handleClose = () => {
    this.setState({ openMenu: null });
  };

  render() {
    const { classes } = this.props;
    const { loggedIn, openMenu } = this.state;
    const open = Boolean(openMenu);

    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} onClick={this.handleDrawerOpen} aria-label="Menu">
              <MenuIcon color="#3e2723"></MenuIcon>
            </IconButton>
            <Typography variant="h6" color="#3e2723" className={classes.grow}>
              Team 7 Medical System
            </Typography>
            <Drawer open={openMenu} onClick={() => this.state.handleMenuClick}></Drawer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
