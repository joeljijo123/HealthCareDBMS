import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import AppointmentHistory from '../Components/Appointments/AppointmentHistory'

class Appointments extends Component {
  constructor(props){
    super(props)
    this.state = {
        firstName: "",
        Facilities: []
    };
  }

  componentDidMount(){
    this.uploadFacilities();
  }

  FirstName(){
    fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.userID}`)
      .then(result => result.json())
      .then(res => {
          if(res.data.length === 1){
            this.setState({firstName: res.data[0].FirstName})                
          }
          // else{
          //     fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.userID}`)
          //     .then(result => result.json())
          //     .then(res => {
          //         if(res.data.length === 1){
          //             this.setState({firstName: res.data[0].FirstName})              
          //         }
          //     })
          //     .catch(err => console.log(err))
          // }
      })
      .catch(err => console.log(err))
    return this.state.firstName;
  }

  uploadFacilities=()=> {
    fetch(`http://157.230.214.92:4000/Facilities`)
    .then(result => result.json())
    .then(Response => this.setState({ Facilities:Response.data }))
    .catch(err => console.log(err))
}
  render() {
    return (
      <div>
        <NavigationBar title={'Welcome, '+this.FirstName()}/>
        <AppointmentHistory/>
      </div>
        
    );
  }
}

export default Appointments;
