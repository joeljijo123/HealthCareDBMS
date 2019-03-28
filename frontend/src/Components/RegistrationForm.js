import { Paper, TextField, ListItem, MenuItem } from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeLogo  from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';    
import blue from '@material-ui/core/colors/';

const Sexes = ['Male','Female']

const styles = theme => ({
    paperForm: {
        width: '25%',
        margin: 'auto',
        marginTop: '1%',
        padding: theme.spacing.unit*2,
        flexDirection: 'column'
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: "190%",
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
        align: 'center',
        marginTop: '5%',
    },
});


class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            FirstName: "",
            Minit: "",
            LastName: "",
            Sex:"",
            DateOfBirth:"",
            CellNumber: "",
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
                <h1 align='center'>Medical System Registration Form</h1>
                <Paper elevation={10} className={classes.paperForm}>
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="FirstName">First Name</InputLabel>
                        <Input name="FirstName" autoFocus value={this.state.FirstName} onChange={this.handleChange}></Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="LastName">Last Name</InputLabel>
                        <Input name="LastName" value={this.state.LastName} onChange={this.handleChange}></Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth  required>
                        <TextField
                            id="Sex"
                            select
                            label="Sex"
                            name="Sex"
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Sex}
                            margin="normal"                       
                        >
                            {Sexes.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl margin="auto" fullWidth required>
                        <TextField 
                            name="username" 
                            label="Username" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Sex}
                            margin="normal"
                            error={!this.validateUsername()}
                            helperText={this.validateUsername() ? "":"Username is not valid"}
                        />
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