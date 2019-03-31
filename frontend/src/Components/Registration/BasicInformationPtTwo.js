import { Paper, TextField, ListItem, MenuItem, Typography, Grid } from "@material-ui/core";
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';  
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types'; 

const Sexes = [
    {
        gender: 'Male',
        genderId: 1
    },
    {
        gender:'Female',
        genderId:2
    }
];


function TextMaskCustom(props) {
    const {...other } = props;
  
    return (
      <MaskedInput
        {...other}
        guide={false}
        mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
function DateMaskCustom(props) {
    const {...other } = props;
  
    return (
      <MaskedInput
        guide={false}
        {...other}
        mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

function SSNMaskCustom(props) {
    const {...other } = props;

  
    return (
      <MaskedInput
        guide={false}
        {...other}
        mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

function BasicInformationPtTwo(props){
    
    return(
        <div>
            <Typography>Personal Information</Typography>
            <Typography>{props.val.AddressState}</Typography>
            <FormControl margin="auto" fullWidth required>
                <InputLabel htmlFor="AddressStreet">Street Address</InputLabel>
                <Input name="AddressStreet" autoFocus value={props.val.AddressStreet} onChange={props.handleChange}></Input>
            </FormControl>
            <Grid container spacing={8}>
                <Grid item xs={12} sm={5}>
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="AddressCity">City</InputLabel>
                        <Input name="AddressCity" autoFocus value={props.val.AddressCity} onChange={props.handleChange}></Input>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            id="State"
                            select
                            label="State"
                            name="AddressState"
                            variant="standard"
                            onChange={props.handleChange}
                            value={props.val.AddressState}   
                            required                   
                        >
                            {props.val.states.map(option => (
                                <MenuItem key={option.StateID} value={option.StateID}>
                                    {option.StateString}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="AddressZip">Zip Code</InputLabel>
                        <Input name="AddressZip" autoFocus value={props.val.AddressZip} onChange={props.handleChange}></Input>
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="DateOfBirth">Date Of Birth</InputLabel>
                <Input name="DateOfBirth" placeholder="YYYY-MM-DD" value={props.val.DateOfBirth}  inputComponent={DateMaskCustom} onChange={props.handleChange}></Input>
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
                    {props.val.sexes.map(option => (
                        <MenuItem key={option.SexID} value={option.SexID}>
                            {option.Gender}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
            <FormControl margin="auto" fullWidth>
                <TextField
                    id="Race"
                    select
                    label="Race"
                    name="raceID"
                    variant="standard"
                    onChange={props.handleChange}
                    value={props.val.raceID}   
                    required                   
                >
                    {props.val.races.map(option => (
                        <MenuItem key={option.RaceID} value={option.RaceID}>
                            {option.Race}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="SSN">Social Security</InputLabel>
                <Input name="SSN" placeholder="XXX-XX-XXXX" inputComponent={SSNMaskCustom} value={props.val.SSN} onChange={props.handleChange}></Input>
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