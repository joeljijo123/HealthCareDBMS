import React from 'react';
import { GoogleApiWrapper, Marker, Map } from 'google-maps-react';


export class Mapper extends React.Component {
  constructor(props) {
    super(props)
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      isCurrMarkerShown:false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      Facilities: [],
      FacilitiesGeoCode:[],
    };
  }

  componentDidMount() {
      //upon initialization, get browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState(prevState => ({
              currentLocation: {
                ...prevState.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              isCurrMarkerShown: true
            }))
          }
        )
      } else {
        console.log("Failed to mount current location")
      }
  }
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
  });

  onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
  };

  render() {
    return (
      <div>
        <Map google={this.props.google}
          style={{width: '100vw', height: '100vh', position: 'center', margin: 'auto'}}
          className={'map'}
          zoom={12}
          center={{
            lat: this.state.currentLocation.lat,
            lng: this.state.currentLocation.lng
          }}
        >
          <Marker
                name={'Your location'}
                onClick={this.onMarkerClick}
                position={{
                  lat: this.state.currentLocation.lat,
                  lng: this.state.currentLocation.lng
                }}
          />
          <Marker
                name={'Your location'}
                onClick={this.onMarkerClick}
                position={{
                  lat: '29.705566',
                  lng: '-95.474180'
                }}
          />
          <Marker
                name={'Your location'}
                onClick={this.onMarkerClick}
                position={{
                  lat: '29.761526',
                  lng: '-95.365127'
                }}
          />
          <Marker
                name={'Your location'}
                onClick={this.onMarkerClick}
                position={{
                  lat: '29.760987',
                  lng: '-95.367759'
                }}
          />
        </Map>
      </div>
      )
   }
}

//initial centering positioned at UH.
Mapper.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -29.41,
    lng: 95.38
  },
  centerAroundCurrentLocation: false,
  visible: true
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDKOXGgce4aWbeOHVnhgD8S0NJJph3ShCc'
})(Mapper)
