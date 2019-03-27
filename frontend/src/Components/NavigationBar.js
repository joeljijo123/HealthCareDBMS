import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  BarTitle: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#e0e0e0",
    height: '100%',
  },

};

  class NavigationBar extends React.Component {
    state = {
      loggedIn: true,
    };

    handleMenuClick= () => {
      this.setState({loggedIn:false});

    }

    render() {
      const { classes } = this.props;
      const { loggedIn } = this.state;

      return (
        <div className={classes.root}>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
              {loggedIn === true ? (
                <IconButton aria-label="Menu" onClick={this.handleMenuClick}>
                  <MenuIcon color="#3e2723"></MenuIcon>
                </IconButton>
              ):(
                <Typography variant="h4" color="#3e2723" className={classes.BarTitle}>
                  Team 7 Medical System
                </Typography>
              )}
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
