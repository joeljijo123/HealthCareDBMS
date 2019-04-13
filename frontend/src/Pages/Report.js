import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import ReportsGenerator from '../Components/Report/ReportsGenerator';

class Report extends Component {
  render() { 
    return (
      <div>
        <NavigationBar title={"Analytical Reports"} Tab={3}/>
        <ReportsGenerator/>
      </div>
    );
  }
}

export default Report;
