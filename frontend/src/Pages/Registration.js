import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import './Home.css';

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