import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './Home.css';
import NavigationBar from '../Components/NavigationBar';
import HomeLoginBox from '../Components/HomeLoginBox';
import LoginImage from '../Components/BackgroundPicture.jpg';

class Home extends Component {
  render() { 
    return (
      <div className='Home-image'>
        <NavigationBar title={"Team 7 Medical Database Project"}/>
        <HomeLoginBox/>
      </div>
    );
  }
}

export default Home;
