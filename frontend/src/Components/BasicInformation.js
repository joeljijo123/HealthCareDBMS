import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';  
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types'; 


const userTypes = ['Doctor','Patient','Administrator']

function validateUsername(){
    return true;
};

function BasicInformation(props){
    
    return(
        <div>
             <Typography>Registration Information</Typography>
                <FormControl margin="normal" fullWidth required>
                    <InputLabel htmlFor="FirstName">First Name</InputLabel>
                    <Input name="FirstName" autoFocus value={props.val.FirstName} onChange={props.handleChange}></Input>
                </FormControl>
                <FormControl margin="auto" fullWidth required>
                    <InputLabel htmlFor="LastName">Last Name</InputLabel>
                    <Input name="LastName" value={props.val.LastName} onChange={props.handleChange}></Input>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField 
                        required
                        name="username" 
                        label="Username" 
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.username}
                        error={!validateUsername()}
                        helperText={validateUsername() ? "":"Username is not valid"}
                    />
                </FormControl>
                <FormControl margin="auto" fullWidth required>
                    <TextField 
                        name="password"
                        type="password" 
                        label="Password" 
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.password}
                        required
                    />
                </FormControl>
                <FormControl margin="auto" fullWidth>
                    <TextField
                        id="userType"
                        select
                        label="Type of User"
                        name="userType"
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.userType}   
                        required                   
                    >
                        {userTypes.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <FormControl margin="auto" fullWidth required>
                    <TextField 
                        name="Email" 
                        label="Email" 
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.Email}
                        required
                    />
                </FormControl>
        </div>
    );
}

export default BasicInformation;