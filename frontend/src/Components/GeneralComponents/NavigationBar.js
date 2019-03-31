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
    marginTop: "1%"
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
      userType: null,
    };

    logInSet(storageLoggedIn) {
      return localStorage.getItem(storageLoggedIn) === 'true' ? true : false;
    }
    AppointmentPageRedirect = () =>{
      window.location.replace('/Appointments');
    }
    logout = () =>{
      this.setState({loggedIn:false,userid:null,userType:null})
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("userID", null);
      localStorage.setItem("userType", null);
      window.location.replace('/')
    }
    componentDidMount() {
      this.setState({loggedIn:this.logInSet("loggedIn")});
      //HardCoding
      //Query to see if the user is an employee or a Patient then
      this.setState({userType: localStorage.userType});
    }
    render() {
      const { classes, title } = this.props;
      const { loggedIn } = this.state;

      return (
        <div className={classes.root}>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
              {loggedIn ? (
                <div>
                  <Toolbar >
                    <Typography variant="h3" className={classes.BarTitle}>
                      {title}
                    </Typography>
                    <CssBaseline/>
                  </Toolbar>
                  <Tabs textColor="primary">
                      <Tab label="Appointments" onClick={this.AppointmentPageRedirect} hidden></Tab>
                      <Tab label="My Profile" ></Tab>
                      {localStorage.userType === "Doctor" ? (
                        <Tab label="My Schedule" ></Tab>
                      ):(
                        <div></div>
                      )}
                      <Tab label="Logout" onClick={this.logout}></Tab>
                  </Tabs>
                  
                </div>
              ):(
                <Typography variant="h3"className={classes.BarTitle}>
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