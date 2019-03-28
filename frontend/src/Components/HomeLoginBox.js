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
    marginLeft: '70%',
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
            userID: "",
            password: ""
        };
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        if(e.target.name === "userID"){
            window.localStorage.setItem(e.target.name, e.target.value);
        }
        
    }
    handleRegistration = () => {
        window.location.replace('/Registration');
    }
    login = () => {
        //query to check the user an make syre they are in the database
        window.location.replace('/Appointments');
        window.localStorage.setItem("loggedIn", true);
        console.log(this.state.password)
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
        <form className={classes.form}>
            <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="User ID">User Id</InputLabel>
                <Input name="userID" autoFocus value={this.state.userID} onChange={this.handleChange}></Input>
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