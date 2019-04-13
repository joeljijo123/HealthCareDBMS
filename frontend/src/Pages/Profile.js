import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import MedicalInformation from '../Components/Profile/MedicalInformation';
import ProfileInfo from '../Components/Profile/ProfileInfo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import UserMenu from '../Components/Profile/UserMenu';


const styles = theme =>({
  root: {
      height: "200vh",
      backgroundColor: "#a09d9d",

  },
});

class Profile extends Component {
  render() { 
    const{classes}=this.props;
    return (
      <div className={classes.root}>
        <NavigationBar title={"The Profile Page"} Tab={1}/>
        <ProfileInfo/>
        <MedicalInformation/>
        
       
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
