import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import MedicalInformation from '../Components/Profile/MedicalInformation';
import GeneralInformation from '../Components/Profile/GeneralInformation';
import GeneralInfo from '../Components/Profile/GeneralInfo';

class Profile extends Component {
  render() { 
    return (
      <div>
        <NavigationBar title={"The Profile Page"} Tab={1}/>
        <GeneralInformation/>
        
      </div>
    );
  }
}

export default Profile;
