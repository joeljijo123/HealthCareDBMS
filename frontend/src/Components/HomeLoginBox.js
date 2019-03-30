import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Route from 'react-router-dom/Route'

const styles = theme =>({
  root: {
    width: '25%',
    marginLeft: '65%',
    marginTop: '10%',
    alignItems: "center",
    display: "flex",
    flexDirection: 'column',
    backgroundColor: "#e0e0e0",
    padding: theme.spacing.unit*3

  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submitButton: {
      marginTop: '20px'
  }
});

class HomeLoginBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userType: null,
            firstName:null,
            Username: "",
            password: ""
        };
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        
    }
    
    handleRegistration = () => {
        window.location.replace('/Registration');
    }

    login = () => {
        fetch(`http://157.230.214.92:4000/login/${this.state.Username}`)
        .then(result => result.json())
        .then(res => {
            console.log("sdas");
            if(res.data.length === 1){
                console.log("")
                if(res.data[0].Password === this.state.password){
                    window.localStorage.setItem("loggedIn", true);
                    window.localStorage.setItem("userID", res.data[0].LoginTableID);
                    this.setUserType();
                    window.location.replace('/Appointments');
                }
                else{
                    window.localStorage.setItem("loggedIn", false);
                }
            }
            else{
                window.localStorage.setItem("loggedIn", false);
            }
        })
        .catch(err => console.log(err))

    }
    setUserType(){
        fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.userID}`)
        .then(result => result.json())
        .then(res => {
            if(res.data.length === 1){
                window.localStorage.setItem("userType", res.data[0].RoleID);                
            }
            // else{
            //     fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.userID}`)
            //     .then(result => result.json())
            //     .then(res => {
            //         if(res.data.length === 1){
            //             window.localStorage.setItem("userType", 2);                
            //         }
            //     })
            //     .catch(err => console.log(err))
            // }
        })
        .catch(err => console.log(err))
    }
    invalidTextNeeded(){
        console.log(window.localStorage.loggedIn === "false")
        return window.localStorage.loggedIn === "false";

    }
    componentDidMount() {
        window.localStorage.setItem("loggedIn", null);
        window.localStorage.setItem("userID", null);
        window.localStorage.setItem("userType", null);
    }
  render(){
    const {classes}=this.props;
    return(
      <Paper elevation={15} className={classes.root}>
        <Typography component="h1" variant="h4">
            Log In
        </Typography>
        <form className={classes.form} error>
            <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="Username">Username</InputLabel>
                <Input name="Username" autoFocus value={this.state.Username} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="Password">Password</InputLabel>
                <Input type ="password" value={this.state.password} name="password" onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl fullWidth className={classes.submitButton}>
                <Button
                variant="contained"
                onClick={this.login}
                color="primary">
                    Log In
                </Button>
            </FormControl>
            <FormControl  className={classes.submitButton}>
                <Button
                size="small"
                onClick={this.handleRegistration}
                color="primary">
                    Dont have an Account? Click here to Register
                </Button>
            </FormControl>
        </form>
      </Paper>
    );
  }
}

HomeLoginBox.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(HomeLoginBox);