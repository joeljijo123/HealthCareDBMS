import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './Home.css';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import UserInformation from '../Components/Profile/UserInformation';
import MedicalInformation from '../Components/Profile/MedicalInformation';
import GeneralInformation from '../Components/Profile/GeneralInformation';

class Profile extends Component {
  render() { 
    return (
      <div className='Home-image'>
        <NavigationBar title={"The Profile Page"}/>
        <UserInformation/>
        <MedicalInformation/>
        <GeneralInformation/>
      </div>
    );
  }
}

export default Profile;
