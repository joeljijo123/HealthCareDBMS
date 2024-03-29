import React, { Component } from 'react';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import ReportsGenerator from '../Components/Administration/ReportsGenerator';
import '../Components/Administration/Report.css';

class Report extends Component {
  render() { 
    return (
      <div className='ReportsPage-image'><div/>
        <div className='ReportsPage-overlay'>
          <NavigationBar title={"Administration"} Tab={2}/>
          <ReportsGenerator/>
        </div>
      </div>
    );
  }
}

export default Report;
