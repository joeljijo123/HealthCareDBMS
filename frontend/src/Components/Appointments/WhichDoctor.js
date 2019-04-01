import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                </FormControl>
        </div>
    );
}

export default WhichDoctor;