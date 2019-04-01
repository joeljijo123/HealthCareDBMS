import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import LoginImage from '../Components/Home/BackgroundPicture.jpg';

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
            <div style={divStyle.style}>
                <RegistrationForm/>
            </div>
            
        );
    }
}



export default Registration;