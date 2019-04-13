import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import LoginImage from '../Components/Home/BackgroundPicture.jpg';
import './Home.css';

const divStyle = {
    style: {
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${LoginImage})`,
    },
  
  };

class Registration extends React.Component{
    render() {
        return(
            <div className='Home-image'>
                <div className='Home-overlay'>
                    <RegistrationForm/>
                </div>
            </div>
            
        );
    }
}



export default Registration;