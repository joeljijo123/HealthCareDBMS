import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';

class Scheduling extends Component {
  render() { 
    return (
      <div>
        <NavigationBar title={"The Scheduling Page"} Tab={2}/>
        <h1>Do Scheduling Stuff Here, This page is only seen by Employeess</h1>
      </div>
    );
  }
}

export default Scheduling;
