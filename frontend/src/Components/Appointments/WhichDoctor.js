import { TextField, MenuItem } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';


function WhichDoctor(props){
    return(
        <div>
            <FormControl margin="normal" fullWidth>
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
                    <TextField 
                        name="Reason"
                        label="Reason for Appointment" 
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.Reason}
                        inputProps={{ maxLength: 100 }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            minDate={new Date()}
                            label="Appointment Date"
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
