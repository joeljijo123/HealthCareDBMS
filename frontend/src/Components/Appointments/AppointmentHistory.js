import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewAppointmentForm from './NewAppointmentForm';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddDiagnosis from './AddDiagnosis';

const styles = theme =>({
    root: {
        width: '100%',
        alignItems: "center",
        display: "flex",
        height: "100vh",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    AdditionButton: {
        marginLeft:"70%",
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
  
    },
    Button: {
        marginTop: '.5%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '20%',
        flexShrink: 0,
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
    grabDiagnoses=(AppID)=>{
        fetch(`http://157.230.214.92:4000/PrescriptionAndDiagnosis/${AppID}`)
        .then(result => result.json())
        .then(Response => this.setState({ Diagnosis: Response.data }))
        .then(this.placeDiagnosis)
        .catch(err => console.log(err))
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
            <div>
                <div className={classes.root}>
                    
                    {this.state.Appointments.map(option => (
                            <FormControl key={option.idAppointment} fullWidth>
                                <ExpansionPanel square expanded={expanded === option.idAppointment}  onChange={this.handleChange(option.idAppointment)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Patient: {option.Patient}</Typography>
                                        <Typography className={classes.heading}>Doctor: Dr. {option.Doctor}</Typography>
                                        <Typography className={classes.heading}>Date: {option.AppointmentDate.substr(0,10)}</Typography>
                                        <Typography className={classes.heading}>Time: {option.AppointmentTime}</Typography>
                                        <Typography className={classes.heading}>Status: {option.currentStatus}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography className={classes.secondaryHeading}>
                                            Reason: {option.Reason}<br/>
                                            AppointmentID: {option.idAppointment} <br/>
                                            Facility: {option.FacilityName} <br/>
                                            Address: {option.Street}, {option.City}, {option.State} {option.ZipCode}<br/>
                                            {/* /*{this.grabDiagnoses(option.idAppointment)} */}
                                            {window.localStorage.userType !== "1" ? (
                                                <Button variant="raised" fullWidth  className={classes.Button} color="secondary"  onClick={() =>  this.handleAppointmentCancel(option.idAppointment) } marginTop="10%">
                                                    Cancel Appointment
                                                </Button>
                                            ):(
                                                <AddDiagnosis/>
                                            )}
                                            
                                        </Typography>
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </FormControl>
                            
                    ))}
                    {window.localStorage.userType === "2" ? (
                        <div className={classes.AdditionButton}>
                            <NewAppointmentForm/>
                        </div>
                    ):(
                        <div></div>
                    )}
                    
                    
                </div>
            </div>
        );
    }
    
}

AppointmentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AppointmentHistory);
