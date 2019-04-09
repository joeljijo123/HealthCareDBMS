import React from 'react';
import PropTypes from 'prop-types';
import GeneralInformation from './ProfileInfo';
import BasicInformation from '../Profile/MedicalInformation';
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
import HospitalIcon from '../material-ui/icons/Hospital'
import MoneyIcon from '../materialmaterial-ui/icons/Money'
//This component will be used by the doctors and patients default portal - 
// meaning this component should load for any employee or patient. For doctor, medical info 
// will be patient chart lookup. The idea is to centralize the doctor's actions that he performs,
// save for his schedule, which will be accessible via nav bar. 

const styles = theme => ({
  root: {
    width: '95%',
    marginLeft: '65%',
    paddingTop: '2%',
    alignItems: "center",
    display: "flex",
    flexDirection: 'column',
    backgroundColor: "#e0e0e0",
    padding: theme.spacing.unit*3
  },
  drawer: {
    width: '20%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '75%',
  },
  toolbar: theme.mixins.toolbar, 
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  } //inner text field area definitions

});

class user_menu_drawer extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
          value: 0,
        }

  }

paperSwap = (pagenum) => {
    this.setState({ pagenum });
}

  render() {
    const { classes } = this.props;
    let page;
    if(this.state.pagenum==0) {
      page = GeneralInformation
    }
    else if(this.state.pagenum==1) {
      page = MedicalInformation
    }
    else if(this.state.pagenum==2) {
      //page= AccountInq;
    }
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
          {['Profile Information', 'Medical History', 'Account Inquiry'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon><PersonPinIcon/>, <HospitalIcon/>, <MoneyIcon/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          ))}
        </List>
      <Divider />
    </Drawer>
      <main className={classes.content}>
      <div className={classes.toolbar} />
        {page}
      </main>
      </div>
  );
  }
}
user_menu_drawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(user_menu_drawer);