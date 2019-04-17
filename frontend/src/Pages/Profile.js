import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import MedicalInformation from '../Components/Profile/MedicalInformation';
//import ProfileInfo from '../Components/Profile/ProfileInfo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import './Profile.css'
import ProfileInfoTest from '../Components/Profile/ProfileInfoTest';

const styles = theme =>({

});

class Profile extends Component {
  render() { 
    return (
      <div className='Profile-image'>
        <NavigationBar title={"My Profile"} Tab={1}/>
        <ProfileInfoTest/>
        {window.localStorage.userType === "2" &&
        <MedicalInformation/>}
        <br/>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
