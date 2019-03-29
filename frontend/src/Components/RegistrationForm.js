import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeLogo  from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';    
import MaskedInput from 'react-text-mask';

const Sexes = ['Male','Female']

const styles = theme => ({
    paperForm: {
        width: '25%',
        marginLeft: '7%',
        marginTop: '-15%',
        padding: theme.spacing.unit*2,
        flexDirection: 'column',
        backgroundColor: "#e0e0e0",
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: "150%",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: theme.spacing.unit*2,
    },
    middleInitial: {
        width:"15%",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        margin: theme.spacing.unit*2
    },
    heading: {
        margin: theme.spacing.unit,
        marginLeft: "70%",
        marginTop: "10%",
        color: "white",
    },
});

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
  

class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            FirstName: "",
            Minit: "",
            LastName: "",
            Sex:"",
            Email:"",
            CellNumber: " ",
            DateOfBirth:"",
            AddressStreet: "",
            AddressCity:"",
            State: "",
            AddressZip: "",
            username: "",
            password: "",

        };
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    validateUsername(){
        return true;
    }
    homeRedirect =() =>{
        window.location.replace('/');
    }
    render(){
        const {classes}=this.props;
        return(
            <div>
                <IconButton onClick={this.homeRedirect}>
                    <HomeLogo style={{color: "#212121"}} className={classes.icon} />
                </IconButton>
                <Typography variant="h3" className={classes.heading}>Medical Center Registration</Typography>
                
                <Paper elevation={10} className={classes.paperForm}>
                    <Typography>Basic Information</Typography>
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="FirstName">First Name</InputLabel>
                        <Input name="FirstName" autoFocus value={this.state.FirstName} onChange={this.handleChange}></Input>
                    </FormControl>
                    <FormControl margin="auto" fullWidth required>
                        <InputLabel htmlFor="LastName">Last Name</InputLabel>
                        <Input name="LastName" value={this.state.LastName} onChange={this.handleChange}></Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField 
                            required
                            name="username" 
                            label="Username" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.username}
                            error={!this.validateUsername()}
                            helperText={this.validateUsername() ? "":"Username is not valid"}
                        />
                    </FormControl>
                    <FormControl margin="auto" fullWidth required>
                        <TextField 
                            name="password"
                            type="password" 
                            label="Password" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.password}
                            required
                        />
                    </FormControl>
                    <FormControl margin="auto" fullWidth required>
                        <TextField 
                            name="Email" 
                            label="Email" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Email}
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
                            onChange={this.handleChange}
                            value={this.state.Sex}   
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
                            onChange={this.handleChange}
                            name="CellNumber"
                            id="Contact Number"
                            value={this.state.CellNumber}
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth >
                        <Button>
                            Next
                        </Button>
                    </FormControl>
                    
                </Paper>
            </div>
        );
    }
    
}

RegistrationForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationForm);