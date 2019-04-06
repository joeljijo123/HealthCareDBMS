import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import MedicalInformation from '../Components/Profile/MedicalInformation';
import GeneralInformation from '../Components/Profile/GeneralInformation';

class Profile extends Component {
  render() { 
    return (
      <div>
        <NavigationBar title={"The Profile Page"} Tab={1}/>
        <GeneralInformation/>
        <MedicalInformation/>
      </div>
    );
  }
}

export default Profile;
