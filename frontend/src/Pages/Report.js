import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import AppointmentReports from '../Components/Report/AppointmentReports';

class Report extends Component {
  render() { 
    return (
      <div>
        <NavigationBar title={"The Reports Page"} Tab={3}/>
        <AppointmentReports/>
      </div>
    );
  }
}

export default Report;
