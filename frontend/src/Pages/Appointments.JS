
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../Components/NavigationBar';


class Appointments extends Component {
  constructor(props){
    super(props)
    this.state = {
        firstName: "",
    };
}
  FirstName(){
    fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.userID}`)
      .then(result => result.json())
      .then(res => {
          if(res.data.length === 1){
            this.setState({firstName: res.data[0].FirstName})                
          }
          // else{
          //     fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.userID}`)
          //     .then(result => result.json())
          //     .then(res => {
          //         if(res.data.length === 1){
          //             this.setState({firstName: res.data[0].FirstName})              
          //         }
          //     })
          //     .catch(err => console.log(err))
          // }
      })
      .catch(err => console.log(err))
    return this.state.firstName;
  }
  render() {
    
    
    return (
      <div>
        <NavigationBar title={'Welcome, '+this.FirstName()}/>
        
      </div>
        
    );
  }
}

export default Appointments;
