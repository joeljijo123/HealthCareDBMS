import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

  
class AppointmentHistory extends Component {
    render() { 
        const {classes}=this.props;
        return (
        <div >
            <Paper className={classes.root}>
                <h1>This is the Appointment History Page</h1>
            </Paper>
        </div>
        );
    }
}

AppointmentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AppointmentHistory);
