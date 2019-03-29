import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';  
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types'; 

const Sexes = ['Male','Female']

function TextMaskCustom(props) {
    const {...other } = props;
  
    return (
      <MaskedInput
        {...other}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
function validateUsername(){
    return true;
};
function stepNext(props){
    props.val.RegistrationStep=5;
};
function BasicInformationPtTwo(props){
    
    return(
        <div>
             <Typography>Basic Information Part 2</Typography>
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
                <FormControl margin="auto" fullWidth>
                    <TextField
                        id="Sex"
                        select
                        label="Gender"
                        name="Sex"
                        variant="standard"
                        onChange={props.handleChange}
                        value={props.val.Sex}   
                        required                   
                    >
                        {Sexes.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="CellNuber">Contact Number</InputLabel>
                    <Input
                        onChange={props.handleChange}
                        name="CellNumber"
                        id="Contact Number"
                        value={props.val.CellNumber}
                        inputComponent={TextMaskCustom}
                    />
                </FormControl>
        </div>
    );
}

export default BasicInformationPtTwo;