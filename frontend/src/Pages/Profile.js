import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import MedicalInformation from '../Components/Profile/MedicalInformation';
import ProfileInfo from '../Components/Profile/ProfileInfo';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme =>({
  root: {
      height: "200vh",
      backgroundColor: "#white",
  },
});

class Profile extends Component {
  render() { 
    const{classes}=this.props;
    return (
      <div className={classes.root}>
        <NavigationBar title={"My Profile"} Tab={1}/>
        <ProfileInfo/>
        {window.localStorage.userType === "2" ? (
        <MedicalInformation/>
        ):(
          <div></div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
