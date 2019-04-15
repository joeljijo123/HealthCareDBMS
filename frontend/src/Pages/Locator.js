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
 
  /*
    Geocode.setApiKey('AIzaSyDKOXGgce4aWbeOHVnhgD8S0NJJph3ShCc');
    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
        response => {
         const {lat, lng} = response.results[0].geometry.location;
          pinlat=lat;
          pinlng=lng;
          console.log(lat,lng);
        },
        error => {
          console.error(error);
        }
    );
    if(pinlat==null || pinlng==null) {
      return null
    }
    else {
      console.log(pinlat+" "+ pinlng+ "Coordinates")
      return <Marker onClick={this.onMarkerClick} name={facility.FacilityName} position={{lat: pinlat, lng: pinlng}}/>
    }
  */
  
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