import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './Home.css';
import NavigationBar from '../Components/NavigationBar';
import HomeLoginBox from '../Components/HomeLoginBox';
import LoginImage from '../Components/BackgroundPicture.jpg';

const divStyle = {
  style: {
    width: '100%',
    minHeight: '937px',
    maxHeight: '1000px',
    backgroundImage: `url(${LoginImage})`,
  },

};
class Home extends Component {
  render() {
    return (
      <div style={divStyle.style}>
        <NavigationBar/>
        <HomeLoginBox/>
        
        {/* <div className="BackgroundImage" style={divStyle.style} >
          <div className={divStyle.root}>
            sdsdsds
          </div>
        </div> */}
      </div>
        
    );
  }
}

export default Home;
