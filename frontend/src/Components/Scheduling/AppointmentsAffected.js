import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, FormControl, withStyles, Grid } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModifyFacility from './ModifyFacility';
import AddNewDay from './AddNewDay';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
	root: {
        width: '100%',
        alignItems: "center",
        display: "flex",
        height: "100vh",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
        margin:"auto",
  
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

class AppointmentsAffected extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			expanded: null,
			Appointments: [],
		}
	}
	
	componentDidMount(){
		this.grabAppointments()
    }
	
	handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    }
	
	grabAppointments=()=>{
        //backend call to grab the appointments not in schedule for the user
        fetch(`http://162.243.165.50:4000/AppointmentsNotInSchedule/${window.localStorage.userID}`)
        .then(result => result.json())
        .then(Response => this.setState({ Appointments:Response.data[0]}))
        .catch(err => console.log(err));
    }
	
	render(){
		const {classes}=this.props;
		const { expanded } = this.state;
		return (	
			<div>
				{this.state.Appointments.length > 0 ? (
					<div>
					<h2>Upcoming Appointments not in Schedule</h2>
					{this.state.Appointments.map(option => (
						<FormControl key={option.idAppointment} fullWidth>
							<ExpansionPanel square expanded={expanded === option.idAppointment}  onChange={this.handleChange(option.idAppointment)}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>Patient: <b>{option.FirstName}</b></Typography>
									<Typography className={classes.heading}>Date: <b>{option.AppointmentDate.substr(0,10)}</b></Typography>
									<Typography className={classes.heading}>Time: <b>{option.AppointmentTime.substr(0,5)}</b></Typography>
									<Typography className={classes.heading}>Facility: <b>{option.FacilityName}</b></Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography className={classes.secondaryHeading}>
										Reason:{option.Reason === "null" ? (<text> No Reason Specified</text>):(<text>{option.Reason}</text>)} <br/>
										AppointmentID: {option.idAppointment} <br/>
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</FormControl>
					))}
					</div>
				):(
					<div></div>
				)}
			</div>
		)
	}
}

AppointmentsAffected.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentsAffected);