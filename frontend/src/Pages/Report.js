import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import ReportsGenerator from '../Components/Report/ReportsGenerator';
import '../Components/Report/Report.css';

class Report extends Component {
  render() { 
    return (
      <div className='ReportsPage-image'><div/>
        <div className='ReportsPage-overlay'>
          <NavigationBar title={"Analytical Reports"} Tab={3}/>
          <ReportsGenerator/>
        </div>
      </div>
    );
  }
}

export default Report;
