import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeLogo  from '@material-ui/icons/Home';
import LockLogo  from '@material-ui/icons/LockOpenOutlined';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import {Button} from '@material-ui/core';    
import BasicInformation from '../Registration/BasicInformation';
import BasicInformationPtTwo from '../Registration/BasicInformationPtTwo';


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

class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            FirstName: "",
            LastName: "",
            Sex: "",
            Email:"",
            username: "",
            password: "",
            CellNumber: "",
            AddressStreet: "",
            AddressCity:"",
            AddressState: "",
            AddressZip: "",
            DateOfBirth:"",
            SSN: "",
            userType: "",
            registrationStep: 0,
            raceID: "",
            states:[],
            sexes:[],
            roles:[],
            races:[],
            completion: false,

        };
        this.handleChange=this.handleChange.bind(this);
    }
    moveNextInvalid(){
        return  this.state.FirstName === ""||
                this.state.LastName === "" ||
                this.state.username === "" ||
                this.state.password === "" ||
                this.state.Email === ""
    }
    RegisterInvalid(){
        return  this.state.Sex === "" ||
                this.state.CellNumber.length !== 12 ||
                this.state.AddressStreet === "" ||
                this.state.AddressCity === "" ||
                this.state.AddressState === "" ||
                this.state.AddressZip.length !== 5 ||
                this.state.DateOfBirth.length !== 10 ||
                this.state.SSN.length !== 11 
    }
    componentDidMount(){
        this.uploadStates();
        this.uploadSexes();
        this.uploadRoles();
        this.uploadRaces();
    }
    handleChange = e =>{
        console.log(this.state.userType)
        if(window.localStorage.loggedIn !== "true"){
            this.setState({ userType:2})
        }
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    registerUser=()=>{
        //backend call to add the user to the backend
        fetch(`http://162.243.165.50:4000/RegisterUser`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Sex: this.state.Sex,
                Email: this.state.Email,
                username: this.state.username,
                password: this.state.password,
                CellNumber: this.state.CellNumber,
                AddressStreet: this.state.AddressStreet,
                AddressCity: this.state.AddressCity,
                AddressState: this.state.AddressState,
                AddressZip: this.state.AddressZip,
                DateOfBirth: this.state.DateOfBirth,
                SSN: this.state.SSN,
                userType:this.state.userType,
                raceID: this.state.raceID
            })
        })
        .then(this.setState({completion:true}))
        .catch(err => console.log(err))
        
    }
    
    LoginDirect(){
        window.location.replace('/')
    }
    homeRedirect = () =>{
        window.location.replace('/DoctorRegistration')
    }
    
    stepNext=()=>{
        this.setState(state => ({
            registrationStep:state.registrationStep+1
        }))
    }

    uploadStates=()=> {
        fetch(`http://162.243.165.50:4000/states`)
        .then(result => result.json())
        .then(Response => this.setState({ states:Response.data }))
        .catch(err => console.log(err))
    }
    uploadSexes=()=> {
        fetch(`http://162.243.165.50:4000/sexes`)
        .then(result => result.json())
        .then(Response => this.setState({ sexes:Response.data }))
        .catch(err => console.log(err))
    }
    uploadRoles=()=> {
        fetch(`http://162.243.165.50:4000/roles`)
        .then(result => result.json())
        .then(Response => this.setState({ roles:Response.data }))
        .catch(err => console.log(err))
    }
    uploadRaces=()=> {
        fetch(`http://162.243.165.50:4000/races`)
        .then(result => result.json())
        .then(Response => this.setState({ races:Response.data }))
        .catch(err => console.log(err))
    }
    render(){
        const {classes}=this.props;
        return(
            <div>
                <IconButton onClick={this.LoginDirect}>
                    {window.localStorage.loggedIn !== "true" ? (
                        <HomeLogo style={{color: "#212121"}} className={classes.icon} />
                    ):(
                        <LockLogo style={{color: "#212121"}} className={classes.icon} />
                    )}
                </IconButton>
                <Typography variant="h3" className={classes.heading}>Medical Center Registration</Typography>
                <Paper elevation={10} className={classes.paperForm}>
                    {this.state.registrationStep===0 ? (
                        <div>
                            <BasicInformation handleChange={this.handleChange} val={this.state}/>
                            <FormControl margin="normal" fullWidth >
                                <Button onClick={this.stepNext} disabled={this.moveNextInvalid()}>
                                    Next
                                </Button>
                            </FormControl>
                        </div>
                    ):(
                        <div>
                            <BasicInformationPtTwo handleChange={this.handleChange} val={this.state}/>
                            <FormControl margin="normal" fullWidth >
                                <Button disabled={this.RegisterInvalid()} onClick={this.registerUser}>
                                    Register
                                </Button>
                            </FormControl>
                        </div>

                    )}
                </Paper>
                    {window.localStorage.userType !== "3" ? (
                        <Dialog maxWidth="md" open={this.state.completion}>
                            <DialogTitle id="form-dialog-title"></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Welcome to T7 Clinics {this.state.FirstName}, please proceed to the login page to book your first appointment
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.LoginDirect} color="primary" fullWidth variant="contained">
                                    Login
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ):(
                        <Dialog maxWidth="md" open={this.state.completion}>
                            <DialogTitle id="form-dialog-title"></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Thank you for registering {this.state.FirstName}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.homeRedirect} fullWidth color="primary" variant="contained">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
            </div>
        );
    }
    
}

RegistrationForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationForm);