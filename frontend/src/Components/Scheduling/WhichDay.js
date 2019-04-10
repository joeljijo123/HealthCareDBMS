import { TextField, MenuItem } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';

function WhichDay(props){
    
    return(
        <div>
            <FormControl margin="normal" fullWidth>
                    <TextField
                        id="DayID"
                        select
                        label="Please Choose A Day"
                        name="DayID"
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.DayID}   
                        required                   
                    >
                        {props.val.OpenDays.map(option => (
                            <MenuItem key={option.DayID} value={option.DayID}>
                                {option.WeekDay}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
        </div>
    );
}

export default WhichDay;