import { Paper, TextField, ListItem, MenuItem, Typography } from "@material-ui/core";
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
        marginLeft: '7%',
        marginTop: '-20%',
        padding: theme.spacing.unit*2,
        flexDirection: 'column'
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
        marginTop: "15%",
        color: "white",
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
            Email:"",
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
                    <FormControl margin="normal" fullWidth  required>
                        <TextField
                            id="Sex"
                            select
                            label="Sex"
                            name="Sex"
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Sex}                      
                        >
                            {Sexes.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl margin="normal" fullWidth required>
                        <TextField 
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
                        />
                    </FormControl>
                    <FormControl margin="auto" fullWidth required>
                        <TextField 
                            name="Email" 
                            label="Email" 
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.Email}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
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