import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewAppointmentForm from './NewAppointmentForm';
import { Typography } from '@material-ui/core';

const styles = theme =>({
    root: {
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '2%',
      alignItems: "center",
      display: "flex",
      flexDirection: 'column',
      backgroundColor: "#a09d9d",
      padding: theme.spacing.unit*3
  
    },
});

function NewAppointment(){
   
};

function AppointmentHistory(props){
    
    return(
        <div>
              <h1>AppointmentHistory Page</h1>
              <NewAppointmentForm newAppointmentVals={props}/>
        </div>
    );
}

AppointmentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AppointmentHistory);
