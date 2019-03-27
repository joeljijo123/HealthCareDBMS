import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { Grid, TextField, Input, InputLabel, Button, FormControlLabel, Switch, MenuItem } from '@material-ui/core';

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
            userType: ""
        };
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState(state =>({
            userType: event.target.value
        }));
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
                <Input name="User ID" autoFocus></Input>
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="Password">Password</InputLabel>
                <Input type ="password" name="Password"></Input>
            </FormControl>
            <FormControl fullWidth className={classes.submitButton}>
                <Button
                type="submit"
                variant="contained"
                color="primary">
                    Log In
                </Button>
            </FormControl>
            <FormControl  alignItems="center" className={classes.submitButton}>
                <Button
                size="small"
                color="primary">
                    Dont have an Account? Click here to Register
                </Button>
            </FormControl>
            
        </form>
        
        {/* <Grid align="center">
            <FormControl className={classes.LoginWithinPaper}>
                <Typography variant="h3">Login </Typography>
                <TextField
                    id="UserName"
                    label="Username"/>
            </FormControl>
        </Grid> */}
            
      </Paper>
    );
  }
}

HomeLoginBox.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(HomeLoginBox);