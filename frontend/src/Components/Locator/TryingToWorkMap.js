import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, InfoWindow, Marker, Geocoder, Map, google } from 'google-maps-react';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Geocode from "react-geocode";

export class TryingToWorkMap extends React.Component {
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
      this.getFacilities();
  }
  getFacilities=()=> {
      fetch(`http://162.243.165.50:4000/Facilities`)
      .then(result => result.json())
      .then(res => this.setState({ Facilities:res.data}))
      .catch(err => console.log(err))
  };
  facilityPins() {
      console.log("Made it this far ");
      this.state.Facilities.map((facility) => {
      var geocoder = new Geocoder();
      var plat='';
      var plng='';
      var address = facility.AddressStreet +' '+ facility.AddressCity +' '+ facility.AddressZip;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === 'OK') {
           plat = results[0].geometry.location.lat();
           plng = results[0].geometry.location.lng();
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
      console.log('Latitude: ' + plat + ' Logitude: ' + plng);
      return <Marker 
                position={{ lat:plat, lng:plng }}
                onClick={this.onMarkerClick}
                name={facility.FacilityName}
              />
  })}
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
  async uploadFacilityCodes(){
      Geocode.setApiKey("AIzaSyDKOXGgce4aWbeOHVnhgD8S0NJJph3ShCc");
      var coordinates = {lat: '', lng: ''};
      const codes=[];
      var i;
      if(this.state.FacilitiesGeoCode.length !== this.state.Facilities.length){
        for (i = 0; i < this.state.Facilities.length; i++) { 
          var address=this.state.Facilities[i].AddressStreet + ' '+ this.state.Facilities[i].AddressCity + ' '+ this.state.Facilities[i].AddressZip;
          const r = await Geocode.fromAddress(address)
          if (r == null) continue; // or display error message or whatever
          codes.push(r)
          
          // Geocode.fromAddress(address).then(
          //   response => {
          //     coordinates.lat = response.results[0].geometry.location.lat;
          //     coordinates.lng = response.results[0].geometry.location.lng;
          //     codes.push(coordinates);
          //   },
          //   error => {
          //     console.error(error);
          //   }
          // );
        }
        this.setState({codes});
      console.log(this.state.codes)
      }
      
      
  }
  showAllMarkers(){
    var i;
    for( i=0;i<2;i++){
      return (
        
        <Marker
              name={'Your location'}
              onClick={this.onMarkerClick}
              position={{
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng
              }}
            />
      )
    }
    
  }
  render() {
    return (
      <div>
        {this.uploadFacilityCodes()}
        <Map google={this.props.google}
          style={{width: '75vw', height: '75vh', position: 'center'}}
          className={'map'}
          zoom={14}
          center={{
            lat: this.state.currentLocation.lat,
            lng: this.state.currentLocation.lng
          }}
        >
          {/* {this.state.FacilitiesGeoCode.map(Facility =>(
              console.log(Facility)
              // <Marker
              //   name={'Your location'}
              //   onClick={this.onMarkerClick}
              //   position={{
              //     lat: Facility.lat,
              //     lng: Facility.lng
              //   }}
              // />
          ))}  */}
        </Map>
      </div>
      )
   }
}

//initial centering positioned at UH.
TryingToWorkMap.defaultProps = {
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
})(TryingToWorkMap)