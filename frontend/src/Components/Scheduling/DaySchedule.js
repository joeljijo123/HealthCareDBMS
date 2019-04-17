import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, FormControl, withStyles, Grid } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModifyFacility from './ModifyFacility';
import AddNewDay from './AddNewDay';
import AppointmentsAffected from './AppointmentsAffected';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import WhichFacility from '../Appointments/WhichFacility';'

const styles = theme => ({
	root: {
        width: '100%',
        alignItems: "left",
        display: "flex",
        height: "100vh",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
        margin:"auto",
  
    },
    AdditionButton: {
        marginLeft:"70%",
        display: "flex",
        flexDirection: 'column',
        backgroundColor: "#a09d9d",
        padding: theme.spacing.unit*3,
  
    },
    Button: {
        marginTop: '.5%',
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

class DaySchedule extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			openForm: false, // Toggle for dialog box when removing day
			selectedDayID: -1, // Selected day for removal assigned when opening remove day box
			FacilityID: "", // Selected facility to be changed
			WorkSchedule: [], // WorkSchedule for specified Employee
            Facilities: [], // All Facility information
            Weekdays: [], // All WeekDay information 
			Appointments: [] // All Appointment Info for Doctor
        };
		this.handleChange=this.handleChange.bind(this);
	}
	
	componentDidMount(){
		this.grabAppointments();
        this.grabWorkSchedule();
		this.getFacilities();
		this.getWeekday();
    }
	
	// Get the WorkSchedule list for specified employee
	grabWorkSchedule=()=>{
		fetch(`http://162.243.165.50:4000/WorkSchdule/${window.localStorage.userID}`)
        .then(result => result.json())
        .then(res => this.setState({ WorkSchedule:res.data[0]}))
        .catch(err => console.log(err));
	}
	
	// Get Facility information
	getFacilities=()=> {
        fetch(`http://162.243.165.50:4000/Facilities`)
        .then(result => result.json())
        .then(res => this.setState({ Facilities:res.data }))
        .catch(err => console.log(err))
    };
	
	// Get Weekday information
	getWeekday=()=> {
        fetch(`http://162.243.165.50:4000/Weekday`)
        .then(result => result.json())
        .then(res => this.setState({ Weekdays:res.data }))
        .catch(err => console.log(err))
    };
	
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
	
	handleClickOpen = (dayID) => {
		this.setState({selectedDayID: dayID});
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };
	
	handleConfirmRemove = () => {
		console.log(this.state.selectedDayID)
		console.log(this.state.WorkSchedule)
		fetch(`http://162.243.165.50:4000/RemoveWorkScheduleDay/`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                RemoveDayID: this.state.selectedDayID,
				EmployeeID: window.localStorage.userID,
            })
        })
        .then(this.grabAppointments)
        .catch(err => console.log(err));
		this.handleClose()
		setTimeout(function(){
			window.location.replace('/Scheduling')
		}, 200);
	}
	
	getDayName(dayID){
		for(var i = 0; i < this.state.Weekdays.length; i++){
			if(this.state.Weekdays[i].DayID === dayID){
				return this.state.Weekdays[i].WeekDay
			}
		}
	}
	
	render(){
		const {classes}=this.props;
		const { expanded } = this.state;
		return (
			<div>
				<div className={classes.root}>
					<h2>Current Work Schedule</h2>
					{this.state.WorkSchedule.map(option => (
						<FormControl key={option.WeekDayID} fullWidth>
							<ExpansionPanel square expanded={expanded === option.WeekDayID}  onChange={this.handleChange(option.WeekDayID)}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className={classes.heading}>Day:  <b>{option.WeekDay}</b></Typography>
									<Typography className={classes.heading}>Facility:  <b>{option.FacilityName}</b></Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography className={classes.secondaryHeading}>
										<Grid container spacing={8}>
				                            <Grid item xs={12} sm={9}>
                                                <ModifyFacility  val={this.state} Button={classes.Button} Sub_DayID={option.WeekDayID} Sub_FacilityID={option.FacilityID}/>
                                            </Grid>
											<Grid item xs={12} sm={3}>
                                                <Button fullWidth variant="contained" className={classes.Button} onClick={()=>this.handleClickOpen(option.WeekDayID)} color="secondary" marginTop="10%">
                                                    Remove Day
                                                </Button>
												<Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
													<DialogTitle id="form-dialog-title"></DialogTitle>
													<DialogContent>
														<DialogContentText>
															Are you sure you want to remove {this.getDayName(this.state.selectedDayID)} from your Schedule?
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button className={classes.Button} onClick={this.handleClose} color="primary" variant="contained">
															No
														</Button>
														<Button className={classes.Button} onClick={this.handleConfirmRemove} color="secondary" variant="contained">
															Yes
														</Button>
													</DialogActions>
												</Dialog>
                                            </Grid>
                                        </Grid>
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</FormControl>	
					))}
					<div className={classes.AdditionButton}>
                        <AddNewDay val={this.state} Button={classes.Button}/>
                    </div>
					<AppointmentsAffected val={this.state}/>
				</div>
			</div>
		)
	}
}

DaySchedule.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DaySchedule);