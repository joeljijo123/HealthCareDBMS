import React, { Component } from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import LoginImage from '../Components/BackgroundPicture.jpg';

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