import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewAppointmentForm from './NewAppointmentForm';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControl, Grid, Paper, MenuItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddDiagnosis from './AddDiagnosis';
import ShowDiagnosis from './ShowDiagnosis';
import ShowPrescriptions from './ShowPrescriptions';
import AddPrescription from './AddPrescription';
import AddSpecialistReccomendation from './AddSpecilaistReccomendation';
import './AppointmentPage.css';
import PatientMedicalHistory from './PatientMedicalHistory';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme =>({
    root: {
        width: '75%',
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    page: {
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    AdditionButton: {
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit,
  
    },
    Button: {
        marginTop: '.5%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '19%',
        flexShrink: 0,
    },
    iconHistory: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '3%',
        flexShrink: 10,
    },
    secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '100%',
    margin: 'auto'
    },
    Paper: {
        width: '55%',
        display: "flex",
        flexDirection: 'column',
        padding: theme.spacing.unit*3,
        marginTop:"5%",
        marginBottom:"5%",
        margin:"auto"
  
    },
});


class AppointmentHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expanded: null,
            Appointments: [],
            Diagnosis: [],
            cancelApptShow: false,
			selectedAppt: "",
            openForm: false, 
            PatientIDs:[],
            AdminPatient: -1,
        };
    }
    componentDidMount(){
        this.grabAppointments();
        this.grabPatientIDs();
    }
    grabPatientIDs(){
        fetch(`http://162.243.165.50:4000/Patients`)
        .then(result => result.json())
        .then(Response => this.setState({ PatientIDs:Response.data }))
        .catch(err => console.log(err))
    }
    grabAppointments=()=>{
        //backend call to grab the appointments for the user
        fetch(`http://162.243.165.50:4000/Appointments/`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                UserType: window.localStorage.userType,
                UserID: window.localStorage.userID,
            })
        })
        .then(result => result.json())
        .then(Response => this.setState({ Appointments:Response.data}))
        .catch(err => console.log(err));
        
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    }
    handleProper = e =>  {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    placeDiagnosis(){
        this.state.Diagnosis.map(option => (
            <FormControl>
                <Typography>Diagnosis: {option.Diagnosis}</Typography>
                <Typography>Number of Refills:  {option.RefillLeft}</Typography>
                <Typography>Due Date: {option.DueDate.substr(0,10)}</Typography>
                <Typography>Medicine: {option.Medicine}</Typography>
            </FormControl>
        ))
    }
    handleAppointmentCancel = (AppID) => {
        fetch(`http://162.243.165.50:4000/CancelAppointment/`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                AppointmentID: AppID,
            })
        })
        .then(this.grabAppointments)
        .catch(err => console.log(err));
		setTimeout(function(){
			window.location.replace('/Appointments')
		}, 200);
    };
	
	handleClickOpenCancellation = (apptID) => {
		this.setState({ selectedAppt: apptID });
        this.setState({ openForm: true });
    };

    handleCloseCancellation = () => {
        this.setState({ openForm: false });
    };
	
    render(){
        const{classes}=this.props;
        const { expanded } = this.state;
        return(
            <div className={classes.page}>
                <div className='AppointmentPage-SmallBoxOverLay'>
                <div className={classes.root}>
                <h1 className='AppointmentHistory-h1'>All Appointments</h1>
                    {this.state.Appointments.map(option => (
                            <FormControl key={option.idAppointment} fullWidth>
                                <ExpansionPanel square expanded={expanded === option.idAppointment}  onChange={this.handleChange(option.idAppointment)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Patient: <b>{option.Patient}</b></Typography>
                                        <Typography className={classes.heading}>Doctor: Dr. <b>{option.Doctor}</b></Typography>
                                        <Typography className={classes.heading}>Date: <b>{option.AppointmentDate.substr(0,10)}</b></Typography>
                                        <Typography className={classes.heading}>Time: <b>{option.AppointmentTime.substr(0,5)}</b></Typography>
                                        <Typography className={classes.heading}>Status: <b>{option.currentStatus}</b></Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography className={classes.secondaryHeading}>
                                            Reason:{option.Reason === "null" ? (<text> No Reason Specified</text>):(<text>{option.Reason}</text>)} <br/>
                                            AppointmentID: {option.idAppointment} <br/>
                                            Facility: {option.FacilityName} <br/>
                                            Address: {option.Street}, {option.City}, {option.State} {option.ZipCode}<br/>
                                            Doctor Reccomentation: {option.Specialist === null || option.Specialist === "" ? (<text>No Doctor Reccomendations</text>):(<text>Dr. {option.Specialist}</text>)}<br/>
                                            {(window.localStorage.userType !== "2" &&  window.localStorage.userType !== "3")? (
                                                <Grid container spacing={8}>
                                                    <Grid item xs={12} sm={4}>  
                                                        <AddDiagnosis Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <AddSpecialistReccomendation  Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>  
                                                        <AddPrescription Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                </Grid>
                                            ):(
                                                <div>
                                                </div>
                                            )}
                                            {window.localStorage.userType !=="2" ? (
                                                <Grid container spacing={8}>
                                                    <Grid item xs={12} sm={4}>
                                                        <ShowDiagnosis  Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <PatientMedicalHistory Button={classes.Button} PatientID={option.PatientID}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <ShowPrescriptions  Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                </Grid>
                                            ):(
                                                <Grid container spacing={8}>
                                                    <Grid item xs={12} sm={6}>
                                                        <ShowDiagnosis  Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <ShowPrescriptions  Button={classes.Button} AppID={option.idAppointment}/>
                                                    </Grid>
                                                </Grid>
                                            )}
                                            
                                            {window.localStorage.userType === "3" ? (
                                                    <Grid container spacing={8}>
                                                        <Grid item xs={12} sm={6}>  
                                                            <NewAppointmentForm PatientID={option.PatientID}/>                                                        
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Button variant="raised" fullWidth  className={classes.Button} color="secondary"  onClick={() =>  this.handleClickOpenCancellation(option.idAppointment) } marginTop="10%">
                                                                Cancel Appointment
                                                            </Button>  
                                                            
                                                            <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleCloseCancellation}>
                                                                <DialogTitle id="form-dialog-title"></DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText>
                                                                        Are you sure you want to cancel appointment {this.state.selectedAppt}?
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button className={classes.Button} onClick={this.handleCloseCancellation} color="primary" variant="contained">
                                                                        No
                                                                    </Button>
                                                                    <Button className={classes.Button} onClick={() => this.handleAppointmentCancel(this.state.selectedAppt)} color="secondary" variant="contained">
                                                                        Yes
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                            
                                                        </Grid>
                                                    </Grid>
                                            ):(
                                                <div></div>
                                            )}
                                            
                                            {window.localStorage.userType === "2" ? (
                                                <div>
                                                    <Button variant="raised" fullWidth  className={classes.Button} color="secondary"  onClick={() =>  this.handleClickOpenCancellation(option.idAppointment) } marginTop="10%">
                                                        Cancel Appointment
                                                    </Button>
                                                    
                                                    <Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleCloseCancellation}>
                                                        <DialogTitle id="form-dialog-title"></DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Are you sure you want to cancel appointment {this.state.selectedAppt}?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button className={classes.Button} onClick={this.handleCloseCancellation} color="primary" variant="contained">
                                                                No
                                                            </Button>
                                                            <Button className={classes.Button} onClick={() => this.handleAppointmentCancel(this.state.selectedAppt)} color="secondary" variant="contained">
                                                                Yes
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    
                                                </div>
                                                
                                            ):(
                                                <div></div>
                                            )}

                                            
                                            
                                        </Typography>
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </FormControl>
                            
                    ))}
                    {this.state.Appointments.length === 0 && <Typography variant="subtitle1">You Have no Appointments</Typography>}
                    
                    {window.localStorage.userType ==="3" &&
                        <Paper className={classes.Paper}>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="AdminPatient"
                                    select
                                    label="Which Patient would you like to book an Appointment for?"
                                    name="AdminPatient"
                                    variant="standard"
                                    onChange={this.handleProper}
                                    value={this.state.AdminPatient}   
                                    required                   
                                >
                                    <MenuItem key="-1" value="-1">
                                        Please Choose A Patient
                                    </MenuItem>
                                    {this.state.PatientIDs.map(option => (
                                        <MenuItem key={option.PatientID} value={option.PatientID}>
                                            {option.PatientID}: {option.FirstName} {option.LastName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                            <NewAppointmentForm PatientID={this.state.AdminPatient}/>
                        </Paper>
                    }
                    {window.localStorage.userType === "2" && 
                        <div className={classes.AdditionButton}>
                            <NewAppointmentForm PatientID={window.localStorage.userID}/>
                        </div>
                    }
                    
                    
                </div>
                </div>
            </div>
        );
    }
    
}

AppointmentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AppointmentHistory);
