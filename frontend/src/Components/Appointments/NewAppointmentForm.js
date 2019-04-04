import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import WhichFacility from './WhichFacility';
import WhichDoctor from './WhichDoctor';
import CompleteNewAppointment from './CompleteNewAppointment';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/ThreeSixty';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
});

class NewAppointmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openForm: false,
            step: 0,
            FacilityID: "",
            DoctorID: "",
            AppointmentTimeID:"",
            Facilities: [],
            Doctors: [],
            AppointmentTimes: [1,2,3],
            Reason: null,
            AppointmentDate: null,
            DBFormattedDate: null,
        };
    }

    componentDidMount = () => {
        this.uploadFacilities();
    };

    handleClickOpen = () => {
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ openForm: false });
    };

    AppointmentDateChange = (d) =>{
        let ApptDate=new Date(d)
        ApptDate = this.FormatDate(ApptDate);
        this.setState({DBFormattedDate:ApptDate});
        this.setState({
            AppointmentDate: d
        })
    }

    FormatDate=(date)=>{
        date = date.getFullYear() + '-' + (this.fixMonth(date)) + '-' + date.getDate();
        return date;
    }

    fixMonth=(date)=>{
        if(date.getMonth() + 1 < 10){
            return "0" +(date.getMonth() +1);
        }
        else{
            return date.getMonth()+1;
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getStepInfo(step){
        switch(step){
            case 0:
                return (<div>
                            <WhichFacility val={this.state} handleChange={this.handleChange}/>
                            <Button onClick={this.handleNextStep} disabled={this.state.FacilityID===""} color="primary">
                                Next
                            </Button>
                        </div>)
            case 1:
                this.uploadDoctors();
                return (<div>
                            <WhichDoctor val={this.state} handleChange={this.handleChange} AppointmentDateChange={this.AppointmentDateChange}/>
                            <Button onClick={this.handleBackStep} color="primary">
                                Back
                            </Button>
                            <Button onClick={this.handleNextStep} disabled={this.state.DoctorID==="" || this.state.AppointmentDate===""} color="primary">
                                Next
                            </Button>
                        </div>)
            case 2:
                this.uploadTimes();
                return (<div>
                            <CompleteNewAppointment  val={this.state} AppointmentDateChange={this.AppointmentDateChange} handleChange={this.handleChange}/>
                            <Button onClick={this.handleBackStep} color="primary">
                                Back
                            </Button>
                            <Button onClick={this.handleSubmit} disabled={this.state.AppointmentTimeID=== ""} color="primary">
                                Submit
                            </Button>

                        </div>) 
            default:
                return "Cannot Find Appointment Step"
        }
    };
    uploadFacilities=()=> {
        fetch(`http://157.230.214.92:4000/Facilities`)
        .then(result => result.json())
        .then(Response => this.setState({ Facilities:Response.data }))
        .catch(err => console.log(err))
    };
    uploadDoctors=()=> {
        fetch(`http://157.230.214.92:4000/Doctors/${this.state.FacilityID}`)
        .then(result => result.json())
        .then(Response => this.setState({ Doctors:Response.data }))
        .catch(err => console.log(err))
    };
    uploadTimes=()=> {
        fetch(`http://157.230.214.92:4000/AppointmentTimes/`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                DoctorID: this.state.DoctorID,
                FacilityID: this.state.FacilityID,
                AppDate: this.state.DBFormattedDate,
            })
        })
        .then(result => result.json())
        .then(Response => this.setState({ AppointmentTimes:Response.data}))
        .catch(err => console.log(err));
    };
    handleNextStep= () =>{
        this.setState({step: this.state.step+1})
    };
    handleSubmit= () =>{
        this.setState({openForm:false})
        fetch(`http://157.230.214.92:4000/AddAppointment`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                FacilityID: this.state.FacilityID,
                DoctorID:   this.state.DoctorID,
                PatientID:  this.state.PatientID,
                Reason:     this.state.Reason,
                TimeID:     this.state.TimeID,
                AppDate:    this.state.AppointmentDate
            })
        })
        .catch(err => console.log(err))
        .then(window.location.replace('/Appointments'));
    };
    handleBackStep= () =>{
        this.setState({step: this.state.step-1})
    };
    render(){
        const {classes}=this.props;
        return(
            <div>
                <Button variant="Filled" color="primary" onClick={this.handleClickOpen}>
                    New Appointment
                </Button>
                <Dialog open={this.state.openForm} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Book an Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the information to add a new Appointment
                        </DialogContentText>
                        {this.getStepInfo(this.state.step)}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
}

NewAppointmentForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(NewAppointmentForm);