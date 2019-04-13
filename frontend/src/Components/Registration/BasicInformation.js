import { TextField,  MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel} from '@material-ui/core';  


function validateUsername(){
    return true;
};
function validatePassword(props){
    if(props.val.password.length >=6 || props.val.password.length <=1 ){
        return true;
    }
    return false;
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
                        error={!validatePassword(props)}
                        onChange={props.handleChange}
                        value={props.val.password}
                        required
                    />
                </FormControl>
                {(window.localStorage.userType === "3") ? (
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
                            {props.val.roles.map(option => (
                                <MenuItem key={option.RoleID} value={option.RoleID}>
                                    {option.RoleTitle}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                ):(
                    <div></div>
                )}
                    
                <FormControl margin="auto" fullWidth required>
                    <TextField 
                        name="Email" 
                        label="Email" 
                        variant="standard"
                        type="email"
                        onChange={props.handleChange}
                        value={props.val.Email}
                        required
                    />
                </FormControl>
        </div>
    );
}

export default BasicInformation;