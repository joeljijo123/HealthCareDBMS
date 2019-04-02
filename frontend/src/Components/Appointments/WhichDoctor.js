import { TextField, MenuItem } from "@material-ui/core";
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const TealTheme = createMuiTheme({
    palette: {
      primary: {main: '#a09d9d'},
    },
   
  })

function WhichDoctor(props){
    const [selectedDate, handleDateChange] = useState(new Date());
    return(
        <div>
            <FormControl margin="10" fullWidth>
                    <TextField
                        id="DoctorID"
                        select
                        label="Please Choose A Doctor"
                        name="DoctorID"
                        variant="standard"
                        onChange={e=>props.handleChange(e)}
                        value={props.val.DoctorID}   
                        required                   
                    >
                    {props.val.Doctors.map(option => (
                        <MenuItem key={option.EmployeeID} value={option.EmployeeID}>
                            Dr. {option.FirstName}
                        </MenuItem>
                    ))}
                    </TextField>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            minDate={new Date()}
                            label="Desired Delivery"
                            name="AppointmentDate"
                            value={props.val.AppointmentDate}
                            onChange={props.AppointmentDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
        </div>
    );
}

export default WhichDoctor;
