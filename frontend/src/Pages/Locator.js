import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from "@material-ui/core";
import MapGen from '../Components/Locator/MapGen'
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
      width: '85vw',
      height: '85vh',
      flexDirection: 'column',
      backgroundColor: "#a09d9d",
      margin:"center",
      display: 'flex',

    },
});

export class Locator extends React.Component {

  render() { 
    const{classes}=this.props;
    return (
      <div className={classes.background}>
      <div className={classes.mapContainer}>
         <MapGen/>
      </div>
      </div>
    );
  }
}

Locator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locator);