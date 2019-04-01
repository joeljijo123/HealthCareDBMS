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

const styles = theme =>({
    root: {
        width: '100%',
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
        margin:"auto"
  
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '20%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
});


class AppointmentHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expanded: null,
            Appointments: [],
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
    };
    render(){
        const{classes}=this.props;
        const { expanded } = this.state;
        return(
            <div>
                <div className={classes.root}>
                    <NewAppointmentForm/>
                    {this.state.Appointments.map(option => (
                            <FormControl key={option.idAppointment} fullWidth>
                                <ExpansionPanel square expanded={expanded === option.idAppointment}  onChange={this.handleChange(option.idAppointment)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Patient: {option.Patient}</Typography>
                                        <Typography className={classes.heading}>Doctor: Dr. {option.Doctor}</Typography>
                                        <Typography className={classes.heading}>Facility: {option.FacilityName}</Typography>
                                        <Typography className={classes.heading}>Date: {option.AppointmentDate.substr(0,10)}</Typography>
                                        <Typography className={classes.heading}>Time: {option.AppointmentTime}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography className={classes.secondaryHeading}>
                                            Reason: {option.Reason} <br/>
                                            AppointmentID: {option.idAppointment}
                                            
                                        </Typography>
                                        
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </FormControl>
                            
                    ))}
                    
                    
                </div>
            </div>
        );
    }
    
}

AppointmentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AppointmentHistory);
