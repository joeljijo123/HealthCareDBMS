import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../Components/NavigationBar';


class Appointments extends Component {
  render() {
    return (
      <div>
        <NavigationBar title={'Welcome, '+localStorage.userID}/>
        
      </div>
        
    );
  }
}

export default Appointments;
