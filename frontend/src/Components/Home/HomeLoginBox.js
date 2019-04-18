import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {Input, InputLabel, Button} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';

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

            openForm: false,
            Facilities: [],
            displayResults: false,
            searchCity: "",
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
        fetch(`http://162.243.165.50:4000/login/${this.state.Username}`)
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
        fetch(`http://162.243.165.50:4000/Employee/${window.localStorage.LoginTableID}`)
        .then(result => result.json())
        .then(res => {
            if(res.data.length === 1){
                window.localStorage.setItem("userType", res.data[0].RoleID); 
                window.localStorage.setItem("userID", res.data[0].EmployeeID);  
                this.setState({loggedIn:true});      
                this.updateAppTimes();
            }
            else{  
                fetch(`http://162.243.165.50:4000/Patient/${window.localStorage.LoginTableID}`)
                .then(result => result.json())
                .then(res => {
                    if(res.data.length === 1){
                        window.localStorage.setItem("userType", 2); 
                        window.localStorage.setItem("userID", res.data[0].PatientID);   
                        this.setState({loggedIn:true});   
                        this.updateAppTimes();          
                    }
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    }
    updateAppTimes(){
        fetch(`http://162.243.165.50:4000/AppUpdate/`)
        .then(result => result.json())

    }
    componentDidMount() {
        window.localStorage.setItem("userID", null);
        window.localStorage.setItem("userType", null);
        window.localStorage.setItem("LoginTableID", null);
        window.localStorage.setItem("loggedIn", false);
    }
  getFacilities=()=> {
      fetch(`http://162.243.165.50:4000/Facilities/${this.state.searchCity}`)
      .then(result => result.json())
      .then(res => this.setState({ Facilities:res.data}))
      .catch(err => console.log(err))
  };
  displaySearchRes = _ => {
    this.getFacilities();
      this.setState({
          displayResults: true
      });
  }
  handleClickOpen = () => {
  this.setState({ openForm: true });
  };

  handleClose = () => {
     this.setState({ 
        Facilities: [],
        searchCity: "",
        displayList: false,
        openForm:false,
     });
  };
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
                  <FormControl  className={classes.submitButton}>
                      <Button
                      size="small"
                      onClick={this.handleClickOpen}
                      color="primary">
                          Need to find one of our Clinics?
                      </Button>
                  </FormControl>
              </form>
         
      
                <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Locations</DialogTitle>
                     <form noValidate autoComplete="off">
                        <FormControl  margin="dense" fullWidth>
                            <TextField
                              name="searchCity"
                              label="City Vicinity to Search"
                              variant="outlined"
                              value={this.state.searchCity}
                              onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl margin="dense">
                            <Button variant="contained" size="small" className={classes.editerButtons} onClick={this.displaySearchRes}>
                                <SearchIcon />
                            </Button>
                        </FormControl>
                      </form>
                    <DialogContent>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Facility Name</TableCell>
                                    <TableCell align="center">Street Address</TableCell>
                                    <TableCell align="center">City</TableCell>
                                    <TableCell align="center">State</TableCell>
                                    <TableCell align="center">Zip</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.displayResults &&
                                        this.state.Facilities.map(Each => (
                                            <TableRow key={Each.FacilityID}>
                                                <TableCell align="center">{Each.FacilityName}</TableCell>
                                                <TableCell align="center">{Each.AddressStreet}</TableCell>
                                                <TableCell align="center">{Each.AddressCity}</TableCell>
                                                <TableCell align="center">{Each.AddressState}</TableCell>
                                                <TableCell align="center">{Each.AddressZip}</TableCell>
                                            </TableRow>
                                        ),)
               
                            }
                                
                            </TableBody>
                        </Table>                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
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