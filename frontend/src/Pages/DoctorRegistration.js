import React from 'react';
import RegistrationForm from '../Components/Registration/RegistrationForm';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import './Home.css';

class DoctorRegistration extends React.Component{
    render() {
        return(
            <div className='Home-image'>
                <div className='Home-overlay'>
                    <NavigationBar title={"Register A New User"} Tab={3}/>
                    <RegistrationForm/>
                </div>
            </div>
        );
    }
}



export default DoctorRegistration;