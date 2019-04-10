import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import DaySchedule from '../Components/Scheduling/DaySchedule';

class Scheduling extends Component {
  render() { 
    return (
      <div>
        <NavigationBar title={"My Schedule"} Tab={2}/>
        <DaySchedule/>
      </div>
    );
  }
}

export default Scheduling;
