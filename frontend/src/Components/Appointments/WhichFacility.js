import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function WhichFacility(props){
    
    return(
        <div>
            <FormControl margin="10" fullWidth>
                    <TextField
                        id="FacilityID"
                        select
                        label="Please Choose A Facility"
                        name="FacilityID"
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.FacilityID}   
                        required                   
                    >
                        {props.val.Facilities.map(option => (
                            <MenuItem key={option.FacilityID} value={option.FacilityID}>
                                {option.FacilityName}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
        </div>
    );
}

export default WhichFacility;