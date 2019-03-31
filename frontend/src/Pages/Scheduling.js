import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './Home.css';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';

class Scheduling extends Component {
  render() { 
    return (
      <div className='Home-image'>
        <NavigationBar title={"The Scheduling Page"}/>
        <h1>Do Scheduling Stuff Here, This page is only seen by Employeess</h1>
      </div>
    );
  }
}

export default Scheduling;
