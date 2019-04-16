import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from "@material-ui/core";
import MapGen from '../Components/Locator/MapGen'
import TryingToWorkMap from '../Components/Locator/TryingToWorkMap';
import HomeLogo  from '@material-ui/icons/Home';

const styles = theme => ({
    background: {
      backgroundImage: '../Components/Home/BackgroundPicture.jpg',
      /* Full height */
      height: '100vh',
      /* Center and scale the image nicely */
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
    },
    mapContainer: {
      width: '100vw',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: "#a09d9d",
      margin:"auto",
      display: 'flex',

    },
    icon: {
      margin: 'auto',
      fontSize: "150%",
  },
});

export class Locator extends React.Component {

  render() { 
    const{classes}=this.props;
    return (
      <div className={classes.mapContainer}>
      <TryingToWorkMap/>
        <IconButton>
            <HomeLogo style={{color: "#212121"}} className={classes.icon} />
        </IconButton>
         
      </div>
    );
  }
}

Locator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locator);