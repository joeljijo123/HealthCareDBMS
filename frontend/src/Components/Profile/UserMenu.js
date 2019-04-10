import React from 'react';
import PropTypes from 'prop-types';
import { spacing } from '@material-ui/system';
import {Drawer, AppBar, List, Toolbar, Divider, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import MedicalInformation from './MedicalInformation';
import ProfileInfo from './ProfileInfo';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
//This component will be used by the doctors and patients default portal - 
// meaning this component should load for any employee or patient. For doctor, medical info 
// will be patient chart lookup. The idea is to centralize the doctor's actions that he performs,
// save for his schedule, which will be accessible via nav bar. 

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: '20%',
		height: 'calc(100%-165px)',
		top: 165,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    flexGrow: 1,
    width: 'calc(75%-125px)',
    left: 125,
    backgroundColor: "#e0e0e0",
    padding: theme.spacing.unit*3,
  },

});

class UserMenu extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
          selectedIndex: 0
        };
      this.handleListItemClick=this.handleListItemClick.bind(this);
  }

handleListItemClick = (event,index) =>{
    this.setState({
        selectedIndex: index
    });
};
//currently work in progress. 
  render() {
    const { classes } = this.props;
  return (
    <div>
   
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes= {{paper: classes.drawer}}
      //children={ <ProfileInfo />}
      anchor="left"
      >
      <Divider />
        <List component="nav">
        <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <PersonPinIcon />
            </ListItemIcon>
            <ListItemText primary="Profile Management" />
          </ListItem>
          <Divider />
          <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Medical Information" />
          </ListItem>
        </List>
        <Divider />
    </Drawer>
        <div className={classes.drawerPaper}>
        {this.state.index===0 && 
          <div>
          <ProfileInfo />
          </div>
        }
        {this.state.index===1 && 
          <div>
          <MedicalInformation/>
          </div>
        }
        </div>
      </div>
    );
  }
}
UserMenu.propTypes={
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(UserMenu);