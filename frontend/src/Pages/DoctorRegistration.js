import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import LoginImage from '../Components/Home/BackgroundPicture.jpg';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';

const divStyle = {
    style: {
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${LoginImage})`,
    },
  
  };

class DoctorRegistration extends React.Component{
    render() {
        return(
            <div style={divStyle.style}>
                <NavigationBar title={"Register A New Doctor"} Tab={4}/>
                <RegistrationForm/>
            </div>
        );
    }
}



export default DoctorRegistration;