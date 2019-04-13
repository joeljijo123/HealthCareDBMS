import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewAppointmentForm from './NewAppointmentForm';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControl, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddDiagnosis from './AddDiagnosis';
import ShowDiagnosis from './ShowDiagnosis';
import ShowPrescriptions from './ShowPrescriptions';
import AddPrescription from './AddPrescription';
import AddSpecialistReccomendation from './AddSpecilaistReccomendation';
import './AppointmentPage.css';
import PatientMedicalHistory from './PatientMedicalHistory';

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
});


class AppointmentHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expanded: null,
            Appointments: [],
            Diagnosis: [],
            cancelApptShow: false,
        };
    }
    componentDidMount(){
        this.grabAppointments();
    }
    grabAppointments=()=>{
        //backend call to grab the appointments for the user
        fetch(`http://157.230.214.92:4000/Appointments/`, {
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

    placeDiagnosis(){
        {this.state.Diagnosis.map(option => (
            <FormControl>
                <Typography>Diagnosis: {option.Diagnosis}</Typography>
                <Typography>Number of Refills:  {option.RefillLeft}</Typography>
                <Typography>Due Date: {option.DueDate.substr(0,10)}</Typography>
                <Typography>Medicine: {option.Medicine}</Typography>
            </FormControl>
        ))}
    }
    handleAppointmentCancel = (AppID) => {
        fetch(`http://157.230.214.92:4000/CancelAppointment/`, {
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
    };
    render(){
        const{classes}=this.props;
        const { expanded } = this.state;
        return(
            <div className={classes.page}>
                <div className='AppointmentPage-SmallBoxOverLay'>
                <div className={classes.root}>
                <h1 className='AppointmentHistory-h1'>Upcoming Appointments</h1>
                    {this.state.Appointments.map(option => (
                            <FormControl key={option.idAppointment} fullWidth>
                                <ExpansionPanel square expanded={expanded === option.idAppointment}  onChange={this.handleChange(option.idAppointment)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Patient: {option.Patient}</Typography>
                                        <Typography className={classes.heading}>Doctor: Dr. {option.Doctor}</Typography>
                                        <Typography className={classes.heading}>Date: {option.AppointmentDate.substr(0,10)}</Typography>
                                        <Typography className={classes.heading}>Time: {option.AppointmentTime.substr(0,5)}</Typography>
                                        <Typography className={classes.heading}>Status: {option.currentStatus}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography className={classes.secondaryHeading}>
                                            Reason: {option.Reason}<br/>
                                            AppointmentID: {option.idAppointment} <br/>
                                            Facility: {option.FacilityName} <br/>
                                            Address: {option.Street}, {option.City}, {option.State} {option.ZipCode}<br/>
                                            Specialist Reccomentation: {option.Specialist === null || option.Specialist === "" ? (<text>No Specialist Needed</text>):(<text>Dr. {option.Specialist}</text>)}<br/>
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
                                                            <Button variant="raised" fullWidth  className={classes.Button} color="secondary"  onClick={() =>  this.handleAppointmentCancel(option.idAppointment) } marginTop="10%">
                                                                Cancel Appointment
                                                            </Button>  
                                                        </Grid>
                                                    </Grid>
                                            ):(
                                                <div></div>
                                            )}
                                            
                                            {window.localStorage.userType === "2" ? (
                                                <div>
                                                    <Button variant="raised" fullWidth  className={classes.Button} color="secondary"  onClick={() =>  this.handleAppointmentCancel(option.idAppointment) } marginTop="10%">
                                                        Cancel Appointment
                                                    </Button>
                                                </div>
                                                
                                            ):(
                                                <div></div>
                                            )}

                                            
                                            
                                        </Typography>
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </FormControl>
                            
                    ))}
                    {window.localStorage.userType === "2" ? (
                        <div className={classes.AdditionButton}>
                            <NewAppointmentForm PatientID={window.localStorage.userID}/>
                        </div>
                    ):(
                        <div></div>
                    )}
                    
                    
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
