import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';
import AppointmentHistory from '../Appointments/AppointmentHistory';

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
            password: "",
            loggedIn: false,
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
            if(res.data.length === 1){
                if(res.data[0].Password === this.state.password){
                    window.localStorage.setItem("loggedIn", 'true');
                    window.localStorage.setItem("LoginTableID", res.data[0].LoginTableID);
                    this.setUserType();                }
                else{
                    window.localStorage.setItem("loggedIn", 'false');
                }
            }
            else{
                window.localStorage.setItem("loggedIn", 'false');
            }
        })
        .catch(err => console.log(err))
    }
    setUserType(){
        fetch(`http://157.230.214.92:4000/Employee/${window.localStorage.LoginTableID}`)
        .then(result => result.json())
        .then(res => {
            if(res.data.length === 1){
                window.localStorage.setItem("userType", res.data[0].RoleID); 
                window.localStorage.setItem("userID", res.data[0].EmployeeID);  
                this.setState({loggedIn:true});      
            }
            else{  
                fetch(`http://157.230.214.92:4000/Patient/${window.localStorage.LoginTableID}`)
                .then(result => result.json())
                .then(res => {
                    if(res.data.length === 1){
                        window.localStorage.setItem("userType", 2); 
                        window.localStorage.setItem("userID", res.data[0].PatientID);   
                        this.setState({loggedIn:true});             
                    }
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    }
    componentDidMount() {
        window.localStorage.setItem("userID", null);
        window.localStorage.setItem("userType", null);
        window.localStorage.setItem("LoginTableID", null);
    }
  render(){
    const {classes}=this.props;
    if(this.state.loggedIn === false){
        return(
            <Paper elevation={15} className={classes.root}>
              <Typography component="h1" variant="h4">
                  Log In
              </Typography>
              <form className={classes.form}>
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
    else return(
        <div>{window.location.replace('/Appointments')}</div>
    );
    
  }
}

HomeLoginBox.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(HomeLoginBox);