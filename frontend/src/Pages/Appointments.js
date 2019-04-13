import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import AppointmentHistory from '../Components/Appointments/AppointmentHistory';
import '../Components/Appointments/AppointmentPage.css';

class Appointments extends Component {
  constructor(props){
    super(props)
    this.state = {
        firstName: "",
        Facilities: []
    };
  }
  componentDidMount(){
    this.FirstName();
  }

  FirstName(){
    if(window.localStorage.userType === "2"){
      fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.LoginTableID}`)
      .then(result => result.json())
      .then(res => {
          this.setState(  { firstName: res.data[0].FirstName  } )
        })
      .catch(err => console.log(err))
    }
  
    else{
      fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.LoginTableID}`)
      .then(result => result.json())
      .then(res => {this.setState(  { firstName: res.data[0].FirstName  } )})
      .catch(err => console.log(err))
    }
  }

  
  render() {
    return (
      <div className='AppointmentPage-image'>
        <div className='AppointmentPage-overlay'>
          <NavigationBar title={'Welcome, '+this.state.firstName} Tab={0}/>
          <AppointmentHistory val={this.state}/>
        </div>
      </div>
        
    );
  }
}

export default Appointments;
