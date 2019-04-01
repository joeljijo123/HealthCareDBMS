import { TextField, MenuItem } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const TealTheme = createMuiTheme({
    palette: {
      primary: {main: '#a09d9d'},
    },
    overrides: {
        MuiPickersToolbar: {
          toolbar: {
            backgroundColor: teal[600],
          },
        },
        MuiPickersDay: {
          day: {
            color: teal[600],
          },
          isSelected: {
            backgroundColor: teal["600"],
          },
          current: {
            color: teal["600"],
          },
        },
        MuiPickersModal: {
          dialogAction: {
            color: teal["600"],
          },
        },
      },
  })

function WhichDoctor(props){
    
    return(
        <div>
            <FormControl margin="10" fullWidth>
                    <TextField
                        id="DoctorID"
                        select
                        label="Please Choose A Doctor"
                        name="DoctorID"
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.DoctorID}   
                        required                   
                    >
                    {props.val.Doctors.map(option => (
                        <MenuItem key={option.EmployeeID} value={option.EmployeeID}>
                            Dr. {option.FirstName}
                        </MenuItem>
                    ))}
                    </TextField>
                    <MuiThemeProvider theme={TealTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                    
                        <DatePicker
                            minDate={new Date()}
                            label="Desired Delivery"
                            value={props.val.AppointmentDate}
                            onChange={e=> props.AppointmentDateChange(e)}
                        />

                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
                </FormControl>
        </div>
    );
}

export default WhichDoctor;
