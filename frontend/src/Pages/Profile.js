import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import MedicalInformation from '../Components/Profile/MedicalInformation';
//import ProfileInfo from '../Components/Profile/ProfileInfo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import './Profile.css'
import ProfileInfoTest from '../Components/Profile/ProfileInfoTest';
import Image from '../Components/Profile/ProfileBackground.jpg';

const styles = theme =>({
  root: {
      minHeight: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: 'fixed',
      backgroundPosition: 'fixed',
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      backgrounPosition:'fixed',
      backgroundImage: `url(${Image})`,
      backgroundColor: 'transparent'
  },
});

class Profile extends Component {
  render() { 
    const{classes}=this.props;
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
