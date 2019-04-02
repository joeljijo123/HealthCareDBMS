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
