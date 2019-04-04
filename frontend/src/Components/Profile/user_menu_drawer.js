import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import UserInformation from '../Components/Profile/UserInformation';
import MedicalInformation from '../Components/Profile/MedicalInformation';
import GeneralInformation from '../Components/Profile/GeneralInformation';

//This component will be used by the doctors and patients default portal - 
// meaning this component should load for any employee or patient. For doctor, medical info 
// will be patient chart lookup. The idea is to centralize the doctor's actions that he performs,
// save for his schedule, which will be accessible via nav bar. 

const styles = theme => ({
  root: {
    width: '100%',
    marginLeft: '65%',
    marginTop: '10%',
    alignItems: "center",
    display: "flex",
    flexDirection: 'column',
    backgroundColor: "#e0e0e0",
    padding: theme.spacing.unit*3
  },
  drawer: {
    width: '80%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  } //inner text field area definitions

});

class user_menu_drawer extends React.Component {


paperSwap = (event, value) => {
    this.setState({ value });
}

  render() {
    const { classes } = this.props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['User Information', 'Medical History', 'Tests'].map((text, index) => (
            <ListItem button key={text}>
              //<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        //User information tab (patient)
        <h1>I love html</h1>


      </main>
    </div>
  );
  }
}
user_menu_drawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(user_menu_drawer);