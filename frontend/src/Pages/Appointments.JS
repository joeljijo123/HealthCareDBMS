import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../Components/NavigationBar';



class Appointments extends Component {
  render() {
    return (
      <div style={divStyle.style}>
        <NavigationBar title={"Appointments"}/>
        
      </div>
        
    );
  }
}

export default Appointments;
