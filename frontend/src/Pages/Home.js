import React, { Component } from 'react';
import './Home.css';
import NavigationBar from '../Components/GeneralComponents/NavigationBar';
import HomeLoginBox from '../Components/Home/HomeLoginBox';

//</div>
class Home extends Component {
  render() { 
    return (
      <div className='Home-image'>
        <div className='Home-overlay'>
          <NavigationBar title={"Team 7 Medical Database Project"}/>
            <HomeLoginBox/>
        </div>
      </div>
    );
  } 
}

export default Home;
