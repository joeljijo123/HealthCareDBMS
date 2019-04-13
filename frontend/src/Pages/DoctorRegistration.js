import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import LoginImage from '../Components/Home/BackgroundPicture.jpg';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import './Home.css';

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
            <div className='Home-image'>
                <div className='Home-overlay'>
                    <NavigationBar title={"Register A New User"} Tab={4}/>
                    <RegistrationForm/>
                </div>
            </div>
        );
    }
}



export default DoctorRegistration;