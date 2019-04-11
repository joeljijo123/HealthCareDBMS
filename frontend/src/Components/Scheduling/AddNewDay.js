import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import WhichFacility from '../Appointments/WhichFacility';
import WhichDay from './WhichDay';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
});

class AddNewDay extends React.Component{
    constructor(props){
        super(props)
        this.state = {
			openForm: false,
			Facilities: [],
			OpenDays: [],
			DayID: -1,
			FacilityID: -1,
		}
	}
	
	getOpenDaysList(){
		var newDayList = []
		var shouldAddNew = true
		for(var i = 0; i < this.props.val.Weekdays.length; i++){
			for(var k = 0; k < this.props.val.WorkSchedule.length; k++){
				if(this.props.val.WorkSchedule[k].WeekDayID === this.props.val.Weekdays[i].DayID)
					shouldAddNew = false
			}
			if(shouldAddNew){
				newDayList.push(this.props.val.Weekdays[i])
			}
			shouldAddNew = true
		}
		return newDayList
	}
	
	handleClickOpen = () => {
        this.setState({ Facilities: this.props.val.Facilities,
						OpenDays : this.getOpenDaysList(),
						openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false,
						DayID: -1,
						FacilityID: -1 });
    };
	
	handleChange = e =>{
        this.setState({
			[e.target.name] : e.target.value
        })
    }
	
	handleConfirmChange = () => {
		fetch(`http://157.230.214.92:4000/AddNewWorkSchedule/`, {
		method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            DayID: this.state.DayID,
			EmployeeID: window.localStorage.userID,
			FacilityID: this.state.FacilityID
        })})
		console.log("DayID : " + this.state.DayID)
		console.log("EmployeeID : " + window.localStorage.userID)
		console.log("FacilityID : " + this.state.FacilityID)
		this.handleClose()
		setTimeout(function(){
			window.location.replace('/Scheduling')
		}, 200);
	};
	
	render(){
		return (
			<div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add New Day
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Add a new day</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information for a new day
                        </DialogContentText>
						<WhichFacility val={this.state} handleChange={this.handleChange}/>
						<WhichDay val={this.state} handleChange={this.handleChange}/>
                    </DialogContent>
                    <DialogActions>
						<Button onClick={this.handleConfirmChange} color="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
		)
	}
}

AddNewDay.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(AddNewDay);