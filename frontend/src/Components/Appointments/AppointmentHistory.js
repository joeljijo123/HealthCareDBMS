import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewAppointmentForm from './NewAppointmentForm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme =>({
    root: {
        width: '100%',
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3
  
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
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
    grabAppointments=()=>{
        //backend call to grab the appointments for the user
        fetch(`http://157.230.214.92:4000/Appointments`, {
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
        .then(Response => this.setState({ Appointments:Response.data }))
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
                <NewAppointmentForm/>
                <div className={classes.root}>
                    {this.state.Appointments.map(option => (
                        <ExpansionPanel expanded={expanded === option.idAppointment}  onChange={this.handleChange(option.idAppointment)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{option.idAppointment}</Typography>
                                <Typography className={classes.secondaryHeading}>{option.AppointmentDate}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
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
