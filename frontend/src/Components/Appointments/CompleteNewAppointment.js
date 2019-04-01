import React from 'react';
import { TextField, MenuItem } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });

  const TealTheme = createMuiTheme({
    palette: {
      primary: {main: '#a09d9d'},
    },
  })


  //This function should allow the user to select a time for the appointment 
function CompleteNewAppointment(props){
    const { classes } = props;
    return(
        <div>
            <FormControl margin="10" fullWidth>
                    <TextField
                        id="AppointmentTimeID"
                        select
                        label="Please Choose A Time"
                        name="AppointmentTimeID"
                        variant="standard"
                        onChange={e=>props.handleChange(e)}
                        value={props.val.AppointmentTimeID}   
                        required                   
                    >
                    {props.val.AppointmentTimes.map(option => (
                        <MenuItem key={option.TimeSlotID} value={option.TimeSlotID}>
                            {option.AppointmentTime}
                        </MenuItem>
                    ))}
                    </TextField>
                </FormControl>
        </div>
    );
}

CompleteNewAppointment.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CompleteNewAppointment);