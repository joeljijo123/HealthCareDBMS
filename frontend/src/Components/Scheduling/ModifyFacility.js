import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import WhichFacility from '../Appointments/WhichFacility';


const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 800,
      },
});

class ModifyFacility extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			openForm: false,
			selectedFacility: "",
			Facilities: this.props.val.Facilities,
			FacilityID: this.props.Sub_FacilityID
		}
	}
	
	componentDidMount(){
        //this.getFacilities();
    }
	
	// Get Facility information
	/*getFacilities=()=> {
        fetch(`http://162.243.165.50:4000/Facilities`)
        .then(result => result.json())
        .then(res => this.setState({ Facilities:res.data }))
        .catch(err => console.log(err))
    };*/
	
	getFacilityIDFromName(lookUpName){
		for(var i = 0; i < this.state.Facilities.length; i++){
			if(this.state.Facilities[i].FacilityName === lookUpName){
				return this.state.Facilities[i].FacilityID
			}
		}
		return -1
	}
	
	handleClickOpen = () => {
        //this.getFacilities();
        this.setState({ Facilities: this.props.val.Facilities,
						openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };
	
	handleChange = e =>{
        this.setState({
            selectedFacility: this.state.Facilities[e.target.value].FacilityName,
			[e.target.name] : e.target.value
        })
    }
	
	handleDoneSelected = () =>{
		if(this.state.selectedFacility !== ""){
			for(var i=0; i < this.props.val.WorkSchedule.length; i++){
				if(this.props.val.WorkSchedule[i].WeekDayID === this.props.Sub_DayID){
					console.log("Facility: " + this.state.selectedFacility)
					console.log(this.props.val.WorkSchedule[i])
					this.props.val.WorkSchedule[i].FacilityName = this.state.selectedFacility
					this.props.val.WorkSchedule[i].FacilityID = this.getFacilityIDFromName(this.state.selectedFacility)
				}
			}
			console.log("UPDATING")
			fetch(`http://162.243.165.50:4000/UpdateWorkScheduleDay/`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                UpdateDayID: this.props.Sub_DayID,
				EmployeeID: window.localStorage.userID,
				NewFacilityID: this.getFacilityIDFromName(this.state.selectedFacility)
            })
        })
        .then(this.grabAppointments)
        .catch(err => console.log(err));
		}
		this.handleClose()
		setTimeout(function(){
			window.location.replace('/Scheduling')
		}, 200);
	}
	
	render(){
		return(
			<div>
				<Button variant="contained" color="inherit" className={this.props.Button} fullWidth onClick={this.handleClickOpen}>
                    Change Facility
                </Button>
				<Dialog maxWidth="md" open={this.state.openForm} onClose={this.handleClose}>
					<DialogTitle id="form-dialog-title"></DialogTitle>
					<DialogContent>
                        <DialogContentText>
                            Please select a new facilty for this weekday
                        </DialogContentText>
                        <WhichFacility val={this.state} handleChange={this.handleChange}/>
                    </DialogContent>
					<DialogActions>
						<Button onClick={this.handleDoneSelected} disabled={this.state.FacilityID===""} color="primary">
                            Done
                        </Button>
                    </DialogActions>
				</Dialog>
			</div>
		)
	}
}

ModifyFacility.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModifyFacility);

