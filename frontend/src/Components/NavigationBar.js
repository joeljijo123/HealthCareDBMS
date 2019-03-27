import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Tab, Tabs, CssBaseline } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  BarTitle: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#e0e0e0",
    minHeight: 100,
    height: '100%',
  },
  MenuIcon: {
    marginLeft: -12,
    marginRight: 20 
  },
};

  class NavigationBar extends React.Component {
    state = {
      loggedIn: null,
      userid: null,
      check: window.localStorage.loggedIn,
      userType: "hkere",
    };

    logInSet(storageLoggedIn) {
      return localStorage.getItem(storageLoggedIn) === 'true' ? true : false;
    }
    handleMenuClick= () => {
      this.setState({loggedIn:false});
      console.log(this.props.loggedIn);

    }
    componentDidMount() {
      this.setState({loggedIn:this.logInSet("loggedIn")});
    }
    render() {
      const { classes, title } = this.props;
      const { loggedIn } = this.state;

      return (
        <div className={classes.root}>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
              {loggedIn === true ? (
                <div>
                  <Toolbar>
                    <IconButton aria-label="Menu" className={classes.MenuIcon} onClick={this.handleMenuClick}>
                      <MenuIcon>asas</MenuIcon>
                    </IconButton>
                    <Typography variant="h4" className={classes.BarTitle}>
                      {title}
                    </Typography>
                    <CssBaseline/>
                  </Toolbar>
                  <Tabs>
                      <Tab label="1" fullWidth></Tab>
                  </Tabs>
                  </div>
              ):(
                <Typography variant="h4"className={classes.BarTitle}>
                  {title}
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
